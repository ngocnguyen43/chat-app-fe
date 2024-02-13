import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./useAppSelector";
import useAxios from "./useAxios";
import { env } from "../config";

interface IFriendRequest {
    "status": "pending" | "accepted",
    "requesterId": string,
    "recipientId": string,
    id: string

}
export default function useFetchFriendStatus(target: string | undefined) {
    const {
        entity: { userId: id },
    } = useAppSelector((state) => state.information);

    const { loading } = useAppSelector(state => state.conversations)
    const { axios } = useAxios();
    const fetchFriendStatus = async () => {
        const res = await axios.get<IFriendRequest>(`${env.BACK_END_URL}/users/${id}/friends/${target}`);
        return res.data;
    };
    const query = useQuery({ queryKey: ['get-friend-status', target], queryFn: fetchFriendStatus, refetchOnWindowFocus: false, retry: false, enabled: Boolean(target) && !loading });
    return { ...query };
}