import axios from 'axios';
import { BASE_URL } from '../data/URL';
import {
    addCommentObjectInterface,
    CommentInterface,
    deleteObjectInterface,
    editCommentObjectApi,
    editCommentScoreObjectInterface,
} from '../interfaces/comment.interfaces';

const commentsApi = axios.create({
    baseURL: `${BASE_URL}/comments`,
    headers: { 'Content-Type': 'application/json' },
});

const getComments = async () => {
    try {
        const response = await commentsApi.get('/all');
        return response.data as CommentInterface[];
    } catch (err) {
        console.log(err);
    }
};

const addComment = async (object: addCommentObjectInterface) => {
    try {
        const response = await commentsApi.post('/add', object);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const deleteComment = async (object: deleteObjectInterface) => {
    try {
        const response = await commentsApi.patch('/delete', object);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const editMessage = async (object: editCommentObjectApi) => {
    try {
        const response = await commentsApi.patch('/edit', object);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const updateScore = async (object: editCommentScoreObjectInterface) => {
    try {
        const response = await commentsApi.patch('/score', object);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export { getComments, addComment, deleteComment, updateScore, editMessage };
