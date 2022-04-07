import {
    useEffect,
    useState
} from "react";
import axios from 'axios';
import { localStorageConstants } from "./constants";
const { USER_TOKEN } = localStorageConstants;

/**
 * @param apiUrl : api url string 
 * @returns {isLoading : loading state, data : data from server, serverError : Error from server, setData : changing the state of data }
 * .Since it is dependent on the apiUrl and postData, anytime these state change, a new api call will be made to the server with the new url and postData
 */
export const useAxios = (apiUrl, method = "get", postData) => {
    const [ apiState, setApiState ] = useState({
        serverResponse:{},
        serverError:{},
        isLoading:false
    })
    const getData = async () => {
        const authToken = localStorage.getItem(USER_TOKEN);
        try {
            setApiState(prev=> ({...prev,isLoading:false}))
            let res;
            switch (method){
                case "get":
                    res = await axios.get(apiUrl,{
                        headers : 
                        {
                            authorization: authToken
                        }
                    })
                    break;
                case "post":
                    res = await axios.post(apiUrl, postData,{
                        headers:{
                            authorization:authToken
                        }
                    })
                    break;
                case "delete":
                    res = await axios.delete(apiUrl,{
                        headers:{
                            authorization:authToken
                        }
                    });
                default:
                    break;
            }
            setApiState(prev=> ({...prev,serverResponse:res}));
        } catch (err) {
            setApiState(prev=> ({...prev,serverError:err}))
        } finally {
            setApiState(prev=>({...prev,isLoading:false}));
        }
    }
    useEffect(() => {
        if(apiUrl){
            getData()
        }
    }, [apiUrl,postData]);
    return {
        isLoading:apiState.isLoading,
        serverResponse:apiState.serverResponse,
        serverError:apiState.serverError
    };
}