/*
 * Filename: locations.js
 * Project: OpenPlains
 * File Created: Friday August 19th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Fri Aug 19 2022
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
import { 
    ProcessResponseModel,
    LocationsListResponseModel, 
    SimpleResponseModel
} from "../Models"


const API_HOST = SETTINGS.API_HOST;

const Locations = {
    getLocations: (async (options={}) => {
        /**
         * This response returns a list of location names
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
            let status = await res.status()
            let data = await res.json()
            if (status === 200) return new LocationsListResponseModel({...data.response});
            if (status === 400) return new SimpleResponseModel({...data.response});                  
        } catch (err) {
            console.log(`${RESPONSESTRINGS.error_repsonse.location.getLocations[SETTINGS.LANGUAGE]} ${err}`);
        }
    }),
    getLocation: async (locationName) => {
        /**
        * Route: /locations/{location_name}/info
        */
          try {
            const url = new URL(`${API_HOST}/g/locations/${locationName}/info`)
            let res = await fetch(url, { 
                headers: {
                'Content-Type': 'application/json'
                }
            });
            let data = await res.json();
            
            console.log("getLocation: response:", data)
            return new ProcessResponseModel({...data.response})                        
        } catch (e) {
            console.error("getLocation: error", e);
        }
    },
    createLocation: (async (locationName, epsg) => {
        /**
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
                }
            });
            let data = await res.json();
            let results = await data.process_results
            console.log("createLocation: response:", data)
            return results                         
        } catch (e) {
            console.error("getLocation: error", e);
        }
    }),
    deleteLocation: (async (locationName) => {
        /**
        * Route: /locations/{location_name}/
        */
          try {
            // let queryParams = {un: params.unId}
            const url = new URL(`${API_HOST}/g/locations/${locationName}`)
            let res = await fetch(url, { 
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                }
            });
            let data = await res.json();
            let results = await data.process_results
            console.log("createLocation: response:", data)
            return results                         
        } catch (e) {
            console.error("getLocation: error", e);
        }
    })
}

export default Locations