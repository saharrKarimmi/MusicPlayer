import React from 'react';
import SongListItem from "./SongListItem";

const SongList = ({songs, setCurrentSong, setSonges, displayListSong}) => {
    return (<div className={`song-list ${displayListSong ? "" : "displayList"}`}>
        <h2>List of Song</h2>
        <div className={"song-list-items"}>
            {songs.map(song => (<SongListItem key={song.id} song={song} setCurrentSong={setCurrentSong} songs={songs}
                                              setSonges={setSonges}/>))}

            {/*به ازای هر اهنگ یک کامپوننت songlist item درست میکنیم */}

        </div>
    </div>);
};

export default SongList;