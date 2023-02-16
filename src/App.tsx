import Comment from './components/templates/Comment/Comment';
import { useGetComments } from './features/comments/commentsHooks';
import { CommentInterface } from './interfaces/comment.interfaces';

function App() {
    const { data, isError, isLoading, isSuccess, error } = useGetComments();

    return (
        <div className="container">
            {' '}
            {isError ? (
                <>{error}</>
            ) : isLoading ? (
                <>Loading...</>
            ) : isSuccess && data ? (
                <Comment />
            ) : // <ul>
            //     {(data as CommentInterface[]).map((comment0) => (
            //         <>
            //             {console.log(comment0)}

            //             <li>{comment0.message}</li>
            //             <li>
            //                 <ul>
            //                     {comment0.responses.map((comment1) => (
            //                         <>
            //                             <li>{comment1.message}</li>

            //                             <ul>
            //                                 {comment1.responses.map((comment2) => (
            //                                     <li>{comment2.message}</li>
            //                                 ))}
            //                             </ul>
            //                         </>
            //                     ))}
            //                 </ul>
            //             </li>
            //         </>
            //     ))}
            // </ul>
            null}
        </div>
    );
}

export default App;
