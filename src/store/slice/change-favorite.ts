import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    addFavoriteVacancy,
    deleteFavoriteVacancy,
    resetFavoriteVacancies,
} from '@/components/vacancies/services';



// interface ChangeState {
//     jobored: number[];
// }


const changeSlice = createSlice({
    name: 'jobored',
    initialState: [] as number[],
    reducers: {
        setaddFavoriteVacancy: (state, action: PayloadAction<number>) => {
            const key = action.payload
            addFavoriteVacancy(key)
            return [...state, key]
        },

        setdeleteFavoriteVacancy: (state, action: PayloadAction<number>) => {
            const key = action.payload
            deleteFavoriteVacancy(key)
            const deletefav = state.filter((elem) => { return elem !== key })
            return [...deletefav]
        },

        setresetFavoriteVacancies: (state) => {
            resetFavoriteVacancies()
            state = []
        },


    },
});

export const changeActions = changeSlice.actions;

export default changeSlice.reducer;



