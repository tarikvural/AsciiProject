import './FontInput.css'

interface FontInputProps {
    fontSize: number;
    onFontSizeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  function FontInput({ fontSize, onFontSizeChanged }: FontInputProps) {
    return (
      <div className="input-group">
        <label htmlFor="font-input">Font size</label>
        <input
          type="number"
          id="font-input"
          value={fontSize}
          onChange={onFontSizeChanged}
        />
      </div>
    );
  }
  
  export default FontInput;