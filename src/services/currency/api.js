import axios from "axios"
import Currency from "./index.js"
import jsonDB from "../../../jsonDB.js"

export const currency = async (url, params) => {
    try {
        return (await axios.get(url, { params })).data.response
    } catch (error) {
        console.log(error);
    }
}

