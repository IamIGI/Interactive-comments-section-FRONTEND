import { MdDelete } from 'react-icons/md';
import { FaReply } from 'react-icons/fa';
import './CommentSettings.css';

const CommentSettings = () => {
    return (
        <div className="content__nav__info__buttons">
            <button className="delete customButton pointer">
                <MdDelete /> Delete
            </button>
            <button className="reply customButton pointer">
                <FaReply /> Reply
            </button>
        </div>
    );
};

export default CommentSettings;
