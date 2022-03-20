import {
    useEffect,
    useState
} from "react";
import axios from 'axios';

/**
 * 
 * @param {string} apiUrl - The Api url
 * @param {string} method - The HTTP request method (default value = "get")
 * @param {object} postData - The data required make the post request to the server
 * @returns {object} 
 * It returns {isLoading : loading state, data : data from server, serverError : Error from server, setData : changing the state of data }
 */
export const useAxios = (apiUrl, method = "get", postData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverResponse, setServerResponse] = useState({});
    const [serverError, setServerError] = useState(null);
    const getData = async () => {
        try {
            setIsLoading(true);
            let res;
            switch (method){
                case "get":
                    res = await axios.get(apiUrl);
                    break;
                case "post":
                    console.log("called")
                    res = await axios.post(apiUrl, postData)
                    console.log(res)
                    break;
                default:
                    break;
            }
            setServerResponse(res);
        } catch (err) {
            setServerError(err);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getData()
    }, [apiUrl,postData]);
    return {
        isLoading,
        serverResponse,
        serverError,
        setServerResponse
    };
}