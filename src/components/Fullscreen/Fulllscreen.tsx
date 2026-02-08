import React, { useRef, useState } from 'react';

interface ImageWithFullscreenProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFullscreen: React.FC<ImageWithFullscreenProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1); // For zooming
  const [translate, setTranslate] = useState({ x: 0, y: 0 }); // For panning
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Function to enable fullscreen
  const handleFullScreen = () => {
    setIsFullscreen(true);
  };

  // Function to exit fullscreen
  const closeFullScreen = () => {
    setIsFullscreen(false);
    setScale(1); // Reset zoom
    setTranslate({ x: 0, y: 0 }); // Reset panning
  };

  // Handle zoom in and out using mouse wheel
  const handleZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleChange = e.deltaY < 0 ? 0.1 : -0.1; // Zoom in or out
    setScale((prevScale) => Math.min(Math.max(prevScale + scaleChange, 1), 3)); // Limit zoom between 1x and 3x
  };

  // Handle image dragging for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX - translate.x;
    const startY = e.clientY - translate.y;

    const onMouseMove = (moveEvent: MouseEvent) => {
      setTranslate({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      {/* Thumbnail Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} cursor-pointer`}
        onClick={handleFullScreen}
      />

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex justify-center items-center z-50 cursor-pointer"
          onClick={closeFullScreen}
        >
          <div
            ref={imgContainerRef}
            className="w-4/5 h-auto max-h-[80vh] flex justify-center items-center overflow-hidden relative"
            onWheel={handleZoom}
            onMouseDown={handleMouseDown}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-auto object-contain cursor-grab"
              style={{
                transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                transition: 'transform 0.2s ease-in-out',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageWithFullscreen;
