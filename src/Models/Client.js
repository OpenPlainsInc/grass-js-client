/*
 * Filename: Client.js
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

import { SETTINGS } from "../settings";

/**
 * @class
 * Class that defines the OpenPlains or Actinia API Client.
 * @param {string} [host="http://localhost:8005/savana"] - The API host e.x. http://localhost:8005/savana
 * @param {string} [apiSource="OpenPlains"] - The source API type [Actinia or OpenPlains]
 * @param {string} [apiVersion="4.2.1"] - The OpenPlains or Actinia API version
 * @param {string} [language="en"] - The language used for error responses
 * @param {string} [token=undefined] - A user access token.
 * @param {Object} [userAuth=undefined] - An object holding basic user authentication 
 * @param {Object.<string>} [userAuth.username] - The basic auth username.
 * @param {Object.<string>} [userAuth.password] - The basic auth password.
 */
export class Client {

    token=undefined;
    userAuth=undefined;

    constructor({host = SETTINGS.API_HOST, apiSource = SETTINGS.API_SOURCE, apiVersion = SETTINGS.ACTINIA_VERSION, language = SETTINGS.LANGUAGE}) {
        this.host=host;
        this.apiSource=apiSource;
        this.apiVersion=apiVersion;
        this.language=language;
    }

    /**
     * @static
     * Creates a singleton class instance of the client which is exported throught the module.
     * @returns {Client}
     */
    static getInstance({host, apiSource, apiVersion, language}) {
        if (!this.instance) {
            this.instance = new Client({host, apiSource, apiVersion, language})
        }
        return this.instance;
    }

    /**
     * Sets the basic user request authorization.
     * @method
     * @param {Object} userAuth - An object holding basic user authentication 
     * @param {Object.<string>} [userAuth.username] - The basic auth username.
     * @param {Object.<string>} [userAuth.password] - The basic auth password.
     * @returns Client instance with updated userAuth.
     */
    setBasicAuth({username, password}) {
        this.userAuth = {
            username,
            password
        }
        return this
    }

    /**
     * Sets the users request authentication token.
     * @method
     * @param {string} token - User authentication token.
     * @returns Client instance with updated token.
     */
    setToken(token) {
        this.token = token;
        return this;
    }

    /**
     * Sets the api host.
     * @method
     * @param {string} apiHost - The host url of the api.
     * @returns Client instance with updated host.
     */
    setHost(apiHost) {
        this.host = apiHost;
        return this;
    }
}

// Create singleton instance of the Client class
const opClient = Client.getInstance({
    host: SETTINGS.API_HOST,
    apiSource: SETTINGS.API_SOURCE,
    apiVersion: SETTINGS.ACTINIA_VERSION, 
    language: SETTINGS.LANGUAGE
})

export default opClient;