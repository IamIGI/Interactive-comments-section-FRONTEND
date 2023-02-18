import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/store';
import {
    isUserNameExists,
    saveUserId,
    selectIsUserNameExists,
    selectUserName,
} from '../../../features/comments/commentsSlice';
import WelcomeUser from '../../molecules/WelcomeUser/WelcomeUser';

import './Modal.css';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    welcomeModal?: boolean;
}

//{ open, children, onClose }: ModalProps
export default function Modal({ open, children, welcomeModal = false, onClose }: ModalProps) {
    const dispatch = useAppDispatch();
    const userName = useSelector(selectUserName);
    if (!open) return null;

    const handleOnClose = () => {
        if (welcomeModal) {
            if (userName.length > 2) {
                dispatch(saveUserId());
                dispatch(isUserNameExists(false));
                onClose();
            } else {
                console.log('missing userName');
                dispatch(isUserNameExists(true));
            }
        } else {
            onClose();
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
