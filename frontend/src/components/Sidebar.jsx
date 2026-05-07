import React from 'react';
import '../styles/sidebar.css';

const Sidebar = ({ memories, currentIndex, onSelectMemory }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-title">
                    BITCOIN <span className="bitcoin-logo">₿</span>
                </h1>
                <h2 className="sidebar-subtitle">MEMORIES</h2>
                <p className="sidebar-tagline">AN ALBUM OF MOMENTS<br />THAT CHANGED MONEY</p>
            </div>

            <div className="playlist-section">
                <h3 className="playlist-title">▶ PLAYLIST</h3>
                <div className="playlist">
                    {memories.map((memory, index) => (
                        <div
                            key={memory.id}
                            className={`playlist-item ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => onSelectMemory(index)}
                        >
                            <span className="item-number">{String(index + 1).padStart(2, '0')}</span>
                            <div className="item-details">
                                <span className="item-date">{memory.date}</span>
                                <span className="item-title">{memory.title}</span>
                                {memory.caption && <span className="item-caption">{memory.caption}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar-footer">
                <p className="memory-count">{memories.length} MEMORIES • ∞ FUTURE</p>
                <div className="vhs-label">VHS</div>
            </div>
        </div>
    );
};

export default Sidebar;