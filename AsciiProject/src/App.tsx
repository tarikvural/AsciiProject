import { useState, useRef } from 'react'
import './App.css'
import ImageInput from './ImageInput/ImageInput'
import DrawArea from './DrawArea/DrawArea'

function App() {
  const AsciiChars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. "
  const [imageSrc, setImageSrc] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    AsciiArray.forEach((char) => {
      console.log(char);
    })
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
