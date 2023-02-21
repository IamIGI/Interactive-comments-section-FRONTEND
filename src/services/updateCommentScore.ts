import { CommentInterface } from '../interfaces/comment.interfaces';

function updateCommentScore(scoreUp: boolean, comment: CommentInterface) {
    if (scoreUp) {
        comment.score += 1;
    } else {
        comment.score -= 1;
    }
}

export default updateCommentScore;
