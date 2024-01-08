import axios from 'axios';
import { Storage } from '../service/LocalStorage';

export default function useAxios() {
    const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE3OTA3MDg0ODAsInVzZXJJZCI6ImIyNzlhMzNmLTE2NjEtNGZjZS1iYmJjLTg2OTlhNTllYjAzNiIsImlhdCI6MTY4MDcwNzA0NiwiZW1haWwiOiJ0ZXN0NEBnbWFpbC5jb20ifQ.-TTvV0macYshJ2X_KsXer-ZhXdBJtmZT4zfHL-fjzgk";
    const id = Storage.Get("key");
    const instance = axios.create({
        headers: {
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "x-id": id
        },
        withCredentials: true,
    })
    return { axios: instance }
}