import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/store';
import {
    addComments,
    clearReply,
    refreshComments,
    replyState,
    selectUserData,
} from '../../../features/comments/commentsSlice';
import formatMessage from '../../../services/messageFormatter';
import './AddComment.css';

interface AddCommentProps {
    isReply: boolean;
}

const AddComment = ({ isReply = false }: AddCommentProps) => {
    const dispatch = useAppDispatch();
    const replyData = useSelector(replyState);
    // const userAvatarURL = useSelector(selectAvatar);
    const userData = useSelector(selectUserData);
    const [message, setMessage] = useState('');

    const onMessageChange = (text: string) => {
        if (isReply && !message.includes(replyData.userName)) text = `@${replyData.userName} ${text}`;
        setMessage(text);
    };

    const addComment = () => {
        const object = {
            userId: userData.userId,
            image: userData.avatar,
            nickname: userData.userName,
            message: formatMessage(message),
            tagUser: {
                isTrue: isReply,
                userId: isReply ? replyData.userId : '',
                userName: isReply ? replyData.userName : '',
            },
            commentIndent: {
                level: isReply ? replyData.commentIds.length : 0,
                commentIds: replyData.commentIds,
            },
        };
        async function newComment() {
            await dispatch(addComments(object));
            dispatch(clearReply());
            dispatch(refreshComments());
        }
        newComment();
    };
    return (
        <div className="addComment">
            <div className="addComment__image">
                <img src={`../../../../images/avatars/${userData.avatar}`} alt="user avatar" />
            </div>
            <div className="addComment__textarea">
                <textarea value={message} onChange={(e) => onMessageChange(e.target.value)} />
            </div>
            <div className="addComment__button  ">
                <button className="pointer" onClick={() => addComment()}>
                    {isReply ? 'Reply' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default AddComment;
