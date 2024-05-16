import {CHECK_IF_SUBSCIRBED,SUBSCRIBE_NEWSLETTER} from "../constants/newsLetterConstants"
import axios from "axios";
export const checkForSubscription = () => async (dispatch) => {
    try{
        const {data} =  await axios.get("/api/v1/subscriptionStatus")
        dispatch({type:CHECK_IF_SUBSCIRBED,payload:data.success})
    }catch(err){
        console.log(err)
    }
}
export const ApplyForSubscription = () => async (dispatch) => {
    try{
        dispatch({type:SUBSCRIBE_NEWSLETTER})
        await axios.post("/api/v1/subscriptionStatus")
        const {data} =  await axios.get("/api/v1/subscriptionStatus")
        dispatch({type:CHECK_IF_SUBSCIRBED,payload:data.success})
    }catch(err){
        console.log(err)
    }
}
export const unsubscription = () => async (dispatch) => {
    try{
        dispatch({type:SUBSCRIBE_NEWSLETTER})
        await axios.delete("/api/v1/subscriptionStatus")
        const {data} =  await axios.get("/api/v1/subscriptionStatus")
        dispatch({type:CHECK_IF_SUBSCIRBED,payload:data.success})
    }catch(err){
        console.log(err)
    }
}