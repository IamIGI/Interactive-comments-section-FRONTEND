import { MdDelete } from 'react-icons/md';
import { FaReply } from 'react-icons/fa';
import './Comment.css';

const Comment = () => {
    return (
        <div className="comment">
            <div className="scoreboard">
                <button className="scoreboard__button pointer">+</button>
                <div className="scoreboard__score">12</div>
                <button className="scoreboard__button pointer">-</button>
            </div>
            <div className="content">
                <div className="content__nav">
                    <div className="content__nav__info">
                        <img src="../../../../images/avatars/image-amyrobson.webp" />
                        <div className="content__nav__info__desc">
                            <h3>
                                Amyrobson <span> 1 month ago</span>
                            </h3>
                        </div>
                    </div>
                    <div className="content__nav__info_buttons">
                        <button className="delete customButton pointer">
                            <MdDelete /> Delete
                        </button>
                        <button className="reply customButton pointer">
                            <FaReply /> Reply
                        </button>
                    </div>
                </div>
                <div className="message">
                    <p>
                        <span>@maxblune</span> Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into electronic
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Comment;
