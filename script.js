const audio = document.querySelector('.audio');
const play = document.getElementById('play');

isaudioPlaying = false  //Initially not playing and creating this variables only tracking whether it is playing or not
function playaudio(){
    isaudioPlaying = true
    audio.play();
    play.classList.replace("fa-play","fa-pause");  //Here we change the button to pause after clicking play
}

function pauseaudio(){
    isaudioPlaying = false
    audio.pause();
    play.classList.replace('fa-pause',"fa-play");  //Here we change btn from play to pause
}

play.addEventListener('click',function(){
    if(isaudioPlaying){
        pauseaudio();
    }
    else{
        playaudio();
    }
    
})
const SongList = [
    {
        singername:"Arjit Singh",
        songname:"Phir bhi tumko chahunga",
        info:"Image--1"
    },
    {
        singername:"Imran Khan",
        songname:"Bewafa",
        info:"Image--2"
    },
    {
        singername:"KK",
        songname:"Piya aaye na",
        info:"Image--3"
    }
]

const singer = document.getElementById('singer');
const mysong = document.getElementById('song');
const myImg = document.querySelector('img');
const myAudio = document.querySelector('audio');

function loadsong(song){
    singer.innerText= song.singername;
    mysong.innerText = song.songname;
    myImg.src = `Images/${song.info}.jpg`;
    myAudio.src = `Audios/${song.info}.mp3`;
}

let songIndex = 0;
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');

function nextsong(){
    songIndex ++;
    if(songIndex > SongList.length-1)
    {
        songIndex =0;
    }
    loadsong(SongList[songIndex]); // But we should not give this numbers manually we have to increament or decrement it by for or back
      //Thats why we use let for keep changing the calues of songIndex

    playaudio();

}
forward.addEventListener('click' ,nextsong)

function presong(){
    songIndex --;
    if(songIndex < 0)
    {
        songIndex =SongList.length-1;
    }
    loadsong(SongList[songIndex]); // But we should not give this numbers manually we have to increament or decrement it by for or back
      //Thats why we use let for keep changing the calues of songIndex

    playaudio();

}
backward.addEventListener('click',presong);

const myprogressbar = document.querySelector('.progressbar');
const totaltime = document.getElementById('total-time');
const currDisTime = document.getElementById('current-time');
//Current time as well as the total time
audio.addEventListener('timeupdate' ,function(event){

    //Logic for getting current time as the audio keeps playing as well as total amount of time
    let myCurrenttime = event.srcElement.currentTime;             //this event has all check in console 
    let myDuration = event.srcElement.duration;
    // console.log(myCurrenttime , myDuration);     
    let myPercentage = (myCurrenttime / myDuration) * 100;  //Gives percentage of audio that is played
    // console.log(myPercentage);   myPercentage is nothing but the percentage of played audio
    myprogressbar.style.width = `${myPercentage}%`;
    if(Math.floor(myDuration % 60) < 10){
        totaltime.innerText = `${Math.floor(myDuration/60)}:0${Math.floor(myDuration % 60)}`;
    }
    else
    totaltime.innerText = `${Math.floor(myDuration/60)}:${Math.floor(myDuration % 60)}`;
    
    //By this if we change song the total dur visibles to be NaN so the logic is if song is playing then only display time
    if(Math.floor(myCurrenttime % 60) < 10){
        currDisTime.innerText = `${Math.floor(myCurrenttime/60)}:0${Math.floor(myCurrenttime % 60)}`;
    }
    else
    currDisTime.innerText = `${Math.floor(myCurrenttime/60)}:${Math.floor(myCurrenttime % 60)}`;

})

//------------------------Functionality of clicking on progress bar
const progressbarcontainer = document.querySelector('.progressbar-container');
const progressbar = document.querySelector('.progressbar');

progressbarcontainer.addEventListener('click',function(event){
    // console.log(event);
    const totalWidth = event.srcElement.offsetWidth;
    const clickdistance = event.offsetX;
    progressbar.style.width = `${(clickdistance/totalWidth) * 100}%`;

    audio.currentTime = (clickdistance / totalWidth) * audio.duration;
})