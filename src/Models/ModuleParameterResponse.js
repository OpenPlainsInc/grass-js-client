/*
 * Filename: ModuleParameterResponse.js
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

import { ModuleParameterSchemaResponse } from "./ModuleParameterSchemaResponse";

/**
 * @Actinia
 * @version 4.1.0
 * Class that defines the response a list of parameters that are applicable for this process.
 */
 export class ModuleParameterResponse {
    /**
     * Create ProcessLog instance
     * @param {Object}
     * @param {String} name A unique name for the parameter. 
     * @param {String} description Detailed description to fully explain the entity.
     * @param {ModuleParameterSchemaResponse} schema A list of parameters that are applicable for this process.
     * @param {Boolean} [optional = true] The parameter of the executable
     * @param {String} [defaultValue = undefined] The default value for this parameter.
     
     */
    constructor({name, description, schema, optional=true, defaultValue=undefined}) {
        this.name = name;
        this.description = description;
        this.optional = optional;
        this.defaultValue = defaultValue; // is default
        this.schema = new ModuleParameterSchemaResponse({...schema});
    }

}


