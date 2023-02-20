import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/store';
import {
    deleteComments,
    isUserNameExists,
    refreshComments,
    saveUserId,
    selectDeleteComment,
    selectIsUserNameExists,
    selectUserName,
} from '../../../features/comments/commentsSlice';
import { deleteObjectInterface } from '../../../interfaces/comment.interfaces';
import WelcomeUser from '../../molecules/WelcomeUser/WelcomeUser';

import './Modal.css';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    welcomeModal?: boolean;
}

export default function Modal({ open, children, welcomeModal = false, onClose }: ModalProps) {
    const dispatch = useAppDispatch();
    const userName = useSelector(selectUserName);
    const deleteCommentData = useSelector(selectDeleteComment);
    if (!open) return null;

    const handleOnClose = () => {
        if (welcomeModal) {
            if (userName.length > 2) {
                dispatch(saveUserId());
                dispatch(isUserNameExists(false));
                onClose();
            } else {
                dispatch(isUserNameExists(true));
            }
        } else {
            const object: deleteObjectInterface = {
                indentLevel: deleteCommentData.commentIds.length - 1,
                comments: deleteCommentData.commentIds,
            };

            const deleteItem = async () => {
                await dispatch(deleteComments(object));
                dispatch(refreshComments());
                onClose();
            };

            deleteItem();
        }
    };

    return ReactDOM.createPortal(
        <>
            <div className="overlay" />
            <div className="outsideWrapper">
                <div className="insideWrapper">
                    <div className="modal__title">{welcomeModal ? 'Welcome' : 'Delete comment'}</div>
                    {children}
                    <div className="modal__navigation">
                        {!welcomeModal && (
                            <button data-backgroundcolor="reject" className="modal__button pointer" onClick={onClose}>
                                NO,CANCEL
                            </button>
                        )}
                        <button
                            data-backgroundcolor={welcomeModal ? 'approve' : 'delete'}
                            className="modal__button pointer"
                            onClick={() => handleOnClose()}
                        >
                            {welcomeModal ? 'GO,CHAT!' : 'YES,DELETE'}
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')!
    );
}
