import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { avatarIMGs } from '../../../data/data';
import './WelcomeUser.css';

const WelcomeUser = () => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>('image-amyrobson.webp');

    const handleAvatar = (url: string) => {
        setShowOptions(false);
        setAvatar(url);
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
            <input placeholder="Your name" />
        </div>
    );
};

export default WelcomeUser;
