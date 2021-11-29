console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]-320k",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// Create a non-dom allocated Audio element
var audio = document.createElement("audio");

function getDuration(src, cb) {
  var audio = new Audio();
  $(audio).on("loadedmetadata", function () {
    cb(audio.duration);
  });
  audio.src = src;
}

// Get Audio duration for minseconds
function getSeconds(seconds, idname) {
  var hour = parseInt(seconds / 3600);
  var min = parseInt((seconds % 3600) / 60);
  var sec = seconds % 60;
  let padTime =
    String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  //   document.getElementById("duration").innerHTML = hour + ":" + min + ":" + sec;
  //   document.getElementsByClassName(classname).innerHTML = padTime;
  document.querySelector(idname).innerHTML = padTime;
}

// let fileLength = songs.length;
// console.log(fileLength);
// let num = 0;
// while (num < fileLength) {
//   console.log(songs[num].filePath);
//   num++;
// }

// for (let j = 0; j < 10; j++) {
//   console.log(songs[j].filePath);
//     getDuration(firepath[j].coverPath, function (length) {
//       getSeconds(parseInt(length), ".timestamp" + String(j + 1));
//     });
// }

// getDuration("songs/2.mp3", function (length) {
//   getSeconds(parseInt(length), ".timestamp");
// });

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  // console.log(songs[i].filePath);
  getDuration(songs[i].filePath, function (length) {
    getSeconds(parseInt(length), "#timestamp" + String(i));
  });
  //   element.getElementsByClassName("timestamp")[0].innerText =

  //   console.log(element.getElementsByClassName("timestamp")[0].innerText);
});

// Handle play/pause click
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
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
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
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
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
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
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
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

// Add a change event listener to the file input
// document.getElementById("fileinput").addEventListener(
//   "change",
//   function (event) {
//     var target = event.currentTarget;
//     var file = target.files[0];
//     var reader = new FileReader();

//     if (target.files && file) {
//       var reader = new FileReader();

//       reader.onload = function (e) {
//         audio.src = e.target.result;
//         audio.addEventListener(
//           "loadedmetadata",
//           function () {
//             // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
//             var duration = audio.duration;

//             // example 12.3234 seconds
//             console.log(
//               "The duration of the song is of: " + duration + " seconds"
//             );
//             // Alternatively, just display the integer value with
//             // parseInt(duration)
//             // 12 seconds
//           },
//           false
//         );
//       };

//       reader.readAsDataURL(file);
//     }
//   },
//   false
// );
