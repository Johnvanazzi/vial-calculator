import axios from "axios";

export const authApi = axios.create({
    baseURL: "https://vlq62zlbxb.execute-api.sa-east-1.amazonaws.com/prod",
    headers: {
        "Content-type": "application/json",
        "x-api-key": "zwCNrBSKdr6BCZRwnY4G9269xM6wq15N8YlvfqWR",
    },
});

export default authApi;
