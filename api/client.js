import { create } from "apisauce";

const apiClient=create({
    baseURL:'http://192.168.1.6:3000'
})

export default apiClient;