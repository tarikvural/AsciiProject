import React, { useState, useRef, useCallback } from 'react'
import './App.css'
import ImageInput from './ImageInput/ImageInput'
import DrawArea from './DrawArea/DrawArea'
import CharacterSizeArea from './CharacterSizeArea/CharacterSizeArea';

function App() {
  const AsciiChars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. ".split('');
  const [imageSrc, setImageSrc] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cellWidth, setCellWidth] = useState<number>(0);
  const [cellHeight, setCellHeight] = useState<number>(0);
  
  function handleInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const fileRead = new FileReader()
    fileRead.readAsDataURL(event.target.files[0]);

    fileRead.onload = () => {
      setImageSrc(fileRead.result as string)
    }
  }

  const handleSizeChange = useCallback((width: number, height: number) => {
    console.log('Size changed:', width, height);
    setCellWidth(width);
    setCellHeight(height);
  }, []);

  function convertToAscii() {
    console.log('Convert to ASCII called');
    console.log('Cell dimensions:', cellWidth, cellHeight);

    if (!canvasRef.current) {
      console.log('Canvas ref is null');
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      console.log('Could not get 2D context');
      return;
    }

    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    console.log('Canvas dimensions:', canvasWidth, canvasHeight);

    if (cellWidth === 0 || cellHeight === 0) {
      console.log('Cell dimensions are zero');
      return;
    }

    const rows = Math.floor(canvasHeight / cellHeight);
    const columns = Math.floor(canvasWidth / cellWidth);

    console.log('Grid:', rows, 'rows by', columns, 'columns');

    const imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const grayScaleData = new Uint8ClampedArray(imgData.data);

    // Convert to grayscale
    for (let i = 0; i < grayScaleData.length; i += 4) {
      const luminance = 0.299 * grayScaleData[i] + 0.587 * grayScaleData[i+1] + 0.114 * grayScaleData[i+2];
      grayScaleData[i] = grayScaleData[i+1] = grayScaleData[i+2] = luminance;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.font = `${cellHeight}px "Courier Prime", monospace`;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        let blockLuminance = 0;
        let pixelCount = 0;

        // Calculate average luminance for each cell block
        for (let y = 0; y < cellHeight; y++) {
          for (let x = 0; x < cellWidth; x++) {
            const pixelX = col * cellWidth + x;
            const pixelY = row * cellHeight + y;
            
            if (pixelX < canvasWidth && pixelY < canvasHeight) {
              const index = (pixelY * canvasWidth + pixelX) * 4;
              blockLuminance += grayScaleData[index];
              pixelCount++;
            }
          }
        }

        if (pixelCount > 0) {
          const averageLuminance = blockLuminance / pixelCount;
          const charIndex = Math.floor((averageLuminance / 255) * (AsciiChars.length - 1));
          const asciiChar = AsciiChars[charIndex];
          
          ctx.fillText(asciiChar, col * cellWidth, (row + 1) * cellHeight);
        }

        console.log(`Block (${row}, ${col}): Average Luminance = ${blockLuminance / pixelCount}`);
      }
    }

    console.log('Conversion complete');
  }

  return (
    <>
      <h1 id='test'>Ascii Art Generator</h1>
      <CharacterSizeArea 
        usedCharacters={AsciiChars} 
        onSizeChange={handleSizeChange}
      />
      <DrawArea imageSrc={imageSrc} canvasRef={canvasRef}/>
      <ImageInput onChange={handleInputChanged}/>
      <button onClick={convertToAscii} id='convertButton'>Convert to Ascii</button>
    </>
  )
}

export default App