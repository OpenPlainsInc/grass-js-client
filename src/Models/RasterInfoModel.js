/*
 * Filename: RasterInfoModel.js
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
 * Schema that contains raster map layer information
 * @class
 * @param {string} cells
 * @param {string} cols
 * @param {string} comments
 * @param {string} creator
 * @param {string} database
 * @param {string} maptype
 * @param {string} east
 * @param {string} date
 * @param {string} description
 * @param {string} ewres
 * @param {string} max
 * @param {string} min
 * @param {string} ncats
 * @param {string} nsres
 * @param {string} location
 * @param {string} map
 * @param {string} mapset
 * @param {string} rows
 * @param {string} source1
 * @param {string} north
 * @param {string} source2
 * @param {string} units
 * @param {string} vdatum
 * @param {string} timestamp
 * @param {string} title
 * @param {string} west
 * @param {string} semantic_label
 */
 export class RasterInfoModel {
   
    constructor({
        cells,
        cols, 
        comments,
        creator,
        database,
        datatype,
        maptype,
        east,
        date,
        description,
        ewres,
        max,
        min,
        ncats,
        nsres,
        location,
        map,
        mapset,
        rows,
        source1,
        north,
        source2,
        units,
        vdatum,
        timestamp,
        title,
        west,
        semantic_label
    }) {
        this.cells = cells
        this.cols = cols
        this.comments = comments
        this.creator = creator
        this.database = database
        this.datatype = datatype
        this.maptype = maptype
        this.east = east
        this.date = date
        this.description = description
        this.ewres = ewres
        this.max = max
        this.min = min
        this.ncats = ncats
        this.nsres = nsres
        this.location = location
        this.map = map
        this.mapset = mapset
        this.rows = rows
        this.source1 = source1
        this.north = north
        this.source2 = source2
        this.units = units
        this.vdatum = vdatum
        this.timestamp = timestamp
        this.title = title
        this.west = west
        this.semanticLabel = semantic_label
    }
}
