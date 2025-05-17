import { create } from "apisauce";

const apiClient=create({
    baseURL:'https://reserverite-backend.vercel.app/api'
})

export default apiClient;