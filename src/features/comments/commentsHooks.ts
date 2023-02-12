import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { fetchComments, addComments, deleteComments, editComment, editScore } from './commentsSlice';
