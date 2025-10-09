
import { getRequest, postRequest } from '../utils/RequestUtils.tsx';

export default function TestPage() {

    async function testGet() {
        try {
            const response = await getRequest('/mock/posts')
            console.log(response);
        } catch (error) {
            console.log("Error response:");
            console.log(error);
        }
    };

    async function testPost() {
        try {
            const payload = {
                "age": 0,
                "avatar": "string",
                "email": "testemail-differen1t@gmail.com",
                "height": 0,
                "heightMetric": "string",
                "name": "another-name",
                "password": "string",
                "username": "different-here-1",
                "weight": 0,
                "weightMetric": "string"
                }
            const response = await postRequest('/users', payload);
            console.log("Success response: ");
            console.log(response);
        } catch (error) {
            console.log("Error response:");
            console.log(error);
        }
    };

    function testPut() {

    };

    function testDelete() {

    };

    return (
        <>
            <button onClick={testGet} >Test Get</button>
            <button onClick={testPost} >Test Post</button>
            <button onClick={testPut} >Test Put</button>
            <button onClick={testDelete} >Test Delete</button>
        </>
    );
};