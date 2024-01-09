import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { httpClient } from "../utils/http"
import { Balance, fetchBalances } from "../redux/balance.slice"

export function useGetBalance(){
    const dispatch = useDispatch()
    const [ balance, setBalance ] = useState()

    useEffect(() => {
        if(!balance){
            httpClient("balance", "get", {})
                .then((res) => {
                    setBalance(res.data)
                    return dispatch(fetchBalances(res.data))})
        }
    },[])

    return balance
}