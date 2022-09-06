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
        url: "http://localhost:3001/image",
        // url: "https://design-editor-app-z22dtvdr6q-uc.a.run.app/image",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Headers': 'Access-Control-Request-Headers'
        },
        data: _data,
    }

    await axios(config)
    .then(function (response) {
            console.log("oi")
            console.log(JSON.stringify(response.data));
            return response.data
        })
        .catch(function (error) {
            console.log(error)
        })
}

export default ApiService
