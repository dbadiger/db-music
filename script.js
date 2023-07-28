console.log("Welcome to DB Spotify Clone");

//Initialize Varibles
let songIndex = 0;
let audioElement = new Audio("mysongs/song1.m4a");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Warriyo",
    filePath: "mysongs/1.mp3",
    coverPath: "cover_images/1.jpg ",
  },
  {
    songName: "Huma Huma",
    filePath: "mysongs/2.mp3",
    coverPath: "cover_images/2.jpg ",
  },
  {
    songName: "Invincible",
    filePath: "mysongs/3.mp3",
    coverPath: "cover_images/3.jpg ",
  },
  {
    songName: "My Heart",
    filePath: "mysongs/4.mp3",
    coverPath: "cover_images/4.jpg ",
  },
];

songItems.forEach((element, index) => {
  //   console.log(element, index);
  element.getElementsByTagName("img")[0].src = songs[index].coverPath;
  element.getElementsByClassName("songName")[0].innerText =
    songs[index].songName;
});
//audioElement.play();

//Listen to Events

//Handle Play-Pause CLick
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  //   console.log("time Update");
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  //   console.log(progress);
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target);
      makeAllPlays();
      songIndex = parseInt(e.target.id);

      if (e.target.paused) {
        audioElement.play();
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
      } else {
        audioElement.pause();
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        gif.style.opacity = 0;
      }

      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `mysongs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 3) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `mysongs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `mysongs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
