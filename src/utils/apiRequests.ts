/**
 * Utility class for making HTTP requests
 */

import axios from "axios";

// temporary constant: URL for the backend
// will eventually grab the URL from the environment variable
export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

// ensure all axios request has credentials
axios.defaults.withCredentials = true;

// get request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
export async function getRequest(endpoint: string) {
  const response = await axios.get(`${BACKEND_URL}${endpoint}`);
  return response; // return the response
}

// post request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
// payload - this is the payload to send to the backend
export async function postRequest(endpoint: string, payload: any) {
  let url = `${BACKEND_URL}${endpoint}`;

  const response = await axios.post(url, payload);
  return response; // return the response
}

// put request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
// payload - this is the payload to send to the backend
export async function putRequest(endpoint: string, payload: any) {
  let url = `${BACKEND_URL}${endpoint}`;

    const response = await axios.put(url, payload);
    return response; // return the response
};

// patch request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
// payload - this is the payload to send to the backend
export async function patchRequest(endpoint: string, payload: any) {
  let url = `${BACKEND_URL}${endpoint}`;

  const response = await axios.patch(url, payload);
  return response; // return the response
};

// delete request
// note: caller of this util function needs to try {} catch (error) {} for when the request fails
export async function deleteRequest(endpoint: string) {
    const response = await axios.delete(`${BACKEND_URL}${endpoint}`);
    return response; // return the response
};
