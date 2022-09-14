/*
 * Filename: mapsets.js
 * Project: OpenPlains
 * File Created: Friday August 19th 2022
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
 * Mapsets module.
 * @module
 */

import { RESPONSESTRINGS } from "../strings";
import { ApiRequest } from "./utils";
import { ProcessResponseModel } from "../Models/ProcessResponseModel";
import { MapsetInfoResponseModel } from "../Models/MapsetInfoResponseModel";
import { SimpleResponseModel } from "../Models/SimpleResponseModel";
import opClient from "../Models/Client";

const client = opClient;
const API_HOST = `${client.host}/g/locations`;

const MAPSET_ROUTES = (locationName, mapsetName=undefined) => {
    return mapsetName ? `${API_HOST}/${locationName}/mapsets/${mapsetName}` : `${API_HOST}/${locationName}/mapsets`
}

const INFO_ROUTES = (locationName, mapsetName) => `${MAPSET_ROUTES(locationName, mapsetName)}/info`
const LOCK_ROUTES = (locationName, mapsetName) => `${MAPSET_ROUTES(locationName, mapsetName)}/lock`


const MAPSET_ERROR_RESPONSE = RESPONSESTRINGS.errorRepsonse.mapset


/**
 * Get a list of all mapsets that are located in a specific location.
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel|SimpleResponseModel>}
 */
const getMapsets = (async (locationName, options={}) => {
    return new ApiRequest({
        url: new URL(MAPSET_ROUTES(locationName)),
        successResponseClass: ProcessResponseModel, 
        errorResponseClass: SimpleResponseModel, 
        errorString: MAPSET_ERROR_RESPONSE.getMapsets[client.language], 
        options:options
    }).getRequest() 
})

/**
 * Create a new mapset in an existing location.
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {string} mapsetName - The mapset name
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const createMapset = (async (locationName, mapsetName, options={}) => {
    return new ApiRequest({
        url: new URL(MAPSET_ROUTES(locationName, mapsetName)),
        successResponseClass: ProcessResponseModel, 
        errorResponseClass: SimpleResponseModel, 
        errorString: MAPSET_ERROR_RESPONSE.createMapset[client.language], 
        options:options
    }).postRequest() 
})

/**
 * Delete an existing mapset.
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {string} mapsetName - The mapset name
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const deleteMapset = (async (locationName, mapsetName, options={}) => {
    return new ApiRequest({
        url: new URL(MAPSET_ROUTES(locationName, mapsetName)),
        successResponseClass: ProcessResponseModel, 
        errorResponseClass: ProcessResponseModel, 
        errorString: MAPSET_ERROR_RESPONSE.deleteMapset[client.language], 
        options:options
    }).deleteRequest() 
})

/**
 * The current computational region of the mapset and the projection of the location
 * Route: /locations/{location_name}/mapsets/{mapsetName}/info
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {string} mapsetName - The mapset name
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<MapsetInfoResponseModel|SimpleResponseModel>}
 */
const getMapset = (async (locationName, mapsetName, options={}) => {
    const url = new URL(INFO_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.getMapset[client.language]
    return new ApiRequest({
        url: url,
        successResponseClass: MapsetInfoResponseModel, 
        errorResponseClass: SimpleResponseModel, 
        errorString: errorString, 
        options:options
    }).getRequest() 
})

/**
 * Get the location/mapset lock status.
 * Minimum required user role: admin.
 * Route: /locations/{location_name}/mapsets/{mapset_name}
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {string} mapsetName - The mapset name
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const getLock = (async (locationName, mapsetName, options={}) => {
    const url = new URL(LOCK_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.getMapsetLock[client.language]
    return new ApiRequest({
        url: url,
        successResponseClass: ProcessResponseModel, 
        errorResponseClass: ProcessResponseModel, 
        errorString: errorString, 
        options:options
    }).getRequest() 
})

/**
 * Create a location/mapset lock. A location/mapset lock can be created so that no operation can be performed on it until it is unlocked.
 * Minimum required user role: admin.
 * Route: /locations/{location_name}/mapsets/{mapset_name}/lock
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {string} mapsetName - The mapset name
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const createLock = (async (locationName, mapsetName, options={}) => {
    const url = new URL(LOCK_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.createMapsetLock[client.language]
    return new ApiRequest({
        url: url,
        successResponseClass: ProcessResponseModel, 
        errorResponseClass: ProcessResponseModel, 
        errorString: errorString, 
        options:options
    }).postRequest() 
})

/**
 * Delete a location/mapset lock. A location/mapset lock can be deleted so that operation can be performed on it until it is locked.
 * Minimum required user role: admin.
 * Route: /locations/{location_name}/mapsets/{mapset_name}
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {string} mapsetName - The mapset name
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const deleteLock = (async (locationName, mapsetName, options={}) => {
        const url = new URL(LOCK_ROUTES(locationName, mapsetName))
        const errorString = MAPSET_ERROR_RESPONSE.deleteMapsetLock[client.language]
        return new ApiRequest({
            url: url,
            successResponseClass: ProcessResponseModel, 
            errorResponseClass: ProcessResponseModel, 
            errorString: errorString, 
            options:options
        }).deleteRequest()
    })

const Mapsets = {
    getMapsets,
    createMapset,
    deleteMapset,
    getMapset,
    getLock,
    createLock,
    deleteLock
}

export default Mapsets