/*
 * Filename: utils.js
 * Project: OpenPlains
 * File Created: Monday August 22nd 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Sep 13 2022
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
 * @class
 * A class to create an API request
 * @param {string} url - The url to make the request
 * @param {string} [method = {}] - The request method (GET, POST, DELETE, PUT).
 * @param {*} [successResponseClass = {}] - The class to initailize a successful response to.
 * @param {*} [errorResponseClass= {}] - The class to initailize a error response to.
 * @param {string} [errorString = ""] - A string representing the error message.
 * @param {Object} [queryParams = {}] - An object containing the query string parameter.
 * @param {Object} [options = {}] - An optional request object parameters set to fetch.
 */
export class ApiRequest {
    constructor({url, method="GET", successResponseClass={}, errorResponseClass={}, errorString="", queryParams={}, options={}}) {
        this.url = url;
        this.method = method;
        this.successResponseClass = successResponseClass;
        this.errorResponseClass = errorResponseClass;
        this.errorString = errorString;
        this.queryParams = queryParams;
        this.options = options;
    }

    async getRequest() {
        let _requestOptions = this;
        _requestOptions.method = "GET";
        return await _apiRequest(_requestOptions)
    }

    async postRequest() {
        let _requestOptions = this;
        _requestOptions.method = "POST";
        return await _apiRequest(_requestOptions)
    }

    async putRequest() {
        let _requestOptions = this;
        _requestOptions.method = "PUT";
        return await _apiRequest(_requestOptions)
    }

    async deleteRequest() {
        let _requestOptions = this;
        _requestOptions.method = "DELETE";
        return await _apiRequest(_requestOptions)
    }
}

/**
 * A helper class to make API requests.
 * @function
 * @async
 * @param {ApiRequest|Object} options
 * @param {string} options.url - The url to make the request
 * @param {string} options.method - The request method (GET, POST, DELETE, PUT).
 * @param {*} options.successResponseClass - The class to initailize a successful response to.
 * @param {*} options.errorResponseClass - The class to initailize a error response to.
 * @param {string} options.errorString - A string representing the error message.
 * @param {Object} [options.queryParams = {}] - An object containing the query string parameter.
 * @param {Object} [options.options = {}] - An optional request object parameters set to fetch.
 * @returns 
 */
const _apiRequest = (async ({url, method, successResponseClass, errorResponseClass, errorString, queryParams={}, options={}}) => {
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
        throw Error(`${errorString} ${err}`);
    }
})