import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, Search } from "lucide-react";

export default function EnhancedMusicPlayer() {
  const audioPlayer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioPlayer.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(formatTime(audio.duration));
        setVolume(audio.volume);
      };
      
      const setAudioTime = () => {
        setCurrentTime(formatTime(audio.currentTime));
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      
      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      
      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
      };
    }
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioPlayer.current.volume = newVolume;
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center p-8">
      <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 w-full max-w-4xl shadow-2xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Sune.
          </h1>
          <nav className="hidden md:flex space-x-6">
            {["Artists", "Songs", "Trending", "All"].map((item) => (
              <motion.button
                key={item}
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
          </nav>
          <motion.button
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-6 h-6" />
          </motion.button>
        </header>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-xl text-purple-400 mb-2">MORGANIA</h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              AUXJACK-MELLOW
            </h1>
            <p className="text-gray-300 mb-6">
              The one and only returns this fall with a journey into the soul.
            </p>
            <motion.button 
              className="py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See full album
            </motion.button>
          </div>
          <motion.div 
            className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="./MEDUSA1.jpeg" 
              alt="Album Cover" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="relative w-full h-1 bg-gray-600 rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'tween', ease: 'linear' }}
            />
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="bg-purple-600 rounded-full p-3 text-white hover:bg-purple-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </motion.button>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="text-gray-400 w-5 h-5" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={changeVolume}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <audio 
          ref={audioPlayer} 
          src="./Auxjack - Mellow Soul.mp3"
          preload="metadata"
        />
      </div>
    </div>
  );
}