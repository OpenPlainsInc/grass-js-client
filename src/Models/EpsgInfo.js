/*
 * Filename: EpsgInfo.js
 * Project: OpenPlains
 * File Created: Thursday May 26th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Feb 19 2025
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

/**
 * Class representing espg info return by epsg.io query.
 */
export class EpsgInfo {
    /**
     * Create an EpsgInfo
     * @param {Object} data - The data object containing EPSG information
     */
    constructor(data) {
        this.code = data.id.code;
        this.kind = data.kind;
        this.bbox = Array.isArray(data.bbox) ? data.bbox : null;
        this.wkt = data.exports.wkt;
        this.unit = data.unit;
        this.proj4 = data.exports.proj4;
        this.name = data.name;
        this.area = data.area;
        this.defaultTrans = data.default_transformation.code;
        this.trans = [...data.transformations];
        this.accuracy = data.accuracy;
    }
}
