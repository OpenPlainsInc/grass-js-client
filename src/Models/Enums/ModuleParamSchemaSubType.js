/*
 * Filename: ModuleParamSchemaSubType.js
 * Project: OpenPlains
 * File Created: Tuesday September 6th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Sep 06 2022
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


export class ModuleParamSchemaSubType {
    static cell = new ModuleParamSchemaSubType('cell');
    static vector = new ModuleParamSchemaSubType('vector');
    static coords = new ModuleParamSchemaSubType('coords');
    static separator = new ModuleParamSchemaSubType('separator');
    static dbcolumn = new ModuleParamSchemaSubType('dbcolumn');
    static colortable = new ModuleParamSchemaSubType('colortable');
    static grid3 = new ModuleParamSchemaSubType('grid3');
    static file = new ModuleParamSchemaSubType('file');
    static dir = new ModuleParamSchemaSubType('dir');

    constructor(name) {
        this.name = name;
    }

    toList() {
        return Object.keys(ModuleParamSchemaSubType).forEach(option => option)
    }

    toString() {
        return `ModuleParamSchemaSubType.${this.name}`
    }

    validate() {
        if (!Object.keys(ModuleParamSchemaSubType).includes(this.name)) throw Error(`Server response subtype '${this.name}' is not a valid option`)
        return this.name
    }
}