import { useState, useRef } from 'react'
import './App.css'
import ImageInput from './ImageInput/ImageInput'
import DrawArea from './DrawArea/DrawArea'

function App() {
  const AsciiChars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. "
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
    if(!canvasRef.current) return;
    const AsciiArray = AsciiChars.split('');
    const ctx = canvasRef.current.getContext('2d');
    if(!ctx) return;
    const imgData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    console.log(imgData.data.length)
  }

  return (
    <>
      <h1 id='test'>Ascii Art Generator</h1>
      <DrawArea imageSrc={imageSrc} canvasRef={canvasRef}/>
      <ImageInput onChange={handleInputChanged}/>
      <button onClick={convertToAscii}  id='convertButton'>Convert to Ascii</button>
    </>
  )
}



export default App
