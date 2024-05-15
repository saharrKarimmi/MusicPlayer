import React, {useEffect, useRef, useState} from 'react';
import {IoMdPlay} from "react-icons/io";
import {TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled} from "react-icons/tb";
import {FaPause} from "react-icons/fa";

const Player = ({currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, setSonges}) => {
        const [songInfo, setSongInfo] = useState({
            // ما یک استیت داریم که یک ابجکت دو قسمتی برای مقدار اولیه خود دارد یکی برای زمان کل انگ و یکی هم زمان شمار
            currentTime: 0, duration: 0, animationPercentage: 0
        })
        useEffect(() => {
            const newSongs = songs.map((item) => {
                if (item.id === currentSong.id) {
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
        }, [currentSong]);


        const audioRef = useRef(null)

        const playSong = () => {
            console.log("is", audioRef)

            if (isPlaying) {
                audioRef.current.pause();
                // ج=مله زیر یعنی حتی مقدار ذخیره شده را برعکس کن اگر true هست false شود  و بالعکس

                setIsPlaying(!isPlaying)
            } else {
                // با این خط پایین play شدن موزیک را انجام دادیم که current را خود console.log به ما بازگشت داده است

                audioRef.current.play();
                setIsPlaying(!isPlaying)
            }
        }

        const timeUpdateHandler = (e) => {

            // زمان هایی از اهنگ را ب ما بر میگرداند و از داخل لاگ گرفتن این ها را پیدا کردیم
            // console.log(e.target.currentTime);
            // console.log(e.target.duration)
            // (تکه کد زیر) دوره استریت اپراتور ها یک روش خیلی خوب و خلاصع برای update کردن  برای ارایه هم داریم این را

            const currentTime = e.target.currentTime;
            const duration = e.target.duration;

            //calculate percentage
            const roundCurrent = Math.round(currentTime)
            const roundDuration = Math.round(duration)
            const animationper = Math.round((roundCurrent / roundDuration) * 100)
            if (currentTime === duration) {
                const currentIndex = songs.findIndex((item) => item.id === currentSong.id);
                if (currentIndex === (songs.length - 1)) {
                    setCurrentSong(songs[0])
                } else {
                    setCurrentSong(songs[currentIndex + 1])
                }playSong()
            }
            setSongInfo({
                ...songInfo,
                currentTime: currentTime,
                duration: duration,
                animationPercentage: animationper
            })

            // در تکه کد بالا در ورژن جدید جاوا اسکریپت وقتی دو طرف : دو نقطه یکسان باشد برای سادگی متوان یک طرف را حذف کرد مثلا فقط یک currentTime بنویسیم و نیاز نیست دو نقطه و طرف مقابل دونقطه را بگذاریم.


        }
        const timeFormat = (time) => {

            return (// تکه کد پایین برای تبدیل میلی ثانیه به ثانیه

                Math.floor(time / 60) + ':' + ("0" + Math.floor(time % 60)).slice(-2))
        }
        const dragHandeler = (e) => {

            // console.log("is2",e.target.value)

            audioRef.current.currentTime = e.target.value
            setSongInfo({...songInfo, currentTime: e.target.value})
        }
        const skipSong = (direction) => {
            const currentIndex = songs.findIndex((item) => item.id === currentSong.id);
            if (direction === "next") {
                if (currentIndex === (songs.length - 1)) {
                    setCurrentSong(songs[0])
                } else {
                    setCurrentSong(songs[currentIndex + 1])
                }
            }
            if (direction === "back") {
                if (currentIndex === 0) {
                    setCurrentSong(songs[(songs.length - 1)])
                } else {
                    setCurrentSong(songs[currentIndex - 1])
                }

            }
        }
        // add the styles
        const trackAnimation = {
            transform: `translateX(${songInfo.animationPercentage}%)`
        }

        return (<div className={"player"}>
            {/*برای خود موزیک*/}
            <div className={"time-control"}>

                {/* در تکه کد زیر تابع timeFormat را به عنوان ورودی داده ایم و به همین علیت فرمت های زیر چنین است*/}

                <p>{timeFormat(songInfo.currentTime)}</p>

                {/*مقادیر این input وابستس به state به اینجور lnput ها میگویند contoroled input اگر مقادیر input به statr وابسته نباشد میگویند oncontorol*/}
                <div className={"track"}
                     style={{background: `linear-gradient(to right , ${currentSong.color[0]},${currentSong.color[1]})`}}>
                    <input type={"range"} min={0} max={songInfo.duration || 0} value={songInfo.currentTime}
                           step={10}
                           onChange={dragHandeler}/>
                    <div style={trackAnimation} className={"animate-track"}></div>
                </div>
                <p>{timeFormat(songInfo.duration)}</p>
            </div>

            {/*دکمه های پلی و عقب و جلو و...*/}

            <div className={"play-control"}>
                <TbPlayerTrackPrevFilled onClick={() => skipSong("back")} className={"skip-back "}/>

                <div onClick={playSong} className={"play"}>
                    {isPlaying ? < FaPause/> : <IoMdPlay/>}
                </div>

                <TbPlayerTrackNextFilled onClick={() => skipSong("next")} className={"skip-forward"}/>
            </div>
            <div>

                {/*ما به کمک useRef توانستیم به این االمان خود یک id منحصر به فرد نسبت دهیم.*/}
                {/*onTimeUpdate یک event داخل audio است و با ان یک تابع را فراخوانی یکنیم که زمانش اپدیت و بروز شود*/}
                {/*onloadedMetadata برای این است ک وقتی اهنگ لود میشود و می اید زمان کل اهنگ ب صورت خودکار نشان داده شود و نیازی ب زدن دکه پلی حتما نباشد */}

                <audio onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}
                       onTimeUpdate={timeUpdateHandler}></audio>
            </div>
        </div>);
    }
;

export default Player;