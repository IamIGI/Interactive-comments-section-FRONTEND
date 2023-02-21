import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/store';
import format from 'date-fns/format';
import {
    editCommentScore,
    editScore,
    refreshComments,
    replyState,
    selectUserData,
} from '../../../features/comments/commentsSlice';
import { editCommentScoreObjectInterface } from '../../../interfaces/comment.interfaces';
import dateDifference from '../../../services/dateDifference';
import formatDate from '../../../services/dateFormatter';
import AddComment from '../../organisms/AddComment/AddComment';
import CommentSettings from '../../organisms/CommentSettings/CommentSettings';
import './Comment.css';

interface CommentProps {
    data: {
        _id: string;
        userId: string;
        image: string;
        nickname: string;
        date: string;
        message: string;
        score: number;
        tagUser: {
            isTrue: boolean;
            userId?: string;
            userName?: string;
        };
        commentIndent: {
            level: number;
            commentIds: string[];
        };
    };
    parents: string[];
}

const Comment = ({ data, parents }: CommentProps) => {
    const dispatch = useAppDispatch();
    const userData = useSelector(selectUserData);
    const { commentId } = useSelector(replyState);

    const saveScore = async (scoreUp: boolean) => {
        let commentIdsArray = [...parents];
        if (parents[parents.length - 1] !== data._id) commentIdsArray.push(data._id);

        const object: editCommentScoreObjectInterface = {
            indentLevel: commentIdsArray.length - 1,
            comments: commentIdsArray,
            scoreUp,
        };
        dispatch(editCommentScore(object));
        await dispatch(editScore(object));
    };

    return (
        <div className="container">
            <div className="comment">
                <div className="leftSection">
                    <div className="scoreboard">
                        <button className="scoreboard__button pointer" onClick={() => saveScore(true)}>
                            +
                        </button>
                        <div className="scoreboard__score">{data.score}</div>
                        <button className="scoreboard__button pointer" onClick={() => saveScore(false)}>
                            -
                        </button>
                    </div>
                    <div className="smallerScreen">
                        <CommentSettings
                            message={{ content: data.message, tagUser: data.tagUser.userName ?? '' }}
                            replyData={{ userId: data.userId, userName: data.nickname, commentId: data._id }}
                            parents={parents}
                        />
                    </div>
                </div>
                <div className="content">
                    <div className="content__nav">
                        <div className="content__nav__info">
                            <img src={`../../../../images/avatars/${data.image}`} />
                            <div className="content__nav__info__desc">
                                <h3>
                                    {data.nickname}
                                    {data.userId === userData.userId && <span>you</span>}
                                    <span> {dateDifference(new Date(formatDate(data.date)))}</span>
                                </h3>
                            </div>
                        </div>
                        <div className="biggerScreen">
                            <CommentSettings
                                message={{ content: data.message, tagUser: data.tagUser.userName ?? '' }}
                                replyData={{ userId: data.userId, userName: data.nickname, commentId: data._id }}
                                parents={parents}
                            />
                        </div>
                    </div>
                    <div className="message">
                        <p>
                            {data.tagUser.isTrue && <span>@{data.tagUser.userName}</span>}
                            {data.message}
                        </p>
                    </div>
                </div>
            </div>

            {commentId === data._id && <AddComment isReply={true} />}
        </div>
    );
};

export default Comment;
