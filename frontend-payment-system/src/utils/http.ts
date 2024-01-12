import axios from "axios"

export const baseUrl: string = "https://mwgi47obf2.execute-api.us-west-2.amazonaws.com/"

export async function httpClient(endpoint: string, method: string, data: any){
    const token = localStorage.getItem("paymentsToken")

    const res = await axios({
        url: `${baseUrl}/${endpoint}`,
        method: method,
        data: JSON.stringify(data),
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return res
}