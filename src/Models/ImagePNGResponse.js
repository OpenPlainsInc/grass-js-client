/*
 * Filename: ImagePNGResponse.js
 * Project: OpenPlains
 * File Created: Thursday September 8th 2022
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
 * A class that holds a PNG image response from the server
 * @class
 * @param {string} raster_name - The name of the raster
 * @param {string} imagedata - Base64 encoding of png image
 */
 export class ImagePNGResponse {
    constructor({raster_name, imagedata}) {
        this.rasterName = raster_name;
        this.imagedata = imagedata;
    }

    /**
     * Return a url for the base64 png data.
     * @method
     * @returns {string} - Url of base64 png data
     */
    url() {
        return `data:image/png;base64,${this.imagedata}`
    }
}