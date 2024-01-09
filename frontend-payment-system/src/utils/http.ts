import axios from "axios"

export async function httpClient(endpoint: string, method: string, data: any){
    const token = localStorage.getItem("paymentsToken")

    const res = await axios({
        url: `http://localhost:3001/${endpoint}`,
        method: method,
        data: data,
        headers: {
            Authorization: token ? token : null
        }
    })

    return res
}