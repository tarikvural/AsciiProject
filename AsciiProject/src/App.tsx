import React, { useState, useRef, useCallback } from 'react'
import './App.css'
import ImageInput from './ImageInput/ImageInput'
import DrawArea from './DrawArea/DrawArea'
import CharacterSizeArea from './CharacterSizeArea/CharacterSizeArea';

function App() {
  const asciiChars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ".split('').reverse();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [cellWidth, setCellWidth] = useState<number>(10);
  const [cellHeight, setCellHeight] = useState<number>(10);
  const [fontSize, setFontSize] = useState<number>(8);
  
  function handleInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    
    const fileRead = new FileReader();
    fileRead.readAsDataURL(event.target.files[0]);

    fileRead.onload = () => {
      const img = new Image();
      img.src = fileRead.result as string;

      img.onload = () => {
        if (canvasRef.current) {
          setImage(img);
          setCanvasWidth(img.width);
          setCanvasHeight(img.height);
        }
      }
    }
  }

  const handleSizeChange = useCallback((width: number, height: number) => {
    console.log('Size changed:', width, height);
    setCellWidth(width);
    setCellHeight(height);
  }, []);

  function convertToAscii() {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    console.log('Canvas dimensions:', canvasWidth, canvasHeight);

    if (cellWidth === 0 || cellHeight === 0) return;

    const columns = Math.floor(canvasWidth / cellWidth);
    const rows = Math.floor(canvasHeight / cellHeight);

    const imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixelData = imgData.data;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = "white";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        let totalBrightness = 0;
        let pixelCount = 0;

        for (let cellY = 0; cellY < cellHeight; cellY++) {
          for (let cellX = 0; cellX < cellWidth; cellX++) {
            const pixelX = x * cellWidth + cellX;
            const pixelY = y * cellHeight + cellY;

            if (pixelX < canvasWidth && pixelY < canvasHeight) {
              const i = (pixelY * canvasWidth + pixelX) * 4;
              const r = pixelData[i];
              const g = pixelData[i + 1];
              const b = pixelData[i + 2];
              const brightness = (r + g + b) / 3;
              totalBrightness += brightness;
              pixelCount++;
            }
          }
        }

        const averageBrightness = totalBrightness / (pixelCount * 255);
        const asciiIndex = Math.floor((1 - averageBrightness) * (asciiChars.length - 1));
        const asciiChar = asciiChars[asciiIndex];
        ctx.fillText(asciiChar, x * cellWidth, y * cellHeight);
      }
    }
  }

  return (
    <>
      <h1 id='title'>ASCII Art Generator</h1>
      <DrawArea 
        image={image} 
        canvasRef={canvasRef}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <div className='button-group'>
        <ImageInput onChange={handleInputChanged}/>
        <button className='button' onClick={convertToAscii} id='convertButton'>Convert to ASCII</button>
      </div>
      <div className='input-group'>
        <label htmlFor='font-input'>Font size</label>
        <input type='number' id='font-input'/>
      </div>
      <CharacterSizeArea 
        usedCharacters={asciiChars} 
        onSizeChange={handleSizeChange}
        fontSize = {fontSize}
      />
    </>
  )
}

export default App