/*
 * Filename: modules.test.js
 * Project: OpenPlains
 * File Created: Tuesday September 13th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Sep 13 2022
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


import Modules from './modules';
import { ModuleListResponse } from '../Models/ModuleListResponse';
import { ModuleResponse } from '../Models/ModuleResponse';
import { ModuleParameterResponse } from '../Models/ModuleParameterResponse';

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

const TEST_MODULE = "r.basin"

const MOCK_GET_MODULE = {
    "response": {
        "categories": ["grass-module", "hydrology", "raster", "watershed"], 
        "description": "Morphometric characterization of river basins", 
        "id": "r.basin",
        "parameters": [
            {
                "description": "Name of elevation raster map. ",
                "name": "map",
                "optional": false,
                "schema": {"subtype": "cell","type": "string"}
            },
            {
                "description": "output prefix (must start with a letter). ",
                "name": "prefix", "optional": false, "schema": {"type": "string"}
            }, 
            {
                "description": "coordinates of the outlet (east,north). ",
                "name": "coordinates",
                "optional": false,
                "schema": {"subtype": "coords", "type": "number"}
            },
            {
                "description": "Directory where the output will be found. ",
                "name": "dir",
                "optional": false,
                "schema": {"subtype": "dir","type": "string"}
            },
            {
                "description": "threshold. ",
                "name": "threshold",
                "optional": true,
                "schema": {"type": "number"}
            },
            {
                "default": "False",
                "description": "Use default threshold (1km^2). ",
                "name": "a",
                "optional": true,
                "schema": {"type": "boolean"}
            },
            {
                "default": "False",
                "description": "No maps output. ",
                "name": "c",
                "optional": true,
                "schema": {"type": "boolean"}
            },
            {
                "default": "False",
                "description": "Allow output files to overwrite existing files. ",
                "name": "overwrite",
                "optional": true,
                "schema": {"type": "boolean"}
            },
            {
                "default": "False",
                "description": "Print usage summary. ",
                "name": "help",
                "optional": true,
                "schema": {"type": "boolean"}
            },
            {
                "default": "False",
                "description": "Verbose module output. ",
                "name": "verbose",
                "optional": true,
                "schema": {"type": "boolean"}
            },
            {
                "default": "False", 
                "description": "Quiet module output. ",
                "name": "quiet",
                "optional": true, 
                "schema": {"type": "boolean"}
            }
        ],
        "returns": []
    }
}

const MOCK_GET_MODULES = {
    "response": {
        "processes": [
            {
                "categories": ["grass-module", "hydrology", "raster", "watershed"],
                "description": "Morphometric characterization of river basins",
                "id": "r.basin"
            }, 
            {
                "categories": ["grass-module", "hydrology", "raster", "watershed"], 
                "description": "Generates watershed subbasins raster map.",
                "id": "r.basins.fill"
            }, 
            {
                "categories": ["composite", "grass-module", "raster"], 
                "description": "Blends color components of two raster maps by a given ratio.", 
                "id": "r.blend"
            }, 
            {
                "categories": ["buffer", "grass-module", "raster"], 
                "description": "Creates a raster map showing buffer zones surrounding cells that contain non-NULL category values.",
                "id": "r.buffer"
            }
        ],
        "status": "success"
    }
}

describe("Module Requests", ()=> {
  
    test("Fetch list of avaliable modules", async ()=> {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(MOCK_GET_MODULES))
        let TEST_MODULE_RESPONSE = new ModuleResponse({...MOCK_GET_MODULES.response.processes[0]})
        const modulesData = await Modules.getModules()
        expect(modulesData instanceof ModuleListResponse).toBeTruthy()
        expect(modulesData).toHaveProperty("status", MOCK_GET_MODULES.response.status)
        expect(modulesData.processes).toHaveLength(4)
        expect(modulesData).toHaveProperty("processes[0]", TEST_MODULE_RESPONSE)
        expect(modulesData).toHaveProperty("processes[0].id", TEST_MODULE_RESPONSE.id)
        expect(modulesData).toHaveProperty("processes[0].description", TEST_MODULE_RESPONSE.description)
        expect(modulesData).toHaveProperty("processes[0].categories", TEST_MODULE_RESPONSE.categories)
        expect(modulesData.processes[0].categories).toHaveLength(4)
        global.fetch.mockClear()
        delete global.fetch
    })


    test("Fetch info about a module", async ()=> {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(MOCK_GET_MODULE))
        const moduleData = await Modules.getModule(TEST_MODULE)
        const TEST_PARAM = new ModuleParameterResponse({...MOCK_GET_MODULE.response.parameters[0]})
        expect(moduleData instanceof ModuleResponse).toBeTruthy()
        expect(moduleData).toHaveProperty("id", TEST_MODULE)
        expect(moduleData).toHaveProperty("parameters")
        expect(moduleData.parameters).toHaveLength(11)
        expect(moduleData).toHaveProperty("parameters[0]", TEST_PARAM)
        expect(moduleData).toHaveProperty("description", MOCK_GET_MODULE.response.description)
        global.fetch.mockClear()
        delete global.fetch
    })
})