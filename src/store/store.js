import { configureStore } from '@reduxjs/toolkit';
import { sidebarSlice } from './slices/sidebar/sidebarSlice';

export const store = configureStore({
reducer: {
    sidebar: sidebarSlice.reducer
},
})