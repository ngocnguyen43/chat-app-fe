import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ParticipantsType = {
    data: string;
    name: string,
    id: string
    label: string;
    value: string;
    state: {
        isBlocker: boolean,
        type: "user" | "blocker"
    }
};
type InitialStateType = {
    entities: ParticipantsType[]
}
const initialState: InitialStateType = {
    entities: [],
};
const participantsSlice = createSlice({
    name: 'participants-slice',
    initialState,
    reducers: {
        addParticipant: (state, action: PayloadAction<ParticipantsType[]>) => {
            const participants = action.payload

            state.entities = participants
        },
        clearParticipants: () => initialState
    },
});

export const { addParticipant, clearParticipants } = participantsSlice.actions;
export const participantsReducer = participantsSlice.reducer;
export default participantsSlice;
