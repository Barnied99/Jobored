import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addFavoriteVacancy,
    deleteFavoriteVacancy,
    resetFavoriteVacancies,
} from '@/components/vacancies/services';



interface ChangeState {
    jobored: number[];
}


const changeSlice = createSlice({
    name: 'jobored',
    initialState: {
        jobored: []
    } as ChangeState,
    reducers: {
        setaddFavoriteVacancy: (state, action: PayloadAction<number>) => {
            const key = action.payload
            addFavoriteVacancy(key)
            state.jobored = [...state.jobored, key]
        },

        setdeleteFavoriteVacancy: (state, action: PayloadAction<number>) => {
            const key = action.payload
            deleteFavoriteVacancy(key)
            state.jobored = state.jobored.filter((elem) => elem !== key)
        },

        setresetFavoriteVacancies: (state) => {
            resetFavoriteVacancies()
            state.jobored = []
        }

    },
});

export const changeActions = changeSlice.actions;

export default changeSlice.reducer;



