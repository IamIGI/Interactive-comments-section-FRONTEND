import { v4 as uuidv4 } from 'uuid';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getComments, addComment, deleteComment, editMessage, updateScore } from '../../api/comments';
import {
    addCommentObjectInterface,
    CommentInterface,
    deleteObjectInterface,
    editCommentObjectInterface,
    editCommentScoreObjectInterface,
} from '../../interfaces/comment.interfaces';

interface userDataInterface {
    userName: string;
    avatar: string;
    userId: string;
}

interface replyInterface {
    commentIds: string[];
    commentId: string;
    userId: string;
    userName: string;
}
interface CommentsInitialState {
    data: CommentInterface[];
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: undefined | string;
    refresh: boolean;
    reply: replyInterface;
    userData: userDataInterface;
    missingUserName: boolean;
}

const userData: userDataInterface =
    //@ts-ignore
    JSON.parse(localStorage.getItem('userData')) === null
        ? { userName: '', avatar: 'image-amyrobson.webp', userId: '' }
        : //@ts-ignore
          JSON.parse(localStorage.getItem('userData'));

const replyInit = { commentIds: [], commentId: '', userId: '', userName: '' };

const initialState: CommentsInitialState = {
    data: [],
    status: 'idle',
    error: undefined,
    refresh: false,
    reply: replyInit,
    userData,
    missingUserName: false,
};

export const fetchComments = createAsyncThunk('comments/get', async (): Promise<CommentInterface[]> => {
    const response = await getComments();

    return response!;
});

export const addComments = createAsyncThunk(
    'comments/add',
    async (object: addCommentObjectInterface): Promise<void> => {
        await addComment(object);
    }
);

export const deleteComments = createAsyncThunk(
    'comments/delete',
    async (object: deleteObjectInterface): Promise<void> => {
        await deleteComment(object);
    }
);

export const editComment = createAsyncThunk(
    'comments/edit',
    async (object: editCommentObjectInterface): Promise<void> => {
        await editMessage(object);
    }
);

export const editScore = createAsyncThunk(
    'comments/score',
    async (object: editCommentScoreObjectInterface): Promise<void> => {
        await updateScore(object);
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        refreshComments(state) {
            state.refresh = !state.refresh;
        },
        openReply(state, action: PayloadAction<replyInterface>) {
            state.reply = action.payload;
        },
        clearReply(state) {
            state.reply = replyInit;
        },
        saveAvatar(state, action: PayloadAction<string>) {
            state.userData.avatar = action.payload;
        },
        saveUserName(state, action: PayloadAction<string>) {
            state.userData.userName = action.payload;
        },
        isUserNameExists(state, action: PayloadAction<boolean>) {
            state.missingUserName = true;
        },
        saveUserId(state) {
            state.userData.userId = uuidv4();
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<CommentInterface[]>) => {
                state.status = 'fulfilled';
                state.data = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message as string;
            })
            .addCase(addComments.fulfilled, (state) => {
                state.status = 'fulfilled';
            })
            .addCase(addComments.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message as string;
            });
    },
});

export const { refreshComments, openReply, clearReply, saveAvatar, saveUserId, saveUserName, isUserNameExists } =
    commentsSlice.actions;
export const selectAllComments = (state: RootState) => state.comments.data;
export const commentsStatus = (state: RootState) => state.comments.status;
export const commentsErrors = (state: RootState) => state.comments.error;
export const selectRefreshComments = (state: RootState) => state.comments.refresh;
export const replyState = (state: RootState) => state.comments.reply;
export const selectAvatar = (state: RootState) => state.comments.userData.avatar;
export const selectUserName = (state: RootState) => state.comments.userData.userName;
export const selectIsUserNameExists = (state: RootState) => state.comments.missingUserName;
export const selectUserExists = (state: RootState) => Boolean(state.comments.userData.userId);
export const selectUserData = (state: RootState) => state.comments.userData;

export default commentsSlice.reducer;
