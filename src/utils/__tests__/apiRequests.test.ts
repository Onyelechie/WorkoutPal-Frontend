import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import {
  BACKEND_URL,
  getRequest,
  postRequest,
  putRequest,
} from "../apiRequests.ts";

describe("/utils/apiRequests.ts", () => {
  // Mock axios
  vi.mock("axios");

  // mock constants
  const mockData = [{ id: 0, name: "FakeName", username: "IHaveAFakeName" }];
  const mockResponse = "success";
  const mockURL = "/test/get";
  const mockID = "123";
  const mockError = new Error("Network Error");

  beforeEach(() => {
    vi.resetAllMocks();
  });

  //----------------------Test getRequest----------------------//
  it("getRequest returns data and uses appropriate URL when axios.get resolves", async () => {
    (axios.get as any).mockResolvedValue({ data: mockData });

    const response = await getRequest(mockURL); // URL here does not matter

    expect(response.data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    // the actual URL request needs to contain the backend URL with the endpoint appended
    expect(axios.get).toHaveBeenCalledWith(`${BACKEND_URL}${mockURL}`);
  });

  it("getRequest throws an error when axios.get rejects", async () => {
    (axios.get as any).mockRejectedValue(mockError);

    await expect(getRequest(mockURL)).rejects.toThrow(mockError);

    expect(axios.get).toHaveBeenCalledTimes(1);
    // the actual URL request needs to contain the backend URL with the endpoint appended
    expect(axios.get).toHaveBeenCalledWith(`${BACKEND_URL}${mockURL}`);
  });
  //----------------------End of Test getRequest----------------------//

  //----------------------Test postRequest----------------------//
  it("postRequest with no ID returns success when axios.post resolves", async () => {
    (axios.post as any).mockResolvedValue({ data: mockResponse });

    const result = await postRequest(mockURL, mockData);

    expect(result).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledTimes(1);
    // the actual URL request needs to contain the backend URL with the endpoint appended
    expect(axios.post).toHaveBeenCalledWith(
      `${BACKEND_URL}${mockURL}`,
      mockData
    );
  });

  it("postRequest with ID returns success when axios.post resolves", async () => {
    (axios.post as any).mockResolvedValue({ data: mockResponse });

    const result = await postRequest(mockURL, mockData, mockID);

    expect(result).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledTimes(1);
    // the actual URL request needs to contain the backend URL with the endpoint and ID appended
    expect(axios.post).toHaveBeenCalledWith(
      `${BACKEND_URL}${mockURL}/${mockID}`,
      mockData
    );
  });

  it("postRequest throws an error when axios.post rejects", async () => {
    (axios.post as any).mockRejectedValue(mockError);

    await expect(postRequest(mockURL, mockData)).rejects.toThrow(mockError);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
  //----------------------End of Test postRequest----------------------//

  //----------------------Test putRequest----------------------//
  it("putRequest with no ID returns success when axios.put resolves", async () => {
    (axios.put as any).mockResolvedValue({ data: mockResponse });

    const result = await putRequest(mockURL, mockData);

    expect(result).toEqual(mockResponse);
    expect(axios.put).toHaveBeenCalledTimes(1);
    // the actual URL request needs to contain the backend URL with the endpoint appended
    expect(axios.put).toHaveBeenCalledWith(
      `${BACKEND_URL}${mockURL}`,
      mockData
    );
  });

  it("putRequest with ID returns success when axios.put resolves", async () => {
    (axios.put as any).mockResolvedValue({ data: mockResponse });

    const result = await putRequest(mockURL, mockData, mockID);

    expect(result).toEqual(mockResponse);
    expect(axios.put).toHaveBeenCalledTimes(1);
    // the actual URL request needs to contain the backend URL with the endpoint and ID appended
    expect(axios.put).toHaveBeenCalledWith(
      `${BACKEND_URL}${mockURL}/${mockID}`,
      mockData
    );
  });

  it("postRequest throws an error when axios.put rejects", async () => {
    (axios.put as any).mockRejectedValue(mockError);

    await expect(putRequest(mockURL, mockData)).rejects.toThrow(mockError);
    expect(axios.put).toHaveBeenCalledTimes(1);
  });
  //----------------------End of Test putRequest----------------------//
});
