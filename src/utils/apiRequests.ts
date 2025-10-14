/**
 * Utility class for making HTTP requests
 */

import axios from "axios";

// temporary constant: URL for the backend
// will eventually grab the URL from the environment variable
export const BACKEND_URL = "http://localhost:8080";

// ensure all axios request has credentials
axios.defaults.withCredentials = true;

// get request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
export async function getRequest(endpoint: string) {
  const response = await axios.get(`${BACKEND_URL}${endpoint}`);
  return response.data; // return the data
}

// post request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
// payload - this is the payload to send to the backend
// id?:string is an optional parameter - this is when the request requires an ID in the endpoint
export async function postRequest(endpoint: string, payload: any, id?: string) {
  let url = `${BACKEND_URL}${endpoint}`;

  if (id) {
    // if an id was passed
    url += `/${id}`;
  }

  const response = await axios.post(url, payload); // payload here is optional
  return response; // return the data
}

// put request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
// payload - this is the payload to send to the backend
// id?:string is an optional parameter - this is when the request requires an ID in the endpoint
export async function putRequest(endpoint: string, payload: any, id?: string) {
  let url = `${BACKEND_URL}${endpoint}`;

  if (id) {
    // if an id was passed
    url += `/${id}`;
  }

  const response = await axios.put(url, payload); // payload here is optional
  return response.data; // return the data
}
