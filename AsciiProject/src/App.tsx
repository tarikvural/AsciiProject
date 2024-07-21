import { useState } from 'react'
import './App.css'
import ImageInput from './ImageInput/ImageInput'
import DrawArea from './DrawArea/DrawArea'

function App() {
  const [imageSrc, setImageSrc] = useState('')

  function handleInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const fileRead = new FileReader()
    fileRead.readAsDataURL(event.target.files[0]);

    fileRead.onload = () => {
      setImageSrc(fileRead.result as string)
    }
  }

  return (
    <>
      <h1 id='test'>Ascii Art Generator</h1>
      <DrawArea imageSrc={imageSrc}/>
      <ImageInput onChange={handleInputChanged}/>
    </>
  )
}



export default App
