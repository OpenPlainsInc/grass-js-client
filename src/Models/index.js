/*
 * Filename: index.js
 * Project: OpenPlains
 * File Created: Wednesday May 25th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Mon Sep 12 2022
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

import opClient from "./Client";
import { GrassModule } from "./GrassModule";
import { ProcessLog } from "./ProcessLog";
import { ExportParam } from "./ExportParam";
import { OutputParameter } from "./OutputParameter";
import { ProcessResponseModel } from "./ProcessResponseModel";
import { STACMetadata } from "./STACMetadata";
import { StdoutParser } from "./StdoutParser";
import { ImportDescription } from "./ImportDescription";
import { ProgressInfoModel } from "./ProgressInfoModel";
import { ExceptionTracebackModel } from "./ExceptionTracebackModel";
import { UrlModel } from "./UrlModel";
import { ApiInfoModel } from "./ApiInfoModel";
import { LocationsListResponseModel } from "./LocationsListResponseModel";
import { SimpleResponseModel } from "./SimpleResponseModel"
import { MapsetInfoModel } from "./MapsetInfoModel";
import { RegionModel } from "./RegionModel";
import { MapsetInfoResponseModel } from "./MapsetInfoResponseModel";
import { ProjectionInfoModel } from "./ProjectionInfoModel";
import { ModuleListResponse } from "./ModuleListResponse";
import { ModuleParameterResponse } from "./ModuleParameterResponse";
import { ModuleParameterSchemaResponse } from "./ModuleParameterSchemaResponse";
import { ModuleResponse } from "./ModuleResponse";
import { SimpleStatusCodeResponseModel } from "./SimpleStatusCodeResponseModel";
import { ImagePNGResponse } from "./ImagePNGResponse";
import { RasterInfoModel } from "./RasterInfoModel";
import { RasterInfoResponseModel } from "./RasterInfoResponseModel";

const Models = {
    opClient,
    GrassModule,
    ProcessLog,
    ExportParam,
    OutputParameter,
    ProcessResponseModel,
    STACMetadata,
    StdoutParser,
    ImportDescription,
    ProgressInfoModel,
    ExceptionTracebackModel,
    UrlModel,
    ApiInfoModel,
    LocationsListResponseModel,
    SimpleResponseModel,
    MapsetInfoModel,
    RegionModel,
    MapsetInfoResponseModel,
    ProjectionInfoModel,
    ModuleListResponse,
    ModuleParameterResponse,
    ModuleParameterSchemaResponse,
    ModuleResponse,
    SimpleStatusCodeResponseModel,
    ImagePNGResponse,
    RasterInfoModel,
    RasterInfoResponseModel
}

export default Models

export { Models }