/*
 * Filename: ProjectionInfoModel.js
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

import { EpsgSearchResponse } from "./EpsgSearchResponse";

/**
 * @Version Actinia 4.0.1
 * Actinia class mapping representing the schema to define projection information as JSON input in POST requests
 */
export class ProjectionInfoModel {
    static MAPTILER_BASE_URL = "https://api.maptiler.com/";

    /**
     * Create a ProjectionInfoModel instance
     * @param {Object} param0
     * @param {String} param0.epsg The EPSG code of the projection that should be used to create a location.
     */
    constructor({ epsg }) {
        this.epsg = epsg;
        this.projectionDetails = {};
    }

    /**
     * Fetch details about projection from epsg.io
     * @returns {Promise<ProjectionInfoModel>} ProjectionInfoModel with parameter projectionDetails containing projection details 
     */
    async fetchDetails() {
        const response = await ProjectionInfoModel.searchEpsg(this.epsg);

        if (response.results) {
            this.projectionDetails = response.results
                .filter(result => result && result.id.code && result.exports.proj4 && result.bbox && result.bbox.length === 4)
                .map(result => ({
                    code: result.id.code,
                    name: result.name,
                    proj4def: result.exports.proj4,
                    bbox: result.bbox
                }));
        }
        return this;
    }

    /**
     * Search for details for a specific epsg code.
     * @param {String} epsg 
     * @returns {Promise<EpsgSearchResponse>} Response from epsg.io or error response.
     */
    static async searchEpsg(epsg) {
        const searchPath = "/coordinates/search/";
        try {
            const url = new URL(`${this.MAPTILER_BASE_URL}${searchPath}${epsg}.json`);
            const res = await fetch(url);
            const data = await res.json();
            return new EpsgSearchResponse(data);
        } catch (e) {
            return e;
        }
    }
}
