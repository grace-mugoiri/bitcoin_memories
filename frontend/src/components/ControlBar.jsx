import React from 'react';
import '../styles/control-bar.css';

const ControlBar = ({ isPlaying, onPlay, onPause, onRewind, onFastForward }) => {
    return (
        <div className="control-bar">
            <button className="control-btn play-btn" onClick={onPlay} title="Play">
                <span className="play-icon">▶</span>
                <span className="control-label">PLAY</span>
            </button>

            <button className="control-btn rewind-btn" onClick={onRewind} title="Rewind">
                <span className="rewind-icon">⏮</span>
                <span className="control-label">REW</span>
            </button>

            <div className="tape-reel">
                <div className="reel reel-left"></div>
                <div className="tape-cassette">
                    <span className="cassette-label">BITCOIN MEMORIES</span>
                    <span className="cassette-sublabel">A VHS ARCHIVE</span>
                </div>
                <div className="reel reel-right"></div>
            </div>

            <button className="control-btn fastforward-btn" onClick={onFastForward} title="Fast Forward">
                <span className="fastforward-icon">⏭</span>
                <span className="control-label">FF</span>
            </button>

            <button className="control-btn pause-btn" onClick={onPause} title="Pause">
                <span className="pause-icon">⏸</span>
                <span className="control-label">PAUSE</span>
            </button>
        </div>
    );
};

export default ControlBar;