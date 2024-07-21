import { useState, useRef } from 'react'
import './App.css'
import ImageInput from './ImageInput/ImageInput'
import DrawArea from './DrawArea/DrawArea'
import CharacterSizeArea from './CharacterSizeArea/CharacterSizeArea';

function App() {
  const AsciiChars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. ".split('');
  const [imageSrc, setImageSrc] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let pixelArray = [{r: 0, g: 0, b: 0, a: 0}];

  function handleInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const fileRead = new FileReader()
    fileRead.readAsDataURL(event.target.files[0]);

    fileRead.onload = () => {
      setImageSrc(fileRead.result as string)
    }
  }

  function convertToAscii() {
    for(let i = 0; i < 1000; i+=100){
      console.log(i*7, i*10)
    }
    if(!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if(!ctx) return;
    document.fonts.ready.then(() => {
      console.log('font loaded');
      ctx.font = '12px "Courier Prime", monospace';
      ctx.fillStyle = 'black'; 
    });
    const rows = canvasRef.current.height / 10;
    const columns = canvasRef.current.width / 7;
    const imgData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const grayScaleData = imgData.data;
    /*for(let i = 0; i < imgData.data.length ; i+= 4) {
      const luminance = (0.299 * grayScaleData[i] + 0.587 * grayScaleData[i+1] + 0.114 * grayScaleData[i+2]);
      grayScaleData[i] = luminance;
      grayScaleData[i+1]  = luminance;
      grayScaleData[i+2] = luminance;
    }*/
    ctx.putImageData(imgData,0,0);
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillText("Hello world", 50, 90);
  }

  return (
    <>
      <h1 id='test'>Ascii Art Generator</h1>
      <CharacterSizeArea usedCharacters={AsciiChars}/>
      <DrawArea imageSrc={imageSrc} canvasRef={canvasRef}/>
      <ImageInput onChange={handleInputChanged}/>
      <button onClick={convertToAscii}  id='convertButton'>Convert to Ascii</button>
    </>
  )
}



export default App
