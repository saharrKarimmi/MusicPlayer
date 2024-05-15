import React from 'react';

// currentSong را که پاس داده بودیم در کامپوننت app.js اینجا گرفیت داخل پراننتز
const SongListItem = ({song, songs, setCurrentSong, setSonges}) => {

    // تکخ کد پایین برای اینکه بتوانیماز داخل لیست هر اهنگی ک میخواهم را برای پلی شدن انتخب کنیم

    const songSelect = () => {
        const selectedSong = songs.filter((item) => item.id === song.id);
        setCurrentSong(selectedSong[0]);

        //یک ارایه بر میگرداند ولی  setCurrentSong در خط بالا [0] این برای این است که کل ارایه را برنگرداند و عنصر اول را برگرداند چون selectedSong یک object میدهد
        // دستور filtter همیشه ارایه بر میگرداند
        // setCurrentSong ارایه نیست

        console.log("is=", selectedSong)
        const newSongs = songs.map((item) => {
            if (item.id === song.id) {
                return {
                    ...item, active: true
                }
            } else {
                return {
                    ...item, active: false
                }
            }
        })
        setSonges(newSongs)

        // ... این ب معنی sperade aperatop
        //   و   item چون باید ویژگی های اهنگی ک داریم انتخاب میکنیم را تغییر دهیم نه همه اهنگ ها به این معنی که تمام اتربیوت ها را نگه دار و فقط مقدار active را از هر کدام تغییر بده   ...item
    }
    return (<div onClick={songSelect} className={`song-item ${song.active ? "selected" : ""} `}>
        {/*نام قسمت های اسم موزیک و خواننده و عکس موزیک*/}

        <img src={song.cover}></img>
        <div className={"song-description"}>
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
    </div>);
};

export default SongListItem;