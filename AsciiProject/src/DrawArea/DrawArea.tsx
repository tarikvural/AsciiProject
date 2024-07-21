import './DrawArea.css';
import { useEffect} from 'react';

interface drawAreaProps {
    image: HTMLImageElement | null;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvasWidth: number;
    canvasHeight: number;
}

const DrawArea = ({ image, canvasRef, canvasWidth, canvasHeight }: drawAreaProps) => {


    useEffect(() => {
        if (image) {
            console.log('my image was changed');
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        }
    }, [image,canvasWidth, canvasHeight]);

    return (
        <>
            <div className="draw-area">
                <canvas ref={canvasRef} id="canvas" width={canvasWidth} height={canvasHeight}></canvas>
            </div>
        </>
    )   
}

export default DrawArea;