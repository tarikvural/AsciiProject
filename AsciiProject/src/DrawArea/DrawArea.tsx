import './DrawArea.css';
import { useEffect } from 'react';

const DrawArea = ({ imageSrc }: { imageSrc: string }) => {

    useEffect(() => {
        if (imageSrc) {
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            console.log('there was a ctx');
            const img = new Image();
            img.src = imageSrc;

            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }
    }, [imageSrc]);

    return (
        <>
            <div className="draw-area">
                <canvas id="canvas" width='400' height='400'></canvas>
            </div>
        </>
    )   
}

export default DrawArea;