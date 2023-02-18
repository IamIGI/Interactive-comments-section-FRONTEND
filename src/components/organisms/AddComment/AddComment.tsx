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

    // const addComment = () => {
    //     const object = {
    //         userId: "243b2a24-da05-4b58-b59e-cb6122c7b2a9",
    //         image: 'image-ramsesmiron.webp',
    //         nickname:  ,
    //         message: child level 2 comment,
    //         tagUser: {
    //             isTrue: true,
    //             userId: 243b2a24-da05-4b58-b59e-cb6787c7b2a9,
    //             userName: Marek
    //         },
    //         commentIndent: {
    //             level: isReply ? 0 : ,
    //             commentIds: [
    //                 63e8049c176574ecf0ac8d9b,
    //                 63e804e8176574ecf0ac8d9e
    //             ]
    //         }
    //     }
    // }
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
