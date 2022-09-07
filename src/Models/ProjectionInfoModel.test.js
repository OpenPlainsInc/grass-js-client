/*
 * Filename: ProjectionInfoModel.test.js
 * Project: OpenPlains
 * File Created: Thursday May 26th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Sep 07 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */

import { ProjectionInfoModel } from './ProjectionInfoModel';
import { EpsgSearchResponse } from './EpsgSearchResponse';
import { EpsgInfo } from './EpsgInfo';


function setupFetchStub(data) {
    return function fetchStub(_url) {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
                ...data,
            }),
        })
      })
    }
  }

const MOCK_EPSG_RESPONSE = {
    "status": "ok", 
    "number_result": 1, 
    "results": [
        {
            "code": "4326",
            "kind": "CRS-GEOGCRS", 
            "bbox": [90.0, -180.0, -90.0, 180.0],
            "wkt": "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.0174532925199433,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]",
            "unit": "degree (supplier to define representation)",
            "proj4": "+proj=longlat +datum=WGS84 +no_defs",
            "name": "WGS 84",
            "area": "World.",
            "default_trans": 0,
            "trans": [],
            "accuracy": ""
        }
    ]
}

describe("ProjectionInfoModel", ()=> {
 
    const wgs84 = {epsg: "4326"}
    const projectionInfo = new ProjectionInfoModel(wgs84)
 
    test("Return instance of ProjectionInfoModel", ()=> {
        expect(projectionInfo instanceof ProjectionInfoModel).toBeTruthy()
    })

    test("Parameter epsg set from object", ()=> {
        expect(projectionInfo.epsg).toBe(wgs84.epsg)
    })

    test("Parameter projectionDetails is empty object", ()=> {
        expect(typeof projectionInfo.projectionDetails).toBe('object')
    })

    test('ProjectionInfoModel.searchEpsg(4326) searches epsg.io and returns data', async () => {
        
        global.fetch = jest.fn().mockImplementation(setupFetchStub(MOCK_EPSG_RESPONSE))
        const json = await ProjectionInfoModel.searchEpsg(wgs84.epsg)
        expect(json instanceof EpsgSearchResponse).toBeTruthy()
        expect(json.results.length).toEqual(1)
        expect(json.results[0] instanceof EpsgInfo).toBeTruthy()
        global.fetch.mockClear()
        delete global.fetch
    })
})

