import { IFrame, ILayer } from "@layerhub-io/types"
import axios from "axios"

function ApiService(_data: {
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
            "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify(_data),
    }

    let result;

    axios(config)
        .then(async function (response) {
            console.log(JSON.stringify(response.data));
            result = await response.data
        })
        .catch(function (error) {
            console.log(error)
        })

    return result
}

export default ApiService
