import {CHECK_IF_SUBSCIRBED,SUBSCRIBE_NEWSLETTER} from "../constants/newsLetterConstants"
import api from "./apiAction"
export const checkForSubscription = () => async (dispatch) => {
    try{
        const {data} =  await api.get("/api/v1/subscriptionStatus")
        dispatch({type:CHECK_IF_SUBSCIRBED,payload:data.success})
    }catch(err){
        // console.log(err)
    }
}
export const ApplyForSubscription = () => async (dispatch) => {
    try{
        dispatch({type:SUBSCRIBE_NEWSLETTER})
        await api.post("/api/v1/subscriptionStatus")
        const {data} =  await api.get("/api/v1/subscriptionStatus")
        dispatch({type:CHECK_IF_SUBSCIRBED,payload:data.success})
    }catch(err){
        // console.log(err)
    }
}
export const unsubscription = () => async (dispatch) => {
    try{
        dispatch({type:SUBSCRIBE_NEWSLETTER})
        await api.delete("/api/v1/subscriptionStatus")
        const {data} =  await api.get("/api/v1/subscriptionStatus")
        dispatch({type:CHECK_IF_SUBSCIRBED,payload:data.success})
    }catch(err){
        // console.log(err)
    }
}