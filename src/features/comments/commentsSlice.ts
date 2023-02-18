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

// interface tempUserDataInterface {
//     userName: string;
//     avatar: string;
// }
interface userDataInterface {
    userName: string;
    avatar: string;
    userId: string;
}
interface CommentsInitialState {
    data: CommentInterface[];
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: undefined | string;
    refresh: boolean;
    reply: { replyName: string; commentId: string };
    userData: userDataInterface;
    missingUserName: boolean;
}

const userData: userDataInterface =
    //@ts-ignore
    JSON.parse(localStorage.getItem('userData')) === null
        ? { userName: '', avatar: 'image-amyrobson.webp', userId: '' }
        : //@ts-ignore
          JSON.parse(localStorage.getItem('userData'));

const initialState: CommentsInitialState = {
    data: [],
    status: 'idle',
    error: undefined,
    refresh: false,
    reply: { replyName: '', commentId: '' },
    userData,
    missingUserName: true,
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
        openReply(state, action: PayloadAction<{ replyName: string; commentId: string }>) {
            let { replyName, commentId } = action.payload;
            if (state.reply.commentId === commentId) commentId = '';
            state.reply = { replyName, commentId };
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
            if (!state.missingUserName) state.userData.userId = uuidv4();
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
            .addCase(fetchComments.rejected, (state) => {
                state.status = 'pending';
            });
    },
});

export const { refreshComments, openReply, saveAvatar, saveUserId, saveUserName, isUserNameExists } =
    commentsSlice.actions;
export const selectAllComments = (state: RootState) => state.comments.data;
export const commentsStatus = (state: RootState) => state.comments.status;
export const commentsErrors = (state: RootState) => state.comments.error;
export const replyState = (state: RootState) => state.comments.reply;
export const selectAvatar = (state: RootState) => state.comments.userData.avatar;
export const selectUserName = (state: RootState) => state.comments.userData.userName;
export const selectIsUserNameExists = (state: RootState) => state.comments.missingUserName;
export const selectUserExists = (state: RootState) => Boolean(state.comments.userData.userId);

export default commentsSlice.reducer;
