import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainScreen from './components/MainScreen';
import ControlBar from './components/ControlBar';
import memoriesData from './data/memories.json';

function App() {
    const [currentMemory, setCurrentMemory] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const goToNext = () => {
        setCurrentMemory((prev) => (prev === memoriesData.length - 1 ? 0 : prev + 1));
    };

    const goToPrevious = () => {
        setCurrentMemory((prev) => (prev === 0 ? memoriesData.length - 1 : prev - 1));
    };

    const handleSelectMemory = (index) => {
        setCurrentMemory(index);
        setIsPlaying(true);
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    return (
        <div className="App">
            <Sidebar
                memories={memoriesData}
                currentIndex={currentMemory}
                onSelectMemory={handleSelectMemory}
            />

            <div className="main-content">
                <MainScreen
                    memory={memoriesData[currentMemory]}
                    currentIndex={currentMemory}
                    totalMemories={memoriesData.length}
                    isPlaying={isPlaying}
                />

                <ControlBar
                    isPlaying={isPlaying}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onRewind={goToPrevious}
                    onFastForward={goToNext}
                />
            </div>
        </div>
    );
}

export default App;