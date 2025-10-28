import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import {
  BACKEND_URL,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest
} from "../apiRequests.ts";

describe("/utils/apiRequests.ts", () => {
  // Mock axios
  vi.mock("axios");

  // mock constants
  const mockData = [{ id: 0, name: "FakeName", username: "IHaveAFakeName" }];
  const mockResponse = "success";
  const mockURL = "/test/get";
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
  it("postRequest returns data and uses appropriate URL when axios.post resolves", async () => {
    (axios.post as any).mockResolvedValue({ data: mockResponse });

    const result = await postRequest(mockURL, mockData);

    expect(result.data).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledTimes(1);
    // the actual URL request needs to contain the backend URL with the endpoint appended
    expect(axios.post).toHaveBeenCalledWith(`${BACKEND_URL}${mockURL}`,mockData);
  });

  it("postRequest throws an error when axios.post rejects", async () => {
    (axios.post as any).mockRejectedValue(mockError);

    await expect(postRequest(mockURL, mockData)).rejects.toThrow(mockError);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
  //----------------------End of Test postRequest----------------------//

  //----------------------Test putRequest----------------------//
  it("putRequest returns data and uses appropriate URL when axios.put resolves", async () => {
    (axios.put as any).mockResolvedValue({ data: mockResponse });

    const result = await putRequest(mockURL, mockData);

    expect(result.data).toEqual(mockResponse);
    expect(axios.put).toHaveBeenCalledTimes(1);
    // the actual URL request needs to contain the backend URL with the endpoint appended
    expect(axios.put).toHaveBeenCalledWith(`${BACKEND_URL}${mockURL}`, mockData);
  });


  it("postRequest throws an error when axios.put rejects", async () => {
    (axios.put as any).mockRejectedValue(mockError);

    await expect(putRequest(mockURL, mockData)).rejects.toThrow(mockError);
    expect(axios.put).toHaveBeenCalledTimes(1);
  });
  //----------------------End of Test putRequest----------------------//

  //----------------------Test deleteRequest----------------------// 
    it('deleteRequest returns data and uses appropriate URL when axios.delete resolves', async () => {
        (axios.delete as any).mockResolvedValue({ data: mockResponse });

        const response = await deleteRequest(mockURL);

        expect(response.data).toEqual(mockResponse);
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(axios.delete).toHaveBeenCalledWith(`${BACKEND_URL}${mockURL}`);
    });

    it('deleteRequest throws an error when axios.delete rejects', async () => {
        (axios.delete as any).mockRejectedValue(mockError);

        await expect(deleteRequest(mockURL)).rejects.toThrow(mockError);
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(axios.delete).toHaveBeenCalledWith(`${BACKEND_URL}${mockURL}`);
    });
    //----------------------End of Test deleteRequest----------------------// 

  //----------------------Test patchRequest----------------------//
  it('patchRequest returns data and uses appropriate URL when axios.patch resolves', async () => {
    (axios.patch as any).mockResolvedValue({ data: mockResponse });

    const result = await patchRequest(mockURL, mockData);

    expect(result.data).toEqual(mockResponse);
    expect(axios.patch).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith(`${BACKEND_URL}${mockURL}`, mockData);
  });

  it('patchRequest throws an error when axios.patch rejects', async () => {
    (axios.patch as any).mockRejectedValue(mockError);

    await expect(patchRequest(mockURL, mockData)).rejects.toThrow(mockError);
    expect(axios.patch).toHaveBeenCalledTimes(1);
  });
  //----------------------End of Test patchRequest----------------------//
});
