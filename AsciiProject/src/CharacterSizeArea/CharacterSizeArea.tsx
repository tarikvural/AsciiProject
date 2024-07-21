import { useState, useEffect } from 'react';

function CharacterSizeArea({ usedCharacters }: { usedCharacters: string[] }) {
    const [textWidth, setTextWidth] = useState<number>(0);
    const [textHeight, setTextHeight] = useState<number>(0);

    useEffect(() => {
        const canvas = new OffscreenCanvas(100, 100);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        document.fonts.ready.then(() => {
            ctx.font = '12px "Courier Prime", monospace';
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
        });
    }, [usedCharacters]);

    return (
        <>
            <h2>Used Characters</h2>
            <p>{usedCharacters}</p> 
            <p>Number of Characters: {usedCharacters.length}</p>
            <p>Character Height: {textHeight}</p>
            <p>Character Width: {textWidth}</p>
        </>
    );
}

export default CharacterSizeArea;
