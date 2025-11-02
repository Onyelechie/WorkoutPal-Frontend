
import { getRequest, postRequest } from "../../utils/apiRequests";

// TEMPORARY FILE FOR CHECKING NEW USER
// THIS IS TO AVOID CLUTTERING LoginCard
export async function newUser() {
    try {
        const response = await getRequest("/achievements");

        console.log("Server response:", response.data);
        // if achievments already generated for user, he is not a new user
        if (response.data) {
            return false;
        }
        //user is  new
        else {
            return true;
        }
    } catch (error: any) {
        console.error("Request failed:", error.response?.data || error.message);
    }


}