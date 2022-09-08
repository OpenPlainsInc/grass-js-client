/*
 * Filename: mapsets.js
 * Project: OpenPlains
 * File Created: Friday August 19th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Thu Sep 08 2022
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
import { SETTINGS } from "../settings"
import { RESPONSESTRINGS } from "../strings"
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
const RASTER_ROUTES = (locationName, mapsetName, rasterName=undefined) => {
    return rasterName ? `${MAPSET_ROUTES(locationName, mapsetName)}/raster_layers/${rasterName}` : `${MAPSET_ROUTES(locationName, mapsetName)}/raster_layers`
}

const MAPSET_ERROR_RESPONSE = RESPONSESTRINGS.errorRepsonse.mapset


/**
 * Get a list of all mapsets that are located in a specific location. Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel|SimpleResponseModel>}
 */
const getMapsets = (async (locationName, options={}) => {
        const url = new URL(MAPSET_ROUTES(locationName))
        const errorString = MAPSET_ERROR_RESPONSE.getMapsets[SETTINGS.LANGUAGE]
        return apiRequest(url, "GET", ProcessResponseModel, SimpleResponseModel, errorString, options)
    })

/**
 * Create a new mapset in an existing location. Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {string} mapsetName - The mapset name
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const createMapset = (async (locationName, mapsetName, options={}) => {
        const url = new URL(MAPSET_ROUTES(locationName, mapsetName))
        const errorString = MAPSET_ERROR_RESPONSE.createMapset[SETTINGS.LANGUAGE]
        return apiRequest(url, "POST", ProcessResponseModel, ProcessResponseModel, errorString, options)
    })

/**
 * Delete an existing mapset. Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed.
 * @param {string} mapsetName - The mapset name
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const deleteMapset = (async (locationName, mapsetName, options={}) => {
        const url = new URL(MAPSET_ROUTES(locationName, mapsetName))
        const errorString = MAPSET_ERROR_RESPONSE.deleteMapset[SETTINGS.LANGUAGE]
        return apiRequest(url, "DELETE", ProcessResponseModel, ProcessResponseModel, errorString, options)
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
        const errorString = MAPSET_ERROR_RESPONSE.getMapset[SETTINGS.LANGUAGE]
        return apiRequest(url, "GET", MapsetInfoResponseModel, SimpleResponseModel, errorString, options)
    })

/**
 * Get the location/mapset lock status. Minimum required user role: admin.
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
         const errorString = MAPSET_ERROR_RESPONSE.getMapsetLock[SETTINGS.LANGUAGE]
         return apiRequest(url, "GET", ProcessResponseModel, ProcessResponseModel, errorString, options)
    })

/**
 * Create a location/mapset lock. A location/mapset lock can be created so that no operation can be performed on it until it is unlocked. Minimum required user role: admin.
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
        const errorString = MAPSET_ERROR_RESPONSE.createMapsetLock[SETTINGS.LANGUAGE]
        return apiRequest(url, "POST", ProcessResponseModel, ProcessResponseModel, errorString, options)
    })

/**
 * Delete a location/mapset lock. A location/mapset lock can be deleted so that operation can be performed on it until it is locked. Minimum required user role: admin.
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
        const errorString = MAPSET_ERROR_RESPONSE.deleteMapsetLock[SETTINGS.LANGUAGE]
        return apiRequest(url, "DELETE", ProcessResponseModel, ProcessResponseModel, errorString, options)
    })

/**
 * Get a list of raster map layer names that are located in a specific location/mapset. Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The mapset name.
 * @param {String} [searchpattern=undefined] - A parameter passed to g.list for raster map layer selection, eg.: http://<url>?pattern=\"*\"
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const getRasterLayers = ( async (locationName, mapsetName, searchpattern=undefined, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.getRasters[SETTINGS.LANGUAGE]
    let queryParams = searchpattern ? {pattern:searchpattern} : {}
    return apiRequest(url, "GET", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, options)
})

/**
 * Rename a single raster map layer or a list of raster map layers that are located in a specific location/mapset. Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset from which the raster map layers should be renamed.
 * @param {Tuple[]} renameList - A list of raster name tuples [(a, a_new),(b, b_new),(c, c_new), ...]
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
 const renameRasterLayers = ( async (locationName, mapsetName, renameList=undefined, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.renameRasters[SETTINGS.LANGUAGE]
    const _options = {
        body: JSON.stringify({rename_list: renameList}),
        ...options
    }
    let queryParams = {}
    return apiRequest(url, "PUT", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, _options)
})


/**
 * Delete a single raster map layer or a list of raster map layer names that are located in a specific location/mapset. Minimum required user role: user."
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset from which the raster map layers should be deleted.
 * @param {String} [searchpattern=undefined] - A parameter passed to g.list for raster map layer selection, eg.: http://<url>?pattern=\"*\"
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
 const deleteRasterLayers = ( async (locationName, mapsetName, searchpattern=undefined, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.deleteRasters[SETTINGS.LANGUAGE]
    let queryParams = searchpattern ? {pattern:searchpattern} : {}
    return apiRequest(url, "DELETE", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, options)
})


/**
 * @TODO Define RasterInfoResponseModel and ProcessingErrorResponseModel
 * Get information about an existing raster map layer. Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers/{raster_name}
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset that contains the required raster map layer.
 * @param {String} rasterName - The name of the raster map layer to get information about.
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<RasterInfoResponseModel|ProcessingErrorResponseModel>}
 */
//  const getRasterLayer = ( async (locationName, mapsetName, rasterName, options={}) => {
//     const url = new URL(RASTER_ROUTES(locationName, mapsetName, rasterName))
//     const errorString = MAPSET_ERROR_RESPONSE.getRaster[SETTINGS.LANGUAGE]
//     let queryParams = {}
//     return apiRequest(url, "GET", RasterInfoResponseModel, ProcessingErrorResponseModel, errorString, queryParams, options)
// })


/**
 * Create a new raster map layer by uploading a GeoTIFF. This method will fail if the map already exists. 
 * An example request is 
 * 'curl -L -u \"XXX:XXX\" -X POST -H \"Content-Type: multipart/form-data\" -F \"file=@/home/....tif\" http://localhost:8088/api/v3/locations/nc_spm_08/mapsets/test_mapset/raster_layers/testraster'. 
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers/{raster_name}
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset in which the raster map layer should be created
 * @param {String} rasterName - The name of the new raster map layer to be created
 * @param {FormData} data - The geotiff data to be uploaded
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<RasterInfoResponseModel|ProcessingErrorResponseModel>}
 */
 const createRasterLayer = ( async (locationName, mapsetName, rasterName, data, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName, rasterName))
    const errorString = MAPSET_ERROR_RESPONSE.createRaster[SETTINGS.LANGUAGE]
    let queryParams = {}

    //Set file upload options
    let _options = {
        ...options,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }
    return apiRequest(url, "POST", ProcessingResponseModel, ProcessingResponseModel, errorString, queryParams, _options)
})

const Mapsets = {
    getMapsets,
    createMapset,
    deleteMapset,
    getMapset,
    getLock,
    createLock,
    deleteLock,
    getRasterLayers,
    renameRasterLayers,
    deleteRasterLayers,
    // getRasterLayer,
    createRasterLayer
}

export default Mapsets