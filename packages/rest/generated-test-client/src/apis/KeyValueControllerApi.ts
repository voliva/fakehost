/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ValueWrapper,
} from '../models';
import {
    ValueWrapperFromJSON,
    ValueWrapperToJSON,
} from '../models';

export interface CreateValueRequest {
    key: string;
    valueWrapper: ValueWrapper;
}

export interface DeleteValueRequest {
    key: string;
}

export interface GetValueRequest {
    key: string;
}

export interface UpdateValueRequest {
    key: string;
    valueWrapper: ValueWrapper;
}

/**
 * 
 */
export class KeyValueControllerApi extends runtime.BaseAPI {

    /**
     */
    async createValueRaw(requestParameters: CreateValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.key === null || requestParameters.key === undefined) {
            throw new runtime.RequiredError('key','Required parameter requestParameters.key was null or undefined when calling createValue.');
        }

        if (requestParameters.valueWrapper === null || requestParameters.valueWrapper === undefined) {
            throw new runtime.RequiredError('valueWrapper','Required parameter requestParameters.valueWrapper was null or undefined when calling createValue.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/store/{key}`.replace(`{${"key"}}`, encodeURIComponent(String(requestParameters.key))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ValueWrapperToJSON(requestParameters.valueWrapper),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async createValue(requestParameters: CreateValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.createValueRaw(requestParameters, initOverrides);
    }

    /**
     */
    async deleteValueRaw(requestParameters: DeleteValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.key === null || requestParameters.key === undefined) {
            throw new runtime.RequiredError('key','Required parameter requestParameters.key was null or undefined when calling deleteValue.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/store/{key}`.replace(`{${"key"}}`, encodeURIComponent(String(requestParameters.key))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteValue(requestParameters: DeleteValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteValueRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getAllRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: string; }>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/store/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async getAll(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: string; }> {
        const response = await this.getAllRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getValueRaw(requestParameters: GetValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.key === null || requestParameters.key === undefined) {
            throw new runtime.RequiredError('key','Required parameter requestParameters.key was null or undefined when calling getValue.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/store/{key}`.replace(`{${"key"}}`, encodeURIComponent(String(requestParameters.key))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async getValue(requestParameters: GetValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getValueRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateValueRaw(requestParameters: UpdateValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.key === null || requestParameters.key === undefined) {
            throw new runtime.RequiredError('key','Required parameter requestParameters.key was null or undefined when calling updateValue.');
        }

        if (requestParameters.valueWrapper === null || requestParameters.valueWrapper === undefined) {
            throw new runtime.RequiredError('valueWrapper','Required parameter requestParameters.valueWrapper was null or undefined when calling updateValue.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/store/{key}`.replace(`{${"key"}}`, encodeURIComponent(String(requestParameters.key))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ValueWrapperToJSON(requestParameters.valueWrapper),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async updateValue(requestParameters: UpdateValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updateValueRaw(requestParameters, initOverrides);
    }

}