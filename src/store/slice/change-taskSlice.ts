import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    tasks?: Action[];
}
export interface Action {
    id: string,
    text: string,
}

let initialState: Task = {
    tasks: []
}

const changeSlice = createSlice({
    name: 'tasklist',
    initialState: initialState.tasks || [],
    reducers: {
        setadd(state, action: PayloadAction<Action>) {
            const newTask: Action = {
                id: action.payload.id,
                text: action.payload.text
            }
            return [
                ...state,
                newTask
            ];
        },

        remove(state, action: PayloadAction<string>) {
            const deleteTask = state.filter((item: any) => {
                return item.id !== action.payload
            })
            return [
                ...deleteTask
            ];
        },

        change(state, action: PayloadAction<Action>) {
            const { id, text } = action.payload
            const updateTask = state.map((el) =>
                el.id === id ? { ...el, text: text } : el
            )
            return updateTask;
        },
    },
});

export const changeActions = changeSlice.actions;

export default changeSlice.reducer;



