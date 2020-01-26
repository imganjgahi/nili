 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from 'axios'
import { LoginType } from "./model"
const authUrl = urlGeneral + urlVersion + "/users/login"

export const AuthApi = {
    login : async (data: LoginType) => {
        return axios.post(authUrl, data)
    }
}