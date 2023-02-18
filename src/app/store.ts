import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import commentsReducer from '../features/comments/commentsSlice';
import { listenerMiddleware } from './middleware';

const store = configureStore({
    reducer: {
        comments: commentsReducer,
    },
    // middleware: (getDefaultMiddleware) => [listenerMiddleware.middleware],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
