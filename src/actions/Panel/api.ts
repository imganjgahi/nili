 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from '../../AxiosConfig';
const PanelUrl = urlGeneral + urlVersion 

export const PanelApi = {
    getPanelData : async () => {
        return axios.get(PanelUrl+ "/users/panel")
    },
    createNoteBook : async (data: any) => {
        return axios.post(PanelUrl+ "/notebooks", data)
    }
}