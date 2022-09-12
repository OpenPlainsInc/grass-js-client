/*
 * Filename: SimpleResponseModel.test.js
 * Project: OpenPlains
 * File Created: Friday August 19th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Mon Sep 12 2022
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


import {SimpleResponseModel} from "./SimpleResponseModel"

describe("SimpoleResponseModel Test", ()=> {

    test("Create an instance of an accepted SimpleResponseModel", ()=> {
        const mockData = new SimpleResponseModel({
            status: "accepted",
            message: ""
        })
        expect(mockData instanceof SimpleResponseModel).toBeTruthy()
        expect(mockData.status).toBe("accepted")
    })

    test("Create an instance of a running SimpleResponseModel", ()=> {
        const mockData = new SimpleResponseModel({status: "running", message: ""})
        expect(mockData.status).toBe("running")
    })

    test("Create an instance of a finished SimpleResponseModel", ()=> {
        const mockData = new SimpleResponseModel({status: "finished", message: ""})
        expect(mockData.status).toBe("finished")
    })

    test("Create an instance of a terminated SimpleResponseModel", ()=> {
        const mockData = new SimpleResponseModel({status: "terminated", message: ""})
        expect(mockData.status).toBe("terminated")
    })
   
    test("Create an instance of a error SimpleResponseModel", ()=> {
        const mockData = new SimpleResponseModel({status: "error", message: ""})
        expect(mockData.status).toBe("error")
    })

    test("Create an instance of a success SimpleResponseModel", ()=> {
        const mockData = new SimpleResponseModel({status: "success", message: ""})
        expect(mockData.status).toBe("success")
    })

    test("Create an instance of a failing SimpleResponseModel", ()=> {  
        expect(()=> new SimpleResponseModel({status: "dog", message: ""})).toThrow("Server response status 'dog' is not a valid option")
    })

})