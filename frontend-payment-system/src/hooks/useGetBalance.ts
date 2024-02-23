import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEffect } from "react"
import { httpClient } from "../utils/http"
import { fetchBalances } from "../redux/balance.slice"

export function useGetBalance(){
    const dispatch = useDispatch()
    const balance = useSelector((state:RootState) => state?.balance)

    useEffect(()=> {
        if(balance.balance.length === 0){
            httpClient("balance", "get", {})
            .then((res) => dispatch(fetchBalances(res.data)))
        }
    },[])

    return balance.balance
}