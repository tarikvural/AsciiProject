import { useState, useEffect } from 'react';

interface CharacterSizeAreaProps {
  usedCharacters: string[];
  onSizeChange: (width: number, height: number) => void;
  fontSize: number;
}

function CharacterSizeArea({ usedCharacters, onSizeChange, fontSize }: CharacterSizeAreaProps) {
    const [textWidth, setTextWidth] = useState<number>(0);
    const [textHeight, setTextHeight] = useState<number>(0);

    useEffect(() => {
        const canvas = new OffscreenCanvas(100, 100);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        document.fonts.ready.then(() => {
            ctx.font = `${fontSize}px "Courier Prime", monospace`;
            ctx.fillStyle = 'black';

            let maxWidth = 0;
            let maxHeight = 0;

            usedCharacters.forEach(char => {
                const metrics = ctx.measureText(char);
                maxWidth = Math.max(metrics.actualBoundingBoxRight, maxWidth);
                maxHeight = Math.max(Math.abs(metrics.actualBoundingBoxAscent), maxHeight);
            });

            setTextWidth(maxWidth);
            setTextHeight(maxHeight);
            onSizeChange(maxWidth, maxHeight);
        });
    }, [usedCharacters, onSizeChange]);

    return (
        <>
            <h2>Used Characters</h2>
            <p>{usedCharacters}</p> 
            <p>Number of Characters: {usedCharacters.length}</p>
            <p>Maximum Character Height (Height of each Cell): {textHeight}</p>
            <p>Maximum Character Width (Width of each Cell): {textWidth}</p>
        </>
    );
}

export default CharacterSizeArea;