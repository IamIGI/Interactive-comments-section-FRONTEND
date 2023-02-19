import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from './components/atoms/Modal/Modal';
import WelcomeUser from './components/molecules/WelcomeUser/WelcomeUser';
import AddComment from './components/organisms/AddComment/AddComment';
import Comment from './components/templates/Comment/Comment';
import { useGetComments } from './features/comments/commentsHooks';
import { selectUserExists } from './features/comments/commentsSlice';
import { CommentInterface } from './interfaces/comment.interfaces';

function App() {
    const isUserExists = useSelector(selectUserExists);
    const { data, isError, isLoading, isSuccess, error } = useGetComments();
    const [welcomeModalOpen, setWelcomeModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!isUserExists) setWelcomeModalOpen(true);
    }, []);

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
                            <Comment parents={[comment0._id]} data={comment0} key={comment0._id} />
                            <div className="commentSubSection">
                                {comment0.responses.length > 0 &&
                                    comment0.responses.map((comment1) => (
                                        <>
                                            <Comment
                                                parents={[comment0._id, comment1._id]}
                                                data={comment1}
                                                key={comment1._id}
                                            />
                                            <div className="commentSubSection">
                                                {comment1.responses.length > 0 &&
                                                    comment1.responses.map((comment2) => (
                                                        <Comment
                                                            parents={[comment0._id, comment1._id]}
                                                            data={comment2}
                                                            key={comment2._id}
                                                        />
                                                    ))}
                                            </div>
                                        </>
                                    ))}
                            </div>
                        </>
                    ))}
                    <AddComment isReply={false} />
                </>
            ) : null}
            <Modal welcomeModal={true} open={welcomeModalOpen} onClose={() => setWelcomeModalOpen(false)}>
                <WelcomeUser />
            </Modal>
        </div>
    );
}

export default App;
