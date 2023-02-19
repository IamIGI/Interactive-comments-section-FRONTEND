// export interface CommentInterface {
//     _id: string;
//     userId: string;
//     image: string;
//     nickname: string;
//     date: string;
//     message: string;
//     score: number;
//     tagUser: {
//         isTrue: boolean;
//         userId?: string;
//         userName?: string;
//     };
//     commentIndent: {
//         level: number;
//         commentIds: string[];
//     };
//     responses: {
//         _id: string;
//         userId: string;
//         image: string;
//         nickname: string;
//         date: string;
//         message: string;
//         score: number;
//         tagUser: {
//             isTrue: boolean;
//             userId?: string;
//         };
//         commentIndent: {
//             level: number;
//             commentIds: string[];
//         };
//         responses: {
//             _id: string;
//             userId: string;
//             image: string;
//             nickname: string;
//             date: string;
//             message: string;
//             score: number;
//             tagUser: {
//                 isTrue: boolean;
//                 userId?: string;
//             };
//             commentIndent: {
//                 level: number;
//                 commentIds: string[];
//             };
//         }[];
//     }[];
// }

export interface CommentInterface {
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
    responses: CommentInterface[] | [];
}
export interface addCommentObjectInterface {
    userId: string;
    image: string;
    nickname: string;
    message: string;
    tagUser: {
        isTrue: boolean;
        userId: string;
        userName: string;
    };
    commentIndent: {
        level: number;
        commentIds: string[];
    };
}

export interface deleteObjectInterface {
    indentLevel: number;
    comments: string[];
}

export interface editCommentObjectInterface {
    indentLevel: number;
    comments: string[];
    content: string;
}

export interface editCommentScoreObjectInterface {
    indentLevel: number;
    comments: string[];
    scoreUp: boolean;
}
