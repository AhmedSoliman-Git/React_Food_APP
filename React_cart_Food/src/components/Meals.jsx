// import {useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";

const configObject = {} //by using this this object reserves a place in memory never changes and it's a trick
export default function Meals(){
    // const [dataState,setData]= useState([]);

    // useEffect(()=>{
    // async function fetchData(){
    //     const fetched = await fetch('http://localhost:3000/meals') ;
    //     const dataFetched = await fetched.json();
    //     setData(dataFetched);
    // } 
    // fetchData();

    // },[])
    const {
        error ,
        isLoading ,
        data:dataState} = useHttp('http://localhost:3000/meals',configObject,[]); 
        //here we can say that this {} is recreated every time and make infinite loop so
        //it's made after the every request finishs
        // we will make it before component so it will have the same place in memory
    

    if(isLoading) {
        return <p style={{
        textAlign:"center",
        fontSize:"2rem"
        }}>Data Is Fetching ....</p>
    }

    if(error) {
        return <Error title="Failed To Fetch meals" message= {error.message} />
    }

    return <ul id="meals">
        {dataState.map((ItemData)=>{
            return <MealItem meal={ItemData} key={ItemData.id}/>
        })}

        
    </ul>
}