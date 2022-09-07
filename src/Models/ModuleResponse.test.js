/*
 * Filename: ModuleResponse.test.js
 * Project: OpenPlains
 * File Created: Tuesday September 6th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Sep 06 2022
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

import { ModuleParameterResponse } from "./ModuleParameterResponse"
import { ModuleResponse } from "./ModuleResponse"




describe("ModuleResponse", ()=> {

    const mockData = new ModuleResponse({
        "categories": ["grass-module", "hydrology", "raster", "watershed"], 
        "description": "Morphometric characterization of river basins", 
        "id": "r.basin",
        "parameters": [
            {
                "description": "Name of elevation raster map. ",
                "name": "map",
                "optional": false,
                "schema": {"subtype": "cell", "type": "string"}
            },
            {
                "description": "output prefix (must start with a letter). ",
                "name": "prefix",
                "optional": false,
                "schema": {"type": "string"}
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
                "schema": {"subtype": "dir", "type": "string"}
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
    })
                
    test("Create an instance of ModuleListResponse", ()=> {
        expect(mockData instanceof ModuleResponse).toBeTruthy()
    }) 

    test("Confirm array of processes are instances of ModuleResponse class", ()=> {
        expect(mockData.parameters).toHaveLength(11);
        expect(mockData.parameters[0] instanceof ModuleParameterResponse).toBeTruthy()
    })

    test("Confirm returns is empty list", ()=> {
        expect(mockData.returns).toHaveLength(0);
    })

    test("Confirm id is r.basin", ()=> {
        expect(mockData.id).toBe("r.basin");
    })

    test("Confirm categories set to array with length 4", ()=> {
        expect(mockData.categories).toHaveLength(4);
    })

})