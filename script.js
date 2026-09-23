const audioPlayer = document.getElementById("audio");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress");
const volumeControl = document.getElementById("volume");

const trackTitle = document.getElementById("title");
const artistName = document.getElementById("artist");
const currentTimeText = document.getElementById("current");
const totalDurationText = document.getElementById("duration");

const playlist = [
    { src: "songs/song1.mp3", title: "Song 1", artist: "Artist 1" },
    { src: "songs/song2.mp3", title: "Song 2", artist: "Artist 2" }
];

let currentTrackIndex = 0;

function loadTrack(track) {
    audioPlayer.src = track.src;
    trackTitle.textContent = track.title;
    artistName.textContent = track.artist;
}

loadTrack(playlist[currentTrackIndex]);

playButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playButton.textContent = "▶";
    }
});

nextButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(playlist[currentTrackIndex]);
    audioPlayer.play();
});

prevButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(playlist[currentTrackIndex]);
    audioPlayer.play();
});

audioPlayer.addEventListener("timeupdate", () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;

    currentTimeText.textContent = formatTime(audioPlayer.currentTime);
    totalDurationText.textContent = formatTime(audioPlayer.duration);
});

progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value;
});

function formatTime(time) {
    if (!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

audioPlayer.addEventListener("ended", () => {
    nextButton.click();
});
