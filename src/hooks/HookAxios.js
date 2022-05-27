import { useContext } from "react";
import axios from "axios";
import AuthCon from "../context/Auth";
import { baseUrl } from "../api/Api";

export default function HookAxios() {
    const [authState] = useContext(AuthCon);

    const apiUser = axios.create({ baseURL: baseUrl, });

    apiUser.interceptors.request.use((configure) => {
        const token = authState.token;
        configure.headers.Authorization = token ? `Bearer ${token}`: "";
        return configure;
    });

    return apiUser;
}