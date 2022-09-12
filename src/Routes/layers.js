/*
 * Filename: layers.js
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

/**
 * Layers module.
 * @module
 */

import { RESPONSESTRINGS } from "../strings";
import { apiRequest } from "./utils";
import { ProcessResponseModel } from "../Models/ProcessResponseModel";
import { ImagePNGResponse } from "../Models/ImagePNGResponse";
import { RasterInfoResponseModel } from "../Models/RasterInfoResponseModel";
import opClient from "../Models/Client";
 
const client = opClient;
const API_HOST = `${client.host}/g/locations`;
 
const MAPSET_ROUTES = (locationName, mapsetName=undefined) => {
    return mapsetName ? `${API_HOST}/${locationName}/mapsets/${mapsetName}` : `${API_HOST}/${locationName}/mapsets`
}
 
const RASTER_ROUTES = (locationName, mapsetName, rasterName=undefined) => {
    return rasterName ? `${MAPSET_ROUTES(locationName, mapsetName)}/raster_layers/${rasterName}` : `${MAPSET_ROUTES(locationName, mapsetName)}/raster_layers`
}
const RASTER_RENDER_ROUTES = (locationName, mapsetName, rasterName) => `${RASTER_ROUTES(locationName, mapsetName, rasterName)}/render`
const RASTER_COLOR_ROUTES = (locationName, mapsetName, rasterName) => `${RASTER_ROUTES(locationName, mapsetName, rasterName)}/colors`
const RASTER_GEOTIFF_ASYNC_ROUTES = (locationName, mapsetName, rasterName, orig=false) => {
    return orig ? `${RASTER_ROUTES(locationName, mapsetName, rasterName)}/geotiff_async_orig` : `${RASTER_ROUTES(locationName, mapsetName, rasterName)}/geotiff_async`
}
 
const VECTOR_ROUTES = (locationName, mapsetName, vectorName=undefined) => {
    return vectorName ? `${MAPSET_ROUTES(locationName, mapsetName)}/vector_layers/${vectorName}` : `${MAPSET_ROUTES(locationName, mapsetName)}/vector_layers`
}
const VECTOR_RENDER_ROUTES = (locationName, mapsetName, vectorName) => `${VECTOR_ROUTES(locationName, mapsetName, vectorName)}/render`

const MAPSET_ERROR_RESPONSE = RESPONSESTRINGS.errorRepsonse.mapset

/**
 * Get a list of raster map layer names that are located in a specific location/mapset.
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The mapset name. 
 * @param {String} [searchpattern=undefined] - A parameter passed to g.list for raster map layer selection, eg.: http://<url>?pattern=\"*\"
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const getRasters = ( async (locationName, mapsetName, searchpattern=undefined, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.getRasters[client.language]
    let queryParams = searchpattern ? {pattern:searchpattern} : {}
    return apiRequest(url, "GET", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, options)
})
 
/**
 * Rename a single raster map layer or a list of raster map layers that are located in a specific location/mapset.
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset from which the raster map layers should be renamed.
 * @param {Tuple[]} renameList - A list of raster name tuples [(a, a_new),(b, b_new),(c, c_new), ...]
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const renameRasters = ( async (locationName, mapsetName, renameList=undefined, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.renameRasters[client.language]
    const _options = {
        body: JSON.stringify({rename_list: renameList}),
        ...options
    }
    let queryParams = {}
    return apiRequest(url, "PUT", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, _options)
})

/**
 * Delete a single raster map layer or a list of raster map layer names that are located in a specific location/mapset.
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset from which the raster map layers should be deleted.
 * @param {String} [searchpattern=undefined] - A parameter passed to g.list for raster map layer selection, eg.: http://<url>?pattern=\"*\"
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const deleteRasters = ( async (locationName, mapsetName, searchpattern=undefined, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName))
    const errorString = MAPSET_ERROR_RESPONSE.deleteRasters[client.language]
    let queryParams = searchpattern ? {pattern:searchpattern} : {}
    return apiRequest(url, "DELETE", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, options)
})
 
/**
 * Get information about an existing raster map layer.
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers/{raster_name}
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset that contains the required raster map layer.
 * @param {String} rasterName - The name of the raster map layer to get information about.
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<RasterInfoResponseModel>}
 */
const getRaster = ( async (locationName, mapsetName, rasterName, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName, rasterName))
    const errorString = MAPSET_ERROR_RESPONSE.getRaster[client.language]
    let queryParams = {}
    return apiRequest(url, "GET", RasterInfoResponseModel, RasterInfoResponseModel, errorString, queryParams, options)
})
 
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
 * @param {FormData} data - The geotiff file data to be uploaded
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<RasterInfoResponseModel|ProcessingErrorResponseModel>}
 */
const createRaster = ( async (locationName, mapsetName, rasterName, data, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName, rasterName))
    const errorString = MAPSET_ERROR_RESPONSE.createRaster[client.language]
    let queryParams = {}
 
    //Set file upload options
    let _options = {
        ...options,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }
    return apiRequest(url, "POST", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, _options)
})
 
/**
 * Delete an existing raster map layer. Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers/{raster_name}
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset that contains the required raster map layer.
 * @param {String} rasterName - The name of the raster map layer to be deleted
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const deleteRaster = ( async (locationName, mapsetName, rasterName, options={}) => {
    const url = new URL(RASTER_ROUTES(locationName, mapsetName, rasterName))
    const errorString = MAPSET_ERROR_RESPONSE.deleteRaster[client.language]
    let queryParams = {}
    return apiRequest(url, "DELETE", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, options)
})

/**
 * Render a raster map layer as a PNG image. 
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/raster_layers/{raster_name}/render
 * @function
 * @async
 * @param {String} locationName - The name of the location that should be accessed.
 * @param {String} mapsetName - The name of the mapset that contains the required raster map layer.
 * @param {String} rasterName - The name of the raster map layer to be rendered
 * @param {Object} queryParams - Request query parameters
 * @param {Number} [queryParams.n] - Northern border
 * @param {Number} [queryParams.s] - Southern border
 * @param {Number} [queryParams.e] - Eastern border
 * @param {Number} [queryParams.w] - Western border
 * @param {Number} [queryParams.width] - Image width in pixel, default is 800
 * @param {Number} [queryParams.height] - Image height in pixel, default is 600
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ImagePNGResponse>}
 */
const renderRaster = (async (locationName, mapsetName, rasterName, queryParams, options={})=> {
    const url = new URL(RASTER_RENDER_ROUTES(locationName, mapsetName, rasterName))
    const errorString = MAPSET_ERROR_RESPONSE.renderRaster[client.language]
    return apiRequest(url, "GET", ImagePNGResponse, ProcessResponseModel, errorString, queryParams, options)
})

/**
 * Export an existing raster map layer as GTiff or COG (if COG driver available). 
 * The link to the exported raster map layer is located in the JSON response. 
 * Minimum required user role: user.
 * @function
 * @async
 * @param {string} locationName -The location name
 * @param {string} mapsetName -The name of the mapset that contains the required raster map layer
 * @param {string} rasterName - The name of the raster map layer to export
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const renderGeoTiff = (async (locationName, mapsetName, rasterName, options={})=> {
    const url = new URL(RASTER_GEOTIFF_ASYNC_ROUTES(locationName, mapsetName, rasterName, true))
    const errorString = MAPSET_ERROR_RESPONSE.rasterRenderGeoTiff[client.language]
    const queryParams = {}
    return apiRequest(url, "GET", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, options)
})

/**
 * Get the color definition of an existing raster map layer. Minimum required user role: user.
 * @function
 * @async
 * @param {string} locationName - The location name
 * @param {string} mapsetName - The name of the mapset t…quired raster map layer
 * @param {string} rasterName - The name of the raster map layer to get the color table from
 * @param {Object} [options={}] - Optional request parameters set to fetch.
 * @returns {Promise<ProcessResponseModel>}
 */
const getRasterColors = (async (locationName, mapsetName, rasterName, options={})=> {
    const url = new URL(RASTER_COLOR_ROUTES(locationName, mapsetName, rasterName))
    const errorString = MAPSET_ERROR_RESPONSE.rasterColor[client.language]
    const queryParams = {}
    return apiRequest(url, "GET", ProcessResponseModel, ProcessResponseModel, errorString, queryParams, options)
})
 
/**
 * Render a single vector m…quired user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/vector_layers/{vector_name}/render
 * @todo Implment correctly
 * @function
 * @async
 * @param {string} locationName - The location name
 * @param {string} mapsetName - The name of the mapset that contains the required vector map layer
 * @param {string} vectorName The name of the vector map layer to render.
 * @returns {Promise<Object>}
 */
const renderVector=  (async (locationName, mapsetName, vectorName)=> {
    try {
        const url = new URL(VECTOR_RENDER_ROUTES(locationName, mapsetName, vectorName))
        const res = await fetch(url);
        return await res.json();
    } catch (e) {
        // console.log(e);
    }
})
 
/**
 * Get information about an existing vector map layer.
 * Minimum required user role: user.
 * Route: /locations/{location_name}/mapsets/{mapsetName}/vector_layers/{vector_name}
 * @todo Implment correctly
 * @function
 * @async
 * @param {string} locationName -The location name
 * @param {string} mapsetName - The name of the mapset that contains the required vector map layer"
 * @param {string} vectorName - The name of the vector map layer to get information about.
 * @returns {Promise<Object>}
 */
const vectorInfo = (async (locationName, mapsetName, vectorName)=> {
    try {
        const url = new URL(VECTOR_ROUTES(locationName, mapsetName, vectorName))
        const res = await fetch(url);
        return await res.json();
    } catch (e) {
        // console.log(e);
    }
})
 
/**
 * Get a list of vector map layer names that are located in a specific location/mapset.
 * Minimum required user role: user
 * Route: /locations/{location_name}/mapsets/{mapsetName}/vector_layers
 * @todo Implment correctly
 * @function
 * @async
 * @param {string} locationName - The name of the location that should be accessed
 * @param {string} mapsetName - The name of the mapset from which the vector map layers should be listed
 * @returns {Promise<Object>}
 */
const vectors = (async (locationName, mapsetName) => {
    try {
        const url = new URL(VECTOR_ROUTES(locationName, mapsetName))
        let res = await fetch(url, { 
            headers: {
            'Content-Type': 'application/json'
            }
        });
        let data = await res.json();
        return data                    
    } catch (e) {
        // console.log(e);
    }
})
 
const Layers = {
    getRasters,
    renameRasters,
    deleteRasters,
    getRaster,
    createRaster,
    deleteRaster,
    renderRaster,
    getRasterColors,
    renderGeoTiff,
    renderVector,
    vectorInfo,
    vectors
}
 
 export default Layers
