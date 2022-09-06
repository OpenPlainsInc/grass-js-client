/*
 * Filename: mapsets.js
 * Project: OpenPlains
 * File Created: Friday August 19th 2022
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

import { SETTINGS } from "../settings.json"
import { RESPONSESTRINGS } from "../strings.json"
import { apiRequest } from "./utils";
import { ProcessResponseModel } from "../Models/ProcessResponseModel";
import { MapsetInfoResponseModel } from "../Models/MapsetInfoResponseModel";
import { SimpleResponseModel } from "../Models/SimpleResponseModel";

const API_HOST = `${SETTINGS.API_HOST}/g/locations`;

const MAPSET_ROUTES = (locationName, mapsetName=undefined) => {
    return mapsetName ? `${API_HOST}/${locationName}/mapsets/${mapsetName}` : `${API_HOST}/${locationName}/mapsets`
}

const INFO_ROUTES = (locationName, mapsetName) => `${MAPSET_ROUTES(locationName, mapsetName)}/info`
const LOCK_ROUTES = (locationName, mapsetName) => `${MAPSET_ROUTES(locationName, mapsetName)}/lock`

const MAPSET_ERROR_RESPONSE = RESPONSESTRINGS.errorRepsonse.mapset

const Mapsets = {
    getMapsets: (async (locationName, options={}) => {
        /**
         * Get a list of all mapsets that are located in a specific location. Minimum required user role: user.
         * Route: /locations/{location_name}/mapsets
        */
        const url = new URL(MAPSET_ROUTES(locationName))
        const errorString = MAPSET_ERROR_RESPONSE.getMapsets[SETTINGS.LANGUAGE]
        return apiRequest(url, "GET", ProcessResponseModel, SimpleResponseModel, errorString, options)
    }),
    createMapset: (async (locationName, mapsetName, options={}) => {
        /**
         * Create a new mapset in an existing location. Minimum required user role: user.
         * Route: /locations/{location_name}/mapsets
        */
        const url = new URL(MAPSET_ROUTES(locationName, mapsetName))
        const errorString = MAPSET_ERROR_RESPONSE.createMapset[SETTINGS.LANGUAGE]
        return apiRequest(url, "POST", ProcessResponseModel, ProcessResponseModel, errorString, options)
    }),
    deleteMapset: (async (locationName, mapsetName, options={}) => {
        /**
         * Delete an existing mapset. Minimum required user role: user.
         * Route: /locations/{location_name}/mapsets/{mapset_name}
        */
        const url = new URL(MAPSET_ROUTES(locationName, mapsetName))
        const errorString = MAPSET_ERROR_RESPONSE.deleteMapset[SETTINGS.LANGUAGE]
        return apiRequest(url, "DELETE", ProcessResponseModel, ProcessResponseModel, errorString, options)
    }),
    getMapset: (async (locationName, mapsetName, options={}) => {
        /**
         * The current computational region of the mapset and the projection of the location
         * Route: /locations/{location_name}/mapsets/{mapsetName}/info
        */
        const url = new URL(INFO_ROUTES(locationName, mapsetName))
        const errorString = MAPSET_ERROR_RESPONSE.getMapset[SETTINGS.LANGUAGE]
        return apiRequest(url, "GET", MapsetInfoResponseModel, SimpleResponseModel, errorString, options)
    }),
    getLock: (async (locationName, mapsetName, options={}) => {
        /**
         * Get the location/mapset lock status. Minimum required user role: admin.
         * Route: /locations/{location_name}/mapsets/{mapset_name}
        */
         const url = new URL(LOCK_ROUTES(locationName, mapsetName))
         const errorString = MAPSET_ERROR_RESPONSE.getMapsetLock[SETTINGS.LANGUAGE]
         return apiRequest(url, "GET", ProcessResponseModel, ProcessResponseModel, errorString, options)
    }),
    createLock: (async (locationName, mapsetName, options={}) => {
        /**
         * Create a location/mapset lock. A location/mapset lock can be created so that no operation can be performed on it until it is unlocked. Minimum required user role: admin.
         * Route: /locations/{location_name}/mapsets/{mapset_name}/lock
        */
        const url = new URL(LOCK_ROUTES(locationName, mapsetName))
        const errorString = MAPSET_ERROR_RESPONSE.createMapsetLock[SETTINGS.LANGUAGE]
        return apiRequest(url, "POST", ProcessResponseModel, ProcessResponseModel, errorString, options)
    }),
    deleteLock: (async (locationName, mapsetName, options={}) => {
        /**
         * Delete a location/mapset lock. A location/mapset lock can be deleted so that operation can be performed on it until it is locked. Minimum required user role: admin.
         * Route: /locations/{location_name}/mapsets/{mapset_name}
        */
        const url = new URL(LOCK_ROUTES(locationName, mapsetName))
        const errorString = MAPSET_ERROR_RESPONSE.deleteMapsetLock[SETTINGS.LANGUAGE]
        return apiRequest(url, "DELETE", ProcessResponseModel, ProcessResponseModel, errorString, options)
    })
}

export default Mapsets