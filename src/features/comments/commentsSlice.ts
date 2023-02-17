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

interface CommentsInitialState {
    data: CommentInterface[];
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: undefined | string;
    refresh: boolean;
    reply: { replyName: string; commentId: string };
}

const initialState: CommentsInitialState = {
    data: [],
    status: 'idle',
    error: undefined,
    refresh: false,
    reply: { replyName: '', commentId: '' },
};

export const fetchComments = createAsyncThunk('comments/get', async (): Promise<CommentInterface[]> => {
    const response = await getComments();

    return response;
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
            console.log(replyName, commentId);
            if (state.reply.commentId === commentId) {
                commentId = '';
            }
            state.reply = { replyName, commentId };
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

export const { refreshComments, openReply } = commentsSlice.actions;
export const selectAllComments = (state: RootState) => state.comments.data;
export const commentsStatus = (state: RootState) => state.comments.status;
export const commentsErrors = (state: RootState) => state.comments.error;
export const replyState = (state: RootState) => state.comments.reply;

export default commentsSlice.reducer;
