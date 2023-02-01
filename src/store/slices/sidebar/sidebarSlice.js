import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        clicked: true,
        selected: false,
    },
    reducers: {
        trigger: (state) => {
            state.clicked = !state.clicked 
        },
        select: (state) => {
            state.selected = true;
        }
    }
});

export const { trigger, select } =  sidebarSlice.actions;