import { IFrame, ILayer } from "@layerhub-io/types"
import axios from "axios"

async function ApiService(_data: {
    id: string
    type: string
    name: string | undefined
    frame: IFrame
    content: Partial<ILayer>[][]
}) {
    const config = {
        method: "POST",
        url: "http://localhost:3001/upload",
        // url: "http://18.228.2.161:3001/upload",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Headers': 'Access-Control-Request-Headers'
        },
        data: _data,
    }

    let result;

    await axios(config)
    .then(function (response) {
            console.log("oi")
            result = response.data;
        })
        .catch(function (error) {
            console.log(error)
        })

    return result;
}

export default ApiService
