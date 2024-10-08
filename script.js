// Alea Copywrite Dominik Honzak 7/23/2024
const fileStorage = "https://dahonzak.github.io/AleaFiles/";
const files = {
  music:fileStorage+"music.json",
  musicfiles:fileStorage+"music/",
  images:fileStorage+"images/"
};
const youtube = {
  s:"https://youtube.com/embed/",
  e:"?controls=0&autoplay=1&loop=0",
};
const alea = {
  default: fileStorage+"alea/Alea.png"
};
const page = {
  join:document.getElementById("joinButton"),
  player:document.getElementById("player"),
  yplayer:document.getElementById("youtubePlayer"),
  center:document.getElementById("center"),
  audio:document.getElementById("audio"),
  audioControl:document.getElementById("audioControl"),
  vol:document.getElementById("slide"),
  bg:document.getElementById("bg"),
  title:document.getElementById("title"),
  artistName:document.getElementById("Artist"),
  musicName:document.getElementById("Music"),
  volopen:false,
  started:false,
  typeplaying:"mp3"
};

const volume = () => {
  let vol = page.vol.value;
  localStorage.setItem('Volume',''+vol+'');
  page.player.volume = (vol/100);
};
const openVolume = () => {
  if(page.volopen) {
    page.center.style.display = "block";
    page.audioControl.style.display = "none";
    page.audio.innerHTML = '<i class="fa fa-volume-up"></i>';
    page.volopen = false;
  }
  else {
    page.center.style.display = "none";
    page.audioControl.style.display = "block";
    page.audio.innerHTML = "Go Back";
    page.volopen = true;
  }
};
const trackPrep = (track) => {
  let image = alea.default;
  if (track.Image) {
    image = files.images+track.Image;
  }
  page.yplayer.style.display = "none";
  page.bg.style.display = "block";
  page.bg.style.background = "url('"+image+"') fixed no-repeat center center";
  page.bg.style.backgroundSize = "cover";
  page.bg.style.filter = "blur(15px)";
  page.join.innerHTML = '<i class="fa fa-pause"></i>';
  page.artistName.innerHTML = track.Artist;
  page.musicName.innerHTML = track.Name;
  page.title.innerHTML = "Alea | "+track.Name+" - "+track.Artist;
};
const youtubePrep = (track,st) => {
  page.yplayer.style.display = "block";
  page.yplayer.src = youtube.s+track.File+youtube.e+"&start="+st;
  page.bg.style.display = "none";
  page.join.innerHTML = '<i class="fa fa-pause"></i>';
  page.artistName.innerHTML = track.Artist;
  page.musicName.innerHTML = track.Name;
  page.title.innerHTML = "Alea | "+track.Name+" - "+track.Artist;
};
const joinHandler = () => {
  if (!(localStorage.getItem('Volume') === null)) {
    let vol = parseInt(localStorage.getItem('Volume'));
    page.vol.value = vol;
    volume();
  }
  if (page.started) {
    pauseMusic();
  }
  else {
    startMusic();
    page.started = true;
  }
};
const pauseMusic = () => {
  bg.style.filter = "blur(15px) grayscale(100%)";
  joinButton.innerHTML = '<i class="fa fa-play"></i>';
  if (page.typeplaying == "mp3") {
    page.player.pause();
  }
  if (page.typeplaying == "youtube") {
    page.yplayer.src="";
  }
  page.started = false;
};
const startMusic = async () => {
  const playlistResponse = await fetch(files.music);
  const playlistData = await playlistResponse.json();
  const tracks = playlistData.Music;
  try {
    if (!tracks || tracks.length === 0) {
        return;
    }
    const now = new Date();
    const totalSecondsSinceHour = now.getMinutes() * 60 + now.getSeconds();
    const totalPlaylistDuration = tracks.reduce((acc, track) => acc + parseFloat(track.Duration), 0);
    const effectiveTime = totalSecondsSinceHour % totalPlaylistDuration;

    let currentPlaylistPosition = 0;

    for (const track of tracks) {
        const trackDuration = parseFloat(track.Duration);

        if (currentPlaylistPosition + trackDuration > effectiveTime) {
            const trackStartTime = effectiveTime - currentPlaylistPosition;
            page.typeplaying = track.Type;
            if (track.Type == "youtube") {
                youtubePrep(track,trackStartTime);
                setTimeout(startMusic, (trackDuration - trackStartTime)*1000);
            }
            else {
              page.player.src = files.musicfiles + track.File;
              page.player.currentTime = trackStartTime;
              trackPrep(track);
              page.player.play();
            }
            break;
        } else {
            currentPlaylistPosition += trackDuration;
        }
    }
  } catch (error) {
    console.error("Error fetching or playing music:", error);
  }
  page.player.addEventListener('ended', startMusic);
};

page.join.addEventListener('click', joinHandler);