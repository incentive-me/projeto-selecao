import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { httpClient } from "../utils/http";
import { Payment, fetchPayments } from "../redux/payment.slice";

export function useGetPayments(){
    const dispatch = useDispatch()
    const data = useSelector((state: RootState) => state.payment)

    useEffect(() => {
        if(data.payment.length === 0){
            httpClient("payment", "get", {})
                .then((res) => {
                    dispatch(fetchPayments(res.data))
                })
        }
    },[])

    return data.payment
}