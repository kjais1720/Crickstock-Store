import {
    useEffect,
    useReducer
} from "react";
import axios from 'axios';

const apiReducer = (state, {type,payload}) => {
    switch(type){
        case "setData":
            return {...state,serverResponse:payload, serverError:{}}
        case "setError":
            return {...state,serverError: payload, serverResponse:{}}
        case "setLoadingTrue":
            return {...state, isLoading:true};
        case "setLoadingFalse":
            return {...state,isLoading:false}
        default:
            return state;
    }
}

/**
 * @param apiUrl : api url string 
 * @returns {isLoading : loading state, data : data from server, serverError : Error from server, setData : changing the state of data }
 */
export const useAxios = (apiUrl, method = "get", postData, authToken) => {
    const [ apiState, apiDispatch ] = useReducer(apiReducer,{
        serverResponse:{},
        serverError:{},
        isLoading:false
    })
    const getData = async () => {
        console.log("axios called")
        try {
            apiDispatch({type:"setLoadingTrue"});
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
            console.log(res)
            apiDispatch({type:"setData",payload:res});
        } catch (err) {
            apiDispatch({type:"setError",payload:err});
        } finally {
            apiDispatch({type:"setLoadingFalse"});
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