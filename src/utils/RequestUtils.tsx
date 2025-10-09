/**
 * Utility class for making HTTP requests
 */

import axios from 'axios';

// temporary constant: URL for the backend
// will eventually grab the URL from the environment variable
const BACKEND_URL = 'http://localhost:8080';

// ensure all axios request has credentials
axios.defaults.withCredentials = true

// get request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
export const getRequest = (async (endpoint:string) => {
    const response = await axios.get(`${BACKEND_URL}${endpoint}`);
    return response.data;
});

// post request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
// id?:string is an optional parameter - this is when the request requires an ID in the endpoint
// payload?:any is an optional parameter - this is the payload to send
// if payload is required with no id, the caller must set id to undefined. e.g. postRequest('/sample/user', undefined, {payload: 'data'})
export const postRequest = (async (endpoint:string, id?:string, payload?:any) => {
    let url = `${BACKEND_URL}${endpoint}`;

    if (id) { // if an id was passed
        url += `/${id}`;
    }

    const response = await axios.post(url, payload); // payload here is optional
    return response.data;
});

// put request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
// id?:string is an optional parameter - this is when the request requires an ID in the endpoint
// payload?:any is an optional parameter - this is the payload to send
// if payload is required with no id, the caller must set id to undefined. e.g. postRequest('/sample/user', undefined, {payload: 'data'})
export const putRequest = (async (endpoint:string, id?:string, payload?:any) => {
    let url = `${BACKEND_URL}${endpoint}`;

    if (id) { // if an id was passed
        url += `/${id}`;
    }

    const response = await axios.put(url, payload); // payload here is optional
    return response.data;
});
