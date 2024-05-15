import React from 'react';

// currentSong را که پاس داده بودیم در کامپوننت app.js اینجا گرفیت داخل پراننتز
const Song = ({currentSong}) => {
    return (<div className={"song-container"}>

        {/*نام قسمت های اسم موزیک و خواننده و عکس موزیک*/}

        <img src={currentSong.cover}></img>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
    </div>);
};

export default Song;