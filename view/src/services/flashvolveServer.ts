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
        method: "post",
        url: "http://localhost:3001/image",
        // url: "https://design-editor-app-z22dtvdr6q-uc.a.run.app/image",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify(_data),
    }

    axios(config)
        .then(function (response) {
            const data = JSON.stringify(response.data)
            return data
        })
        .catch(function (error) {
            console.log(error)
        })
}

export default ApiService
