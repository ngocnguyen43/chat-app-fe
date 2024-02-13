import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "./useAppSelector";
import useAxios from "./useAxios";
import { env } from "../config";
import { useAppDispatch } from "./useAppDispatch";
import { setAuthError } from "../store";
import useSequene from "./useSequence";
import useFetchFriendStatus from "./useFetchFriendStatus";

export default function useAcceptFriendRequest(id: string | undefined) {
    const { axios } = useAxios();
    const dispatch = useAppDispatch();
    const sequence = useSequene()
    const { refetch } = useFetchFriendStatus(id)

    const {
        entity: { userId },
    } = useAppSelector((state) => state.information);
    return useMutation({
        mutationFn: async () => {
            return axios.patch(`${env.BACK_END_URL}/users/${userId}/friends/${id}`);
        },
        onSuccess: () => {
            sequence(userId).then(() => {
                refetch()
            })
        },
        onError: () => {
            dispatch(setAuthError(true));
        },
    });
}