/*
 * Filename: Client.test.js
 * Project: OpenPlains
 * File Created: Monday September 12th 2022
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

import { SETTINGS } from "../settings"
import clientOp, { Client } from "./Client"

describe("Client", ()=> {
 
    const client = clientOp
    const BASIC_AUTH = {
        username: "user",
        password: "pass"
    }

    const TOKEN = "testValue"

    const TEST_HOST = "http://localhost:5000"
 
    test("Return instance of Client", ()=> {
        expect(client instanceof Client).toBeTruthy()
    })

    test("host property is set from settings.js", ()=> {
        expect(client).toHaveProperty("host", SETTINGS.API_HOST)
    })

    test("apiSource property is set from settings.js", ()=> {
        expect(client).toHaveProperty("apiSource", SETTINGS.API_SOURCE)
    })

    test("apiVersion property is set from settings.js", ()=> {
        expect(client).toHaveProperty("apiVersion", SETTINGS.ACTINIA_VERSION)
    })

    test("language property is set from settings.js", ()=> {
        expect(client).toHaveProperty("language", SETTINGS.LANGUAGE)
    })


    test("userAuth property is undefined", ()=> {
        expect(client).toHaveProperty("userAuth", undefined)
    })

    test("userAuth property is set", ()=> {
        client.setBasicAuth(BASIC_AUTH)
        expect(client).toHaveProperty("userAuth", BASIC_AUTH)
        expect(client).toHaveProperty("userAuth.username", BASIC_AUTH.username)
        expect(client).toHaveProperty("userAuth.password", BASIC_AUTH.password)
    })

    test("token property is undefined", ()=> {
        expect(client).toHaveProperty("token", undefined)
    })

    test("token property is set", ()=> {
        client.setToken(TOKEN)
        expect(client).toHaveProperty("token", TOKEN)
    })


    test("Change the host", ()=> {
        client.setHost(TEST_HOST)
        expect(client).toHaveProperty("host", TEST_HOST)
    })


})

