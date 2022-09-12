/*
 * Filename: locations.test.js
 * Project: OpenPlains
 * File Created: Wednesday September 7th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Mon Sep 12 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 OpenPlains
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

import Locations from './locations';
import { LocationsListResponseModel } from '../Models/LocationsListResponseModel';
import { ProcessResponseModel } from '../Models/ProcessResponseModel';
import { SimpleResponseModel } from '../Models/SimpleResponseModel';

function setupFetchStub(data) {
    return function fetchStub() {
      return new Promise((resolve) => {
        resolve({
          ok: true,
          json: () =>
            Promise.resolve({
                ...data,
            }),
        })
      })
    }
  }

const TEST_LOCATION = "testLocation"
const TEST_EPSG = 4326

const MOCK_GET_LOCATIONS = {
    "response": {
        "locations": ["nc_spm_08", "latlong_wgs84", "utm32n", "futures_triangle_nc", "CONUS", "test_location"],
        "status": "success"
    }
}

const MOCK_GET_LOCACTION = {
    "response": {
        "accept_datetime": "2022-09-07 17:01:08.384401",
        "accept_timestamp": 1662570068.3843982,
        "api_info": {
            "endpoint": "locationmanagementresourceuser",
            "method": "GET",
            "path": "/api/v3/locations/nc_spm_08/info",
            "request_url": "http://actinia-core:8088/api/v3/locations/nc_spm_08/info"
        }, 
        "datetime": "2022-09-07 17:01:08.642829",
        "http_code": 200,
        "message": "Processing successfully finished",
        "process_chain_list": [
            {
                "1": {"flags": "ug3", "module": "g.region"}, 
                "2": {"flags": "fw", "module": "g.proj"}
            }
        ], 
        "process_log": [
            {
                "executable": "g.region", 
                "id": "1", 
                "parameter": ["-ug3"],
                "return_code": 0,
                "run_time": 0.1002647876739502,
                "stderr": [""],
                "stdout": "projection=99\nzone=0\nn=221230\ns=219580\nw=637740\ne=639530\nt=1\nb=0\nnsres=10\nnsres3=10\newres=10\newres3=10\ntbres=1\nrows=165\nrows3=165\ncols=179\ncols3=179\ndepths=1\ncells=29535\ncells3=29535\n"
            }, 
            {
                "executable": "g.proj", 
                "id": "2",
                "parameter": ["-fw"],
                "return_code": 0,
                "run_time": 0.10030913352966309, 
                "stderr": [""],
                "stdout": "PROJCRS[\"NAD83(HARN) / North Carolina\",BASEGEOGCRS[\"NAD83(HARN)\",DATUM[\"NAD83 (High Accuracy Reference Network)\",ELLIPSOID[\"GRS 1980\",6378137,298.257222101,LENGTHUNIT[\"metre\",1]]],PRIMEM[\"Greenwich\",0,ANGLEUNIT[\"degree\",0.0174532925199433]],ID[\"EPSG\",4152]],CONVERSION[\"SPCS83 North Carolina zone (meters)\",METHOD[\"Lambert Conic Conformal (2SP)\",ID[\"EPSG\",9802]],PARAMETER[\"Latitude of false origin\",33.75,ANGLEUNIT[\"degree\",0.0174532925199433],ID[\"EPSG\",8821]],PARAMETER[\"Longitude… Jackson; Johnston; Jones; Lee; Lenoir; Lincoln; Macon; Madison; Martin; McDowell; Mecklenburg; Mitchell; Montgomery; Moore; Nash; New Hanover; Northampton; Onslow; Orange; Pamlico; Pasquotank; Pender; Perquimans; Person; Pitt; Polk; Randolph; Richmond; Robeson; Rockingham; Rowan; Rutherford; Sampson; Scotland; Stanly; Stokes; Surry; Swain; Transylvania; Tyrrell; Union; Vance; Wake; Warren; Washington; Watauga; Wayne; Wilkes; Wilson; Yadkin; Yancey.\"],BBOX[33.83,-84.33,36.59,-75.38]],ID[\"EPSG\",3358]]\n"
            }
        ],
            "process_results": {
                "region": {
                    "b": 0.0,
                    "cells": 29535,
                    "cells3": 29535,
                    "cols": 179,
                    "cols3": 179,
                    "depths": 1,
                    "e": 639530.0,
                    "ewres": 10.0,
                    "ewres3": 10.0,
                    "n": 221230.0,
                    "nsres": 10.0,
                    "nsres3": 10.0,
                    "projection": 99, 
                    "rows": 165,
                    "rows3": 165,
                    "s": 219580.0,
                    "t": 1.0,
                    "tbres": 1.0,
                    "w": 637740.0,
                    "zone": 0
                },
                "projection":  "PROJCRS[\"NAD83(HARN) / North Carolina\",BASEGEOGCRS[\"NAD83(HARN)\",DATUM[\"NAD83 (High Accuracy Reference Network)\",ELLIPSOID[\"GRS 1980\",6378137,298.257222101,LENGTHUNIT[\"metre\",1]]],PRIMEM[\"Greenwich\",0,ANGLEUNIT[\"degree\",0.0174532925199433]],ID[\"EPSG\",4152]],CONVERSION[\"SPCS83 North Carolina zone (meters)\",METHOD[\"Lambert Conic Conformal (2SP)\",ID[\"EPSG\",9802]],PARAMETER[\"Latitude of false origin\",33.75,ANGLEUNIT[\"degree\",0.0174532925199433],ID[\"EPSG\",8821]],PARAMETER[\"Longitude… Jackson; Johnston; Jones; Lee; Lenoir; Lincoln; Macon; Madison; Martin; McDowell; Mecklenburg; Mitchell; Montgomery; Moore; Nash; New Hanover; Northampton; Onslow; Orange; Pamlico; Pasquotank; Pender; Perquimans; Person; Pitt; Polk; Randolph; Richmond; Robeson; Rockingham; Rowan; Rutherford; Sampson; Scotland; Stanly; Stokes; Surry; Swain; Transylvania; Tyrrell; Union; Vance; Wake; Warren; Washington; Watauga; Wayne; Wilkes; Wilson; Yadkin; Yancey.\"],BBOX[33.83,-84.33,36.59,-75.38]],ID[\"EPSG\",3358]]\n"
            },
            "progress": {
                "num_of_steps": 2,
                "step": 2
            },
                "resource_id": "resource_id-981a03c8-7503-47c0-9c5b-484d7dc7a835",
                "status": "finished",
                "time_delta": 0.25846338272094727,
                "timestamp": 1662570068.642799,
                "urls": {
                    "resources": [], 
                    "status": "http://actinia-core:8088/api/v3/resources/actinia-gdi/resource_id-981a03c8-7503-47c0-9c5b-484d7dc7a835"
                }, 
                "user_id": "actinia-gdi"
            }
}

const MOCK_CREATE_LOCATION = {
    "response": {
        "accept_datetime": "2022-09-07 20:00:40.128714",
        "accept_timestamp": 1662580840.1287122,
        "api_info": {
            "endpoint": "locationmanagementresourceadminuser",
            "method": "POST",
            "path": "/api/v3/locations/testLocation",
            "request_url": "http://actinia-core:8088/api/v3/locations/testLocation"
        },
        "datetime": "2022-09-07 20:00:40.345908",
        "http_code": 200,
        "message": "Location <testLocation> successfully created",
        "process_chain_list": [
            {
                "1": {
                    "flags": "t", 
                    "inputs": {
                        "epsg": "4326",
                        "location": "testLocation"
                    },
                    "module": "g.proj"
                }
            }
        ], 
        "process_log": [
            {
                "executable": "g.proj",
                "id": "1",
                "parameter": ["epsg=4326", "location=testLocation", "-t"],
                "return_code": 0,
                "run_time": 0.10035276412963867,
                "stderr": [
                    "Location <testLocation> created",
                    "You can switch to the new location by",
                    "`g.mapset mapset=PERMANENT location=testLocation`",
                    ""
                ], 
                "stdout": ""
            }], 
            "process_results": {}, 
            "progress": {
                "num_of_steps": 1,
                "step": 1
            }, 
            "resource_id": "resource_id-76651441-c89c-48d2-9f96-374d0045828e",
            "status": "finished",
            "time_delta": 0.21721863746643066,
            "timestamp": 1662580840.3458817,
            "urls": {
                "resources": [],
                "status": "http://actinia-core:8088/api/v3/resources/actinia-gdi/resource_id-76651441-c89c-48d2-9f96-374d0045828e"
            }, 
            "user_id": "actinia-gdi"
        }
}

const MOCK_DELETE_LOCATION = {
    "response": {
        "message": "location testLocation deleted",
        "status": "success"
    }
}

describe("Locations", ()=> {
  
    test("Fetch list of avaliable locations", async ()=> {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(MOCK_GET_LOCATIONS))
        const locationData = await Locations.getLocations()
        expect(locationData instanceof LocationsListResponseModel).toBeTruthy()
        expect(locationData.status).toBe("success")
        expect(locationData.locations).toHaveLength(6)
        expect(locationData.locations).toEqual(expect.arrayContaining(MOCK_GET_LOCATIONS.response.locations))
        global.fetch.mockClear()
        delete global.fetch
    })


    test("Fetch info about a location", async ()=> {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(MOCK_GET_LOCACTION))

        const locationData = await Locations.getLocation("nc_spm_08")
        expect(locationData instanceof ProcessResponseModel).toBeTruthy()
        expect(locationData).toHaveProperty("status", "finished")
       
        global.fetch.mockClear()
        delete global.fetch
    })

    test("Create a location", async ()=> {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(MOCK_CREATE_LOCATION))
        const locationData = await Locations.createLocation(TEST_LOCATION, TEST_EPSG)
        expect(locationData instanceof ProcessResponseModel).toBeTruthy()
        expect(locationData).toHaveProperty("message", MOCK_CREATE_LOCATION.response.message)

        expect(locationData.processChainList).toHaveLength(1)
        expect(locationData.processChainList[0]).toHaveProperty("1.module", "g.proj")
        expect(locationData.processChainList[0]).toHaveProperty("1.flags", "t")
        expect(locationData.processChainList[0]).toHaveProperty("1.inputs.epsg", TEST_EPSG.toString())
        expect(locationData.processChainList[0]).toHaveProperty("1.inputs.location", TEST_LOCATION)
        global.fetch.mockClear()
        delete global.fetch
    })

    test("Delete a location", async ()=> {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(MOCK_DELETE_LOCATION))
        const locationData = await Locations.deleteLocation(TEST_LOCATION)
        expect(locationData instanceof SimpleResponseModel).toBeTruthy()
        expect(locationData).toHaveProperty("message", MOCK_DELETE_LOCATION.response.message)
        expect(locationData).toHaveProperty("status", MOCK_DELETE_LOCATION.response.status)

        global.fetch.mockClear()
        delete global.fetch
    })
})