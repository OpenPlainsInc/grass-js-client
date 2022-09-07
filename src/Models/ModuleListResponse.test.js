/*
 * Filename: ModuleListResponse.test.js
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


import {ModuleListResponse} from "./ModuleListResponse"
import { ModuleResponse } from "./ModuleResponse"

describe("ModuleListResponse", ()=> {

    const mockData = new ModuleListResponse({
       
            "status": "success",
            "processes": [
                {
                    "categories": ["geometry", "grass-module", "topology", "vector"],
                    "description": "Creates topology for vector map. Optionally also checks for topological errors.",
                    "id": "v.build"
                },
                {
                    "categories": ["grass-module", "topology", "vector"],
                    "description": "Rebuilds topology on all vector maps in the current mapset.",
                    "id": "v.build.all"
                },
                {
                    "categories": ["geometry", "grass-module", "line", "node", "topology", "vector", "vertex"],
                    "description": "Builds polylines from lines or boundaries.",
                    "id": "v.build.polylines"
                },
                {
                    "categories": ["category", "grass-module", "layer", "vector"],
                    "description": "Attaches, deletes or reports vector categories to/from/of map geometry.",
                    "id": "v.category"
                },
                {
                    "categories": ["area", "centroid", "grass-module", "vector"],
                    "description": "Adds missing centroids to closed boundaries.",
                    "id": "v.centroids"
                }
            ]
        
    })
                
    test("Create an instance of ModuleListResponse", ()=> {
        expect(mockData instanceof ModuleListResponse).toBeTruthy()
    }) 

    test("Confirm array of processes are instances of ModuleResponse class", ()=> {
        expect(mockData.processes).toHaveLength(5);
        expect(mockData.processes[0] instanceof ModuleResponse).toBeTruthy()
    })

    test("Confirm status equals success", ()=> {
        expect(mockData.status).toBe("success");
    })

})