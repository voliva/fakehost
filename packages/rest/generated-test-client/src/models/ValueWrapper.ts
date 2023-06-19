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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ValueWrapper
 */
export interface ValueWrapper {
    /**
     * 
     * @type {string}
     * @memberof ValueWrapper
     */
    value?: string;
}

/**
 * Check if a given object implements the ValueWrapper interface.
 */
export function instanceOfValueWrapper(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ValueWrapperFromJSON(json: any): ValueWrapper {
    return ValueWrapperFromJSONTyped(json, false);
}

export function ValueWrapperFromJSONTyped(json: any, ignoreDiscriminator: boolean): ValueWrapper {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function ValueWrapperToJSON(value?: ValueWrapper | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
    };
}
