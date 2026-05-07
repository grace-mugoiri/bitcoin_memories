import React from 'react';
import '../effects/scanlines.css';

const MemorySlide = ({ memory }) => {
    if (!memory) return null;

    return (
        <div className="memory-slide">
            <div className="vhs-container">
                <div className="tape-label">
                    <span className="tape-text">{memory.title.toUpperCase()}</span>
                </div>

                <div className="screen-frame">
                    <div className="scanlines"></div>
                    <div className="content">
                        <div className="date-display">{memory.date}</div>
                        <div className="image-placeholder">
                            {memory.image}
                        </div>
                        <div className="title-text">{memory.title}</div>
                        <div className="caption-text">{memory.caption}</div>
                    </div>
                </div>

                <div className="controls">
                    <div className="control-label">REC</div>
                    <div className="control-label">PLAY</div>
                    <div className="control-label">STOP</div>
                </div>
            </div>
        </div>
    );
};

export default MemorySlide;