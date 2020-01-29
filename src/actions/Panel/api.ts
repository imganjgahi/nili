 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from '../../AxiosConfig';
const PanelUrl = urlGeneral + urlVersion 

export const PanelApi = {
    getPanelData : async () => {
        return axios.get(PanelUrl+ "/users/panel")
    },

    // NOTEBOOK API
    createNoteBook : async (data: any) => {
        return axios.post(PanelUrl+ "/notebooks", data)
    },
    deleteNoteBook : async (notebookId: number) => {
        return axios.delete(PanelUrl+ "/notebooks/"+notebookId)
    },

    //TASK API
    createTask : async (data: any) => {
        return axios.post(PanelUrl+ "/Tasks", data)
    },
    deleteTask : async (taskId: number) => {
        return axios.delete(PanelUrl+ "/Tasks/"+taskId)
    }
}