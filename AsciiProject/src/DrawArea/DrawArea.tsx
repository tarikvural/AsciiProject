import './DrawArea.css';
import { useEffect} from 'react';

const DrawArea = ({ imageSrc, canvasRef }: { imageSrc: string,  canvasRef: React.RefObject<HTMLCanvasElement>}) => {


    useEffect(() => {
        if (imageSrc) {
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const img = new Image();
            img.src = imageSrc;

            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
        }
    }, [imageSrc]);

    return (
        <>
            <div className="draw-area">
                <canvas ref={canvasRef} id="canvas" width='200' height='200'></canvas>
            </div>
        </>
    )   
}

export default DrawArea;