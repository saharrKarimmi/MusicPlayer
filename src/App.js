import './styles/app.scss';
import './App.css';
import Song from './components/Song';
import Player from './components/Player';
import data from './data';
import {useState} from "react";
import SongList from "./components/SongList";
import ToggleList from "./components/ToggleList";

function App() {
    const [songs, setSonges] = useState(data());
    // آهنگی ک در لحظه اجرا می شود
    const [currentSong, setCurrentSong] = useState(songs[0]);
    // استیت زیر فقط مقدار پلی یا نبودن موزیک را در خود زخیره میکند و از نوع booliuan است و مدار اولیه ان false است
    const [isPlaying, setIsPlaying] = useState(false);
    console.log("is =", songs);
    const [displayListSong, setDisplayListSong] = useState(false);
    return (<div className={`App ${displayListSong ? "activeList" : ""}`}>
        {/*currentSong را به صورت props میخواهیم به کامپوننت song پاس دهیم*/}
        <ToggleList displayListSong={displayListSong} setDisplayListSong={setDisplayListSong}/>
        <Song currentSong={currentSong}/>
        {/*جز مقدار استیت خود استیت را هم پاس میدهیم کخ در خود زخیره میکند چون باید مقدار ان هم عوض شود و عوض شده را در خود نگه دارد هی */}
        <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songs={songs}
                setCurrentSong={setCurrentSong} setSonges={setSonges}/>
        <SongList songs={songs} setCurrentSong={setCurrentSong} setSonges={setSonges}
                  displayListSong={displayListSong}/>
    </div>);
}

export default App;
