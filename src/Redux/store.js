import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import themeSlice from './themeSlice'

const store = configureStore({
    reducer: {
        products: productsSlice,
        theme: themeSlice,
    }
})

export default store;