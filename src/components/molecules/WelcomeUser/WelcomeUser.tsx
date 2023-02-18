import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/store';
import { avatarIMGs } from '../../../data/data';
import {
    isUserNameExists,
    saveAvatar,
    saveUserName,
    selectAvatar,
    selectIsUserNameExists,
    selectUserName,
} from '../../../features/comments/commentsSlice';
import './WelcomeUser.css';

const WelcomeUser = () => {
    const dispatch = useAppDispatch();
    const userName = useSelector(selectUserName);
    const avatar = useSelector(selectAvatar);
    const userNameFlag = useSelector(selectIsUserNameExists);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    // const [avatar, setAvatar] = useState<string>('image-amyrobson.webp');

    const handleAvatar = (url: string) => {
        setShowOptions(false);
        // setAvatar(url);
        console.log(url);
        dispatch(saveAvatar(url));
    };

    const handleUserName = (data: string) => {
        dispatch(saveUserName(data));
        // dispatch(isUserNameExists());
    };

    return (
        <div className="welcomeContainer">
            <div className="avatarSelect">
                <div className="avatarSelect__chosenAvatar pointer " onClick={() => setShowOptions(!showOptions)}>
                    <img src={`../../../../images/avatars/${avatar}`} alt="avatar" />
                    <MdArrowDropDown />
                </div>
                {showOptions && (
                    <div className="avatarSelect__options">
                        <ul>
                            {avatarIMGs.map((url) => (
                                <li className="pointer" onClick={() => handleAvatar(url)}>
                                    <img src={`../../../../images/avatars/${url}`} alt="avatar option" />{' '}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <input placeholder="Your name" value={userName} onChange={(e) => handleUserName(e.target.value)} />
            {userNameFlag && <p>no user name</p>}
        </div>
    );
};

export default WelcomeUser;
