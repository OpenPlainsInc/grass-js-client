/*
 * Filename: locations.js
 * Project: OpenPlains
 * File Created: Friday August 19th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sun Sep 04 2022
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

import { SETTINGS } from "../settings.json"
import { RESPONSESTRINGS } from "../strings.json"
import { ProcessResponseModel } from "../Models/ProcessResponseModel";
import { LocationsListResponseModel } from "../Models/LocationsListResponseModel";
import { SimpleResponseModel } from "../Models/SimpleResponseModel";

const API_HOST = SETTINGS.API_HOST;

const Locations = {
    getLocations: (async (options={}) => {
        /**
         * Get a list of all available locations that are located in the GRASS database and the user has access to. Minimum required user role: user.
         * Route: /locations/
         * Returns: LocationListResponseModel
        */
          try {
            const url = new URL(`${API_HOST}/g/locations`)
            let res = await fetch(url, { 
                headers: {
                'Content-Type': 'application/json',
                },
                ...options
            });
            
            let data = await res.json()
            if (res.ok) return new LocationsListResponseModel({...data.response});
            return new SimpleResponseModel({...data.response});                
        } catch (err) {
            console.error(`${RESPONSESTRINGS.errorRepsonse.location.getLocations[SETTINGS.LANGUAGE]} ${err}`);
        }
    }),
    getLocation: (async (locationName, options={}) => {
        /**
         * Get the location projection and current computational region of the PERMANENT mapset. Minimum required user role: user.
         * Route: /locations/{location_name}/info
        */
          try {
            const url = new URL(`${API_HOST}/g/locations/${locationName}/info`)
            let res = await fetch(url, { 
                headers: {
                'Content-Type': 'application/json'
                },
                ...options
            });
            let data = await res.json();
            if (res.ok) return new ProcessResponseModel({...data.response});
            return new SimpleResponseModel({...data.response}); 
                                                
        } catch (err) {
            console.error(`${RESPONSESTRINGS.errorRepsonse.location.getLocation[SETTINGS.LANGUAGE]} ${err}`);
        }
    }),
    createLocation: (async (locationName, epsg, options={}) => {
        /**
         * Create a new location based on EPSG code in the user database. Minimum required user role: user.
         * Route: /locations/{location_name}/
        */
          try {
            // let queryParams = {un: params.unId}
            const url = new URL(`${API_HOST}/g/locations/${locationName}`)
            let res = await fetch(url, { 
                method: "POST",
                body: JSON.stringify({epsg: epsg}),
                headers: {
                'Content-Type': 'application/json'
                },
                ...options
            });
            let data = await res.json();
            if (res.ok) return new ProcessResponseModel({...data.response});
            return new ProcessResponseModel({...data.response});                       
        } catch (err) {
            console.error(`${RESPONSESTRINGS.errorRepsonse.location.createLocation[SETTINGS.LANGUAGE]} ${err}`);
        }
    }),
    deleteLocation: (async (locationName, options={}) => {
        /**
         * Delete an existing location and everything inside from the user database. Minimum required user role: user.
         * Route: /locations/{location_name}/
        */
          try {
            const url = new URL(`${API_HOST}/g/locations/${locationName}`)
            let res = await fetch(url, { 
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                },
                ...options
            });
            let data = await res.json();
            if (res.ok) return new SimpleResponseModel({...data.response});
            return new SimpleResponseModel({...data.response});                       
        } catch (err) {
            console.error(`${RESPONSESTRINGS.errorRepsonse.location.deleteLocation[SETTINGS.LANGUAGE]} ${err}`);
        }
    })
}

export default Locations