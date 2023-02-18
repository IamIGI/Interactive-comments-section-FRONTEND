import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

interface ModalProps {
    open: [boolean, unknown?];
    children: ReactNode;
    onClose: () => void;
}
//{ open, children, onClose }: ModalProps
export default function Modal({
    open,
    children,
    welcomeModal = false,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    welcomeModal?: boolean;
}) {
    if (!open) return null;
    return ReactDOM.createPortal(
        <>
            <div className="overlay" onClick={onClose} />
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
                            onClick={onClose}
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
