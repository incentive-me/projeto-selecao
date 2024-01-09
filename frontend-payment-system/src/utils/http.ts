import axios from "axios"

export async function httpClient(endpoint: string, method: string, data: any){
    const token = localStorage.getItem("paymentsToken")

    const res = await axios({
        url: `http://localhost:3001/${endpoint}`,
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