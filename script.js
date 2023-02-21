console.log("WELCOME");

//Initializing Variables
let songIndex=0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let songItems=Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');


let songs=[
    {songName: "Bekhyali" ,filePath: "songs/1.mp3",coverPath: "covers/1.jpeg"},
    {songName: "Dil galti kr baitha" ,filePath: "songs/2.mp3",coverPath: "covers/2.jpeg"},
    {songName: "Har har Shambhu" ,filePath: "songs/3.mp3",coverPath: "covers/3.jpeg"},
    {songName: "Jhoome jo pathan" ,filePath: "songs/4.mp3",coverPath: "covers/4.jpeg"},
    {songName: "Kahani Suno" ,filePath: "songs/5.mp3",coverPath: "covers/5.jpeg"},
    {songName: "Kesariya" ,filePath: "songs/6.mp3",coverPath: "covers/6.jpeg"},
    {songName: "Maan meri jaan" ,filePath: "songs/7.mp3",coverPath: "covers/7.jpeg"},
    {songName: "Mai khiladi tu anari" ,filePath: "songs/8.mp3",coverPath: "covers/8.jpeg"},
    {songName: "Malang Sajna" ,filePath: "songs/9.mp3",coverPath: "covers/9.jpeg"},
    {songName: "Nadiyon Paar" ,filePath: "songs/10.mp3",coverPath: "covers/10.jpeg"},
    {songName: "Pyaar Hota kai baar hai" ,filePath: "songs/11.mp3",coverPath: "covers/11.jpeg"},
]



songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    
})



//Handle play/pause clicks
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-pause");
        gif.style.opacity=0;
    }
})


//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //Update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-circle-play');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-pause");
        
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=10)
    {
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-pause");
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-pause");
})
