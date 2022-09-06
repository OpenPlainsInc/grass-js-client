/*
 * Filename: ModuleParamSchemaSubType.js
 * Project: TomorrowNow
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
    static CELL = new ModuleParamSchemaSubType('cell');
    static VECTOR = new ModuleParamSchemaSubType('vector');
    static COORDS = new ModuleParamSchemaSubType('coords');
    static SEPARATOR = new ModuleParamSchemaSubType('separator');
    static DBCOLUMN = new ModuleParamSchemaSubType('dbcolumn');
    static COLORTABLE = new ModuleParamSchemaSubType('colortable');
    static GRID3 = new ModuleParamSchemaSubType('grid3');
    static FILE = new ModuleParamSchemaSubType('file');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `ModuleParamSchemaSubType.${this.name}`
    }

    validate() {
        if (!Object.keys(ModuleParamSchemaSubType).includes(this.name)) throw Error(`Server response subtype '${this.name}' is not a valid option`)
        return this.name
    }
}