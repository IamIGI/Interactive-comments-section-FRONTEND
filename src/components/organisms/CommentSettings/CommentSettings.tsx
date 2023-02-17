import { MdDelete } from 'react-icons/md';
import { FaReply } from 'react-icons/fa';
import './CommentSettings.css';
import { useAppDispatch } from '../../../app/store';
import { openReply } from '../../../features/comments/commentsSlice';

interface CommentSettingsProps {
    nickname: string;
    commentId: string;
}

const CommentSettings = ({ nickname, commentId }: CommentSettingsProps) => {
    const dispatch = useAppDispatch();

    const handleReply = () => {
        dispatch(openReply({ replyName: nickname, commentId }));
    };

    return (
        <div className="content__nav__info__buttons">
            <button className="delete customButton pointer">
                <MdDelete /> Delete
            </button>
            <button className="reply customButton pointer" onClick={() => handleReply()}>
                <FaReply /> Reply
            </button>
        </div>
    );
};

export default CommentSettings;
