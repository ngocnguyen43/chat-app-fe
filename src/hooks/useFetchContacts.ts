import axios from "axios";
import { useAppSelector } from "./useAppSelector"
import { useQuery } from "react-query";

export const useFetchContacts = () => {
    const { id } = useAppSelector(state => state.socketId)
    const getContacts = async () => {
        const res = await axios.get(`http://localhost:6301/api/v1/contacts/${id}`);
        return res.data
    };
    const { data, error, isLoading } = useQuery("get-contacts", getContacts)
    return { data, error, isLoading }
}