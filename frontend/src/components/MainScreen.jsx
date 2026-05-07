import React from 'react';
import '../styles/main-screen.css';

const MainScreen = ({ memory, currentIndex, totalMemories, isPlaying }) => {
    if (!memory) return null;

    // Format time based on memory index
    const formatTime = (index) => {
        const seconds = (index * 62) % 60;
        const minutes = Math.floor((index * 62) / 60) % 60;
        const hours = Math.floor((index * 62) / 3600);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Format date to display style
    const dateObj = new Date(memory.date);
    const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase();

    return (
        <div className="main-screen">
            <div className="screen-header">
                <div className="rec-indicator">
                    <span className="rec-dot"></span>
                    <span className="rec-text">REC</span>
                </div>
                <div className="time-display">
                    {dateStr}
                    <br />
                    <span className="timestamp">{formatTime(currentIndex)}</span>
                </div>
            </div>

            <div className="screen-video">
                <div className="scanlines"></div>
                <div className="video-content">
                    <div className="image-placeholder">
                        {memory.mediaType === 'video' ? (
                            <div className="video-preview">
                                <div className="video-banner">VIDEO PREVIEW</div>
                                <div className="video-frame">
                                    <div className="video-play-icon">▶</div>
                                </div>
                                <div className="video-caption">{memory.title} — {memory.date}</div>
                            </div>
                        ) : memory.image && memory.image.match(/\.(png|jpe?g|gif)$/i) ? (
                            <img
                                className="memory-image"
                                src={`/assets/thumbnails/${memory.image}`}
                                alt={memory.title}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="placeholder-text">{memory.image || 'No image available'}</div>
                        )}
                    </div>
                    <div className="video-overlay">
                        <h2 className="video-title">{memory.title}</h2>
                        <p className="video-description">{memory.caption}</p>
                    </div>
                </div>
                <div className="tracking-info">
                    <span className="sp-label">SP</span>
                    <span className="tracking-label">TRACKING</span>
                    <div className="tracking-bar"></div>
                </div>
            </div>

            <div className="screen-footer">
                <div className="counter-display">
                    <span className="counter-label">TAPE</span>
                    <span className="counter-value">{String(currentIndex + 1).padStart(2, '0')} / {String(totalMemories).padStart(2, '0')}</span>
                </div>
                <div className="duration-display">
                    <span>DURATION</span>
                    <span className="duration-time">~ 45 MIN</span>
                </div>
            </div>
        </div>
    );
};

export default MainScreen;