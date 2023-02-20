import { MdDelete } from 'react-icons/md';
import { FaReply } from 'react-icons/fa';
import './CommentSettings.css';
import { useAppDispatch } from '../../../app/store';
import { openReply, saveDelete } from '../../../features/comments/commentsSlice';
import Modal from '../../atoms/Modal/Modal';
import { useState } from 'react';
import { contextText } from '../../../data/data';

interface CommentSettingsProps {
    parents: string[];
    replyData: { userId: string; userName: string; commentId: string };
}

const CommentSettings = ({ parents, replyData }: CommentSettingsProps) => {
    const dispatch = useAppDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleReply = () => {
        dispatch(openReply({ commentIds: parents, ...replyData }));
    };

    const handleDelete = () => {
        let commentIdsArray = [...parents];
        if (parents[parents.length - 1] !== replyData.commentId) commentIdsArray.push(replyData.commentId);
        dispatch(saveDelete(commentIdsArray));
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
