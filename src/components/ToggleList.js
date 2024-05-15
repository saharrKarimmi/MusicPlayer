import React from 'react';
import {FaMusic} from "react-icons/fa";

const ToggleList = ({setDisplayListSong, displayListSong}) => {
    return (<div>
        <nav>
            <h1 id={"title-1"}>Waves</h1>
            <button onClick={() => setDisplayListSong(!displayListSong)}>
                Song List
                <FaMusic/>
            </button>
        </nav>
    </div>);
};

export default ToggleList;