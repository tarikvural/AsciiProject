import './ImageInput.css'

function ImageInput ({ onChange } : { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            <input id='fileInput' type="file" accept="image/*" onChange={onChange}/>
            <label htmlFor='fileInput' className='button'>Click to upload Image</label>
        </div>
    )
}

export default ImageInput;