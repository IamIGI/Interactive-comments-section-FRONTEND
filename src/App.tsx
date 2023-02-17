import Comment from './components/templates/Comment/Comment';
import { useGetComments } from './features/comments/commentsHooks';
import { CommentInterface } from './interfaces/comment.interfaces';

function App() {
    const { data, isError, isLoading, isSuccess, error } = useGetComments();

    return (
        <div className="commentSection">
            {isError ? (
                <>{error}</>
            ) : isLoading ? (
                <>Loading...</>
            ) : isSuccess && data ? (
                <>
                    {(data as CommentInterface[]).map((comment0) => (
                        <>
                            <Comment data={comment0} key={comment0._id} />
                            <div className="commentSubSection">
                                {comment0.responses.length > 0 &&
                                    comment0.responses.map((comment1) => (
                                        <>
                                            <Comment data={comment1} key={comment1._id} />
                                            <div className="commentSubSection">
                                                {comment1.responses.length > 0 &&
                                                    comment1.responses.map((comment2) => (
                                                        <Comment data={comment2} key={comment2._id} />
                                                    ))}
                                            </div>
                                        </>
                                    ))}
                            </div>
                        </>
                    ))}
                </>
            ) : null}
        </div>
    );
}

export default App;
