import {
    useEffect,
    useState
} from "react";
import axios from 'axios';

/**
 * 
 * @param apiUrl : api url string 
 * @returns {isLoading : loading state, data : data from server, serverError : Error from server, setData : changing the state of data }
 */
export const UseAxios = (apiUrl) => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverData, setServerData] = useState({});
    const [serverError, setServerError] = useState(null);
    const getData = async () => {
        try {
            setIsLoading(true);
            let {data} = await axios.get(apiUrl);
            setServerData( data);
        } catch (err) {
            setServerError(err);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getData()
    }, [apiUrl]);
    return {
        isLoading,
        serverData,
        serverError,
        setServerData
    };
}