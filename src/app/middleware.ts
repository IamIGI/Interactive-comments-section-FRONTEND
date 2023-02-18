import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { saveAvatar, saveUserId, saveUserName } from '../features/comments/commentsSlice';
import { RootState } from './store';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(saveAvatar, saveUserId, saveUserName),
    effect: (action, listenerApi) => {
        localStorage.setItem('userData', JSON.stringify((listenerApi.getState() as RootState).comments.userData));
    },
});
