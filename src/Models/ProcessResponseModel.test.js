/*
 * Filename: ProcessResponseModel.test.js
 * Project: OpenPlains
 * File Created: Wednesday September 7th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Sep 07 2022
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


import { ProcessResponseModel } from '../Models/ProcessResponseModel';
import { GrassModule } from '../Models/GrassModule';
import { ApiInfoModel } from '../Models/ApiInfoModel';
import { ProcessLog } from '../Models/ProcessLog';
import { ProgressInfoModel } from './ProgressInfoModel';
import { UrlModel } from './UrlModel';


const MOCK_PROCESS_RESPONSE = {
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

describe("ProcessResponseModel", ()=> {
  
    test("Return instance of ProjectionInfoModel", async ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        expect(response).toBeInstanceOf(ProcessResponseModel)
    })

    test("Check response status", ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        expect(response).toHaveProperty("status", "finished")
    })

    test("Check processLog is initalized", ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        let grassExec = "g.region"
        let processLog = response.filterExecutables(grassExec)
        expect(processLog).toHaveLength(1)
        expect(processLog[0]).toBeInstanceOf(ProcessLog)
        expect(processLog[0]).toHaveProperty("executable", grassExec)
    })

    test("Check processChainList is initalized", ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        expect(response.processChainList).toHaveLength(1)
        expect(response.processChainList[0]).toHaveProperty("1.module", "g.region")
        expect(response.processChainList[0]).toHaveProperty("1.flags", "ug3")
        expect(response.processChainList[0]["1"]).toBeInstanceOf(GrassModule)
        expect(response.processChainList[0]).toHaveProperty("2.module", "g.proj")
        expect(response.processChainList[0]).toHaveProperty("2.flags", "fw")
        expect(response.processChainList[0]["2"]).toBeInstanceOf(GrassModule)
    })

    test("Check date fields are is initalized", ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        expect(response.acceptDatetime).toBeInstanceOf(Date)
        expect(response.datetime).toBeInstanceOf(Date)
    })

    test("Check that apiInfo initialized", async ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        expect(response.apiInfo).toBeInstanceOf(ApiInfoModel)
        expect(response).toHaveProperty("apiInfo.path", MOCK_PROCESS_RESPONSE.api_info.path)
        expect(response).toHaveProperty("apiInfo.method", MOCK_PROCESS_RESPONSE.api_info.method)
    })

    test("Check that processResults initialized", async ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        expect(response.processResults).toBeInstanceOf(Object)
        expect(response).toHaveProperty("processResults.region", MOCK_PROCESS_RESPONSE.process_results.region)
        expect(response).toHaveProperty("processResults.projection", MOCK_PROCESS_RESPONSE.process_results.projection)
        
    })

    test("Check that progress initialized", async ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        expect(response.progress).toBeInstanceOf(ProgressInfoModel)
        expect(response).toHaveProperty("progress.step", MOCK_PROCESS_RESPONSE.progress.step)
        expect(response).toHaveProperty("progress.num_of_steps", MOCK_PROCESS_RESPONSE.progress.num_of_steps)
        // Check default values set
        expect(response).toHaveProperty("progress.sub_step", 0)
        expect(response).toHaveProperty("progress.num_of_sub_steps", 0)
    })

    test("Check that urls initialized", async ()=> {
        let response = new ProcessResponseModel({...MOCK_PROCESS_RESPONSE})
        expect(response.urls).toBeInstanceOf(UrlModel)
        expect(response).toHaveProperty("urls.resources",MOCK_PROCESS_RESPONSE.urls.resources)
        expect(response).toHaveProperty("urls.status", MOCK_PROCESS_RESPONSE.urls.status)
        // Check default values set
        expect(response).toHaveProperty("progress.sub_step", 0)
        expect(response).toHaveProperty("progress.num_of_sub_steps", 0)
    })
    
})