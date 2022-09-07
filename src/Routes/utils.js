/*
 * Filename: utils.js
 * Project: OpenPlains
 * File Created: Monday August 22nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Wed Sep 07 2022
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


export const apiRequest = (async (url, method, successResponseClass, errorResponseClass, errorString, queryParams={}, options={}) => {
    try {
        let params = new URLSearchParams(queryParams)
        let _url = `${url}?${params}`
        let res = await fetch(_url, { 
            method: method,
            headers: {
            'Content-Type': 'application/json'
            },
            ...options
        });
        let data = await res.json()
        if (res.ok) return new successResponseClass({...data.response});
        return new errorResponseClass({...data.response});              
      } catch (err) {
        console.error(`${errorString} ${err}`);
    }
})