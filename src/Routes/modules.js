/*
 * Filename: modules.js
 * Project: OpenPlains
 * File Created: Tuesday September 6th 2022
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

/**
 * Modules module.
 * @module
 */
import { RESPONSESTRINGS } from "../strings"
import { ApiRequest } from "./utils";
import { ModuleListResponse } from "../Models/ModuleListResponse";
import { SimpleStatusCodeResponseModel } from "../Models/SimpleStatusCodeResponseModel";
import { ModuleResponse } from "../Models/ModuleResponse";
import opClient from "../Models/Client";

const client = opClient;
const API_HOST = `${client.host}/g/modules`;

// const MODULE_FAMILIES = ["d", "db", "g", "i", "m", "ps", "r", "r3", "t", "test", "v"]

const MODULE_ERROR_RESPONSE = RESPONSESTRINGS.errorRepsonse.modules

/**
 * Get a list of modules.
 * Minimum required user role: user.
 * route: /grass_modules
 * @function
 * @async
 * @param {Object} [queryParams={}]
 * @param {String} queryParams.tag - Filter for categories
 * @param {String} queryParams.category - Another filter for categories
 * @param {String} queryParams.family - Type of GRASS GIS module
 * @param {String} queryParams.record - If set to 'full', all information about the returned modules are given like in
 *  the single module description. Depending on active cache, this response might run into a timeout. 
 *  A filter can prevent this.
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @return {Promise<ModuleListResponse|SimpleStatusCodeResponseModel>}
 */ 
const getModules = (async (queryParams={}, options={}) => {
        const url = new URL(API_HOST)
        const errorString = MODULE_ERROR_RESPONSE.getModules[client.language]
        const _requestParams = new ApiRequest({
            url: url, 
            successResponseClass: ModuleListResponse, 
            errorResponseClass: SimpleStatusCodeResponseModel, 
            errorString: errorString, 
            queryParams: queryParams, 
            options:options
        })
        return _requestParams.getRequest()
    })

/**
* Get the description of a module.
* Can be also used to reload cache for a certain modulefor the full module description in listModules.
* Minimum required user role: user.
* route: /grass_modules/{grassmodule}
* @function
* @async
* @param {string} grassmodule - The name of a GRASS module
* @param {Object} [options={}] - Optional request parameters set to fetch.
* @return {Promise<ModuleResponse|SimpleStatusCodeResponseModel>}
*/ 
const getModule = (async (grassmodule, options={}) => {
        const url = new URL(`${API_HOST}/${grassmodule}`)
        const errorString = MODULE_ERROR_RESPONSE.getModule[client.language]
        const _requestParams = new ApiRequest({
            url: url,
            method: "GET",
            successResponseClass: ModuleResponse, 
            errorResponseClass: SimpleStatusCodeResponseModel, 
            errorString: errorString, 
            options:options
        })
        return _requestParams.getRequest()
    })


const Modules = {
    getModules,
    getModule
}

export default Modules
