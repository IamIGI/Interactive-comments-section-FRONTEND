import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { replyState } from '../../../features/comments/commentsSlice';
import './AddComment.css';

interface AddCommentProps {
    isReply: boolean;
}

const AddComment = ({ isReply = false }: AddCommentProps) => {
    const { replyName } = useSelector(replyState);
    const [message, setMessage] = useState('');

    const onMessageChange = (text: string) => {
        if (isReply && !message.includes(replyName)) text = `@${replyName} ${text}`;
        setMessage(text);
    };
    return (
        <div className="addComment">
            <div className="addComment__image">
                <img src={`../../../../images/avatars/image-maxblagun.webp`} alt="user avatar" />
            </div>
            <div className="addComment__textarea">
                <textarea value={message} onChange={(e) => onMessageChange(e.target.value)} />
            </div>
            <div className="addComment__button  ">
                <button className="pointer">{isReply ? 'Reply' : 'Send'}</button>
            </div>
        </div>
    );
};

export default AddComment;
