const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

// Playlist
const songs = [
    { name: "songs/song1.mp3", title: "Song 1", artist: "Artist 1" },
    { name: "songs/song2.mp3", title: "Song 2", artist: "Artist 2" },
    
];

let songIndex = 0;

// Load song
function loadSong(song) {
    audio.src = song.name;
    title.textContent = song.title;
    artist.textContent = song.artist;
}

loadSong(songs[songIndex]);

// Play / Pause
playBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
};

// Next
nextBtn.onclick = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
};

// Prev
prevBtn.onclick = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
};

// Update progress
audio.ontimeupdate = () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
};

// Seek
progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
};

// Volume
volume.oninput = () => {
    audio.volume = volume.value;
};

// Format time
function formatTime(time) {
    if (!time) return "0:00";
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Autoplay next song
audio.onended = () => {
    nextBtn.click();
};
