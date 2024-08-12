import { useEffect, useState , useCallback } from "react";

async function sendHttpRequest(url,config){
        const response = await fetch(url,config) ;
        const data = response.json();
        if(!response.ok) {
            throw new Error("Waiting for Connection ...")
        }
        return data ;
    
}

export default function useHttp(url,config,initialValue){
    const [error,setError] = useState() ;
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState(initialValue);

    function setDatafunc(){
        setData(initialValue)
    }

   const sendRequest = useCallback(async function sendRequest(data){
        setIsLoading(true)
        try{
            const sendFunction = await sendHttpRequest(url,{...config , body:data});
            setData(sendFunction);
        }
        catch(error){
            setError(error.message || "Failed to get Data ...")
        }
        setIsLoading(false);
    },[url,config])

    useEffect(()=>{
        if(config && (config.method ==='GET' || !config.method) || !config)
        sendRequest();
    },[sendRequest,config])


    return {
        error,
        isLoading,
        data,
        sendRequest,
        setDatafunc
    }
}

