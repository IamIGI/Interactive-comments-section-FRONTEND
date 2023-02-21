import { v4 as uuidv4 } from 'uuid';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getComments, addComment, deleteComment, editMessage, updateScore } from '../../api/comments';
import {
    addCommentObjectInterface,
    CommentInterface,
    deleteObjectInterface,
    editCommentObjectApi,
    editCommentObjectInterface,
    editCommentScoreObjectInterface,
} from '../../interfaces/comment.interfaces';
import updateCommentScore from '../../services/updateCommentScore';

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
    editComment: editCommentObjectInterface;
    delete: { commentIds: string[] };
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
const editCommentInit = { isEdited: false, indentLevel: 0, comments: [], content: '', tagUser: '' };

const initialState: CommentsInitialState = {
    data: [],
    status: 'idle',
    error: undefined,
    refresh: false,
    reply: replyInit,
    editComment: editCommentInit,
    delete: { commentIds: [''] },
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

export const editComment = createAsyncThunk('comments/edit', async (object: editCommentObjectApi): Promise<void> => {
    await editMessage(object);
});

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
        saveDelete(state, action: PayloadAction<string[]>) {
            state.delete.commentIds = action.payload;
        },
        openReply(state, action: PayloadAction<replyInterface>) {
            state.editComment = editCommentInit;
            state.reply = action.payload;
        },
        openEdit(state, action: PayloadAction<editCommentObjectInterface>) {
            const { comments } = action.payload;
            state.reply.commentId = comments[comments.length - 1];
            state.editComment = action.payload;
        },
        clearMessages(state) {
            state.reply = replyInit;
            state.editComment = editCommentInit;
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
        editCommentScore(state, action: PayloadAction<editCommentScoreObjectInterface>) {
            const { comments: commentIds, indentLevel, scoreUp } = action.payload;

            state.data.forEach((comment0) => {
                if (comment0._id === commentIds[0]) {
                    if (indentLevel === 0) {
                        updateCommentScore(scoreUp, comment0);
                    } else {
                        comment0.responses.forEach((comment1) => {
                            if (comment1._id === commentIds[1]) {
                                if (indentLevel === 1) {
                                    updateCommentScore(scoreUp, comment1);
                                } else {
                                    comment1.responses.forEach((comment2) => {
                                        if (comment2._id === commentIds[2]) {
                                            updateCommentScore(scoreUp, comment2);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
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
            })
            .addCase(deleteComments.fulfilled, (state) => {
                state.status = 'fulfilled';
            })
            .addCase(deleteComments.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message as string;
            })
            .addCase(editComment.fulfilled, (state) => {
                state.status = 'fulfilled';
            })
            .addCase(editComment.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message as string;
            });
    },
});

export const {
    refreshComments,
    saveDelete,
    openReply,
    openEdit,
    clearMessages,
    saveAvatar,
    saveUserId,
    saveUserName,
    isUserNameExists,
    editCommentScore,
} = commentsSlice.actions;
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
export const selectDeleteComment = (state: RootState) => state.comments.delete;
export const selectEditComment = (state: RootState) => state.comments.editComment;

export default commentsSlice.reducer;
