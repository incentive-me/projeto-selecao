import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { httpClient } from "../utils/http";
import { fetchPayments } from "../redux/payment.slice";

export function useGetPayments(){
    const dispatch = useDispatch()
    const data = useSelector((state: RootState) => state.payment)

    useEffect(() => {
        httpClient("payment", "get", {})
            .then((res) => dispatch(fetchPayments(res.data)))
    },[])

    return data
}