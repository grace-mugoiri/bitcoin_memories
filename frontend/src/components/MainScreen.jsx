import React, { useEffect, useMemo, useState } from 'react';
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

    const script = useMemo(() => {
        if (memory.script && memory.script.length) return memory.script;
        return [
            `${memory.title.toUpperCase()}`,
            `${memory.caption}`,
            `DATE: ${dateStr}`,
            `A defining moment in Bitcoin history.`,
        ];
    }, [memory, dateStr]);

    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [finishedLines, setFinishedLines] = useState([]);

    useEffect(() => {
        if (isPlaying) {
            setCurrentLineIndex(0);
            setCurrentCharIndex(0);
            setFinishedLines([]);
        }
    }, [memory.id, isPlaying]);

    useEffect(() => {
        if (!isPlaying || script.length === 0) return;
        if (currentLineIndex >= script.length) return;

        const currentLine = script[currentLineIndex];
        let timeoutId;

        if (currentCharIndex < currentLine.length) {
            timeoutId = setTimeout(() => {
                setCurrentCharIndex((prev) => prev + 1);
            }, 40);
        } else {
            timeoutId = setTimeout(() => {
                setFinishedLines((prev) => [...prev, currentLine]);
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, 900);
        }

        return () => clearTimeout(timeoutId);
    }, [isPlaying, script, currentLineIndex, currentCharIndex]);

    const typedLine = script[currentLineIndex] ? script[currentLineIndex].slice(0, currentCharIndex) : '';
    const terminalLines = [...finishedLines, typedLine];
    const showTerminal = isPlaying && script.length > 0;

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
                        {showTerminal ? (
                            <div className="terminal-panel">
                                <div className="terminal-header">bash</div>
                                <div className="terminal-lines">
                                    {terminalLines.map((line, idx) => (
                                        <div key={idx} className="terminal-line">{line || '\u00A0'}</div>
                                    ))}
                                    <div className="terminal-line terminal-cursor">
                                        {typedLine}
                                        <span className="cursor">█</span>
                                    </div>
                                </div>
                            </div>
                        ) : memory.mediaType === 'video' ? (
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
                        {!showTerminal && (
                            <>
                                <h2 className="video-title">{memory.title}</h2>
                                <p className="video-description">{memory.caption}</p>
                            </>
                        )}
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