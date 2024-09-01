const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.querySelector('.play-pause');
const songPlayedBar = document.querySelector('.song-played');
const songTime = document.querySelector('.song-time');
let isPlaying = false;

playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    playPauseButton.innerHTML = `
      <i class="fa-solid fa-play fa-2xl" style="color: #e0e0e0;"></i>
    `;
  } else {
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.innerHTML = `
      <i class="fa-solid fa-pause fa-2xl" style="color: #e0e0e0;"></i>
    `;
  }
});

audioPlayer.addEventListener('timeupdate', () => {
  const playedPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  songPlayedBar.style.width = `${playedPercentage}%`;
  
  const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
  const currentSeconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
  
  const durationMinutes = Math.floor(audioPlayer.duration / 60);
  const durationSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');
  
  songTime.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
});

audioPlayer.addEventListener('ended', () => {
  isPlaying = false;
  playPauseButton.innerHTML = `
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8.5L26 18L12 27.5V8.5Z" fill="#494949"/>
    </svg>
  `;
  songPlayedBar.style.width = '0%';
  songTime.textContent = `0:00 / ${Math.floor(audioPlayer.duration / 60)}:${Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0')}`;
});
