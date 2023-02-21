import { MdDelete, MdEdit } from 'react-icons/md';
import { FaReply } from 'react-icons/fa';
import './CommentSettings.css';
import { useAppDispatch } from '../../../app/store';
import { openEdit, openReply, saveDelete } from '../../../features/comments/commentsSlice';
import Modal from '../../atoms/Modal/Modal';
import { useState } from 'react';
import { contextText } from '../../../data/data';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../features/comments/commentsSlice';
import { editCommentObjectInterface } from '../../../interfaces/comment.interfaces';

interface CommentSettingsProps {
    message: { content: string; tagUser: string };
    parents: string[];
    replyData: { userId: string; userName: string; commentId: string };
}

const CommentSettings = ({ message, parents, replyData }: CommentSettingsProps) => {
    const dispatch = useAppDispatch();
    const userData = useSelector(selectUserData);
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

    const handleEdit = () => {
        let commentIdsArray = [...parents];
        if (parents[parents.length - 1] !== replyData.commentId) commentIdsArray.push(replyData.commentId);

        const object: editCommentObjectInterface = {
            isEdited: true,
            indentLevel: commentIdsArray.length - 1,
            comments: commentIdsArray,
            content: message.content,
            tagUser: message.tagUser,
        };

        dispatch(openEdit(object));
    };

    return (
        <div className="content__nav__info__buttons">
            {replyData.userId === userData.userId ? (
                <>
                    <button className="delete customButton pointer" onClick={() => handleDelete()}>
                        <MdDelete /> Delete
                    </button>
                    <button className="reply customButton pointer" onClick={() => handleEdit()}>
                        <MdEdit /> Edit
                    </button>
                </>
            ) : (
                <button className="reply customButton pointer" onClick={() => handleReply()}>
                    <FaReply /> Reply
                </button>
            )}

            <Modal welcomeModal={false} open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <p className="deleteText">{contextText.delete}</p>
            </Modal>
        </div>
    );
};

export default CommentSettings;
