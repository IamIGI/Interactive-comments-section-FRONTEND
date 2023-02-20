import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import {
    fetchComments,
    commentsStatus,
    commentsErrors,
    selectAllComments,
    selectRefreshComments,
} from './commentsSlice';

export function useGetComments() {
    const dispatch = useAppDispatch();
    const status = useSelector(commentsStatus);
    const error = useSelector(commentsErrors);
    const data = useSelector(selectAllComments);
    const refreshComments = useSelector(selectRefreshComments);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchComments());
        }
    }, [status, error, dispatch]);

    useEffect(() => {
        dispatch(fetchComments());
    }, [refreshComments]);

    const isUninitialized = status === undefined;
    const isLoading = status === 'pending' || status === 'idle';
    const isError = status === 'rejected';
    const isSuccess = status === 'fulfilled';

    return { data, isUninitialized, isLoading, isError, isSuccess, error };
}
