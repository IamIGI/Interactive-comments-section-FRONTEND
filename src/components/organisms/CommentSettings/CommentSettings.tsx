import { MdDelete } from 'react-icons/md';
import { FaReply } from 'react-icons/fa';
import './CommentSettings.css';
import { useAppDispatch } from '../../../app/store';
import { openReply } from '../../../features/comments/commentsSlice';
import Modal from '../../atoms/Modal/Modal';
import { useState } from 'react';
import { contextText } from '../../../data/data';

interface CommentSettingsProps {
    nickname: string;
    commentId: string;
}

const CommentSettings = ({ nickname, commentId }: CommentSettingsProps) => {
    const dispatch = useAppDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleReply = () => {
        dispatch(openReply({ replyName: nickname, commentId }));
    };

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    return (
        <div className="content__nav__info__buttons">
            <button className="delete customButton pointer" onClick={() => handleDelete()}>
                <MdDelete /> Delete
            </button>
            <button className="reply customButton pointer" onClick={() => handleReply()}>
                <FaReply /> Reply
            </button>
            <Modal welcomeModal={false} open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <p className="deleteText">{contextText.delete}</p>
            </Modal>
        </div>
    );
};

export default CommentSettings;
