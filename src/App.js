import React, { useEffect, useState, useRef} from "react";
import { Stage, Layer, Rect, Text, Line, Shape, Image } from "react-konva";
import Table from "./components/table";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import download from 'downloadjs';


function App() {
  const orange = 'rgb(255, 102, 0)'
  const black = 'rgb(0,0,0)'
  const yellow = 'rgb(255,255,0)'
  const violet = 'rgb(139, 0, 155)'
  const blue = 'rgb(0, 0, 255)'
  const green = 'rgb(0, 255, 0)'

  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const img = new window.Image();
      img.src = './pic.jpg';
      await img.decode();
      setImage(img);
    };

    loadImage();
  }, []);

  const stageRef = useRef(null);

  const saveAsPNG = () => {
      toPng(stageRef.current, { cacheBust: false })
          .then((dataUrl) => {
              const link = document.createElement("a");
              link.download = "my-image-name.png";
              link.href = dataUrl;
              link.click();
          })
          .catch((err) => {
              console.log(err);
          });
  };


  const saveAsJPG = () => {
      htmlToImage
          .toJpeg(stageRef.current, { quality: 0.8 })
          .then(function (dataUrl) {
              download(dataUrl, "drawing.jpg", "image/jpeg");
          })
          .catch(function (error) {
              console.error("Ошибка сохранения в JPG:", error);
          });
  };

  return (
      <div className="App">
        <Stage width={1600} height={2000} ref={stageRef}>
          <Layer>
            <Text text="Заголовок" fontSize={26} />
            <Text text="Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст " fontSize={18} x={20} y={50} />

            <Shape
                x={10}
                y={80}
                sceneFunc={(context, shape) => {
                  context.beginPath();
                  context.moveTo(800, 20);
                  context.lineTo(220, 250);
                  context.quadraticCurveTo(50, 10, 260, 170);
                  context.closePath();

                  context.fillStrokeShape(shape);
                }}

                fill= {orange}
                stroke={black}
                strokeWidth={1}
            />

            <Line
                x={10}
                y={400}
                points={[0, 200, 200, 200, 100, 0]}
                closed
                stroke={black}
                fill= {violet}
            />

            <Line
                x={400}
                y={400}
                points={[0, 300, 200, 300, 100, 0]}
                closed
                stroke={black}
                fill= {yellow}
            />

            <Rect
                x={10}
                y={700}
                width={200}
                height={200}
                fill={blue}
            />

            <Rect
                x={300}
                y={750}
                width={400}
                height={200}
                fill={green}
            />

            <Line

                x={400}
                y={400}
                points={[0, 300, 200, 300, 100, 0]}
                closed
                stroke={black}
                fill= {orange}
            />

            <Table
                rows={5}
                columns={5}
                cellWidth={200}
                cellHeight={100}
            />

            <Image
                x={10}
                y={1600}
                image={image}
                width={400}
                height={400}
            />
          </Layer>
        </Stage>
          <div>
              <button style={{margin: 10}}>Сохранить как SVG</button>
              <button onClick={saveAsJPG} style={{margin: 10}}>Сохранить как JPG</button>
              <button onClick={saveAsPNG} style={{margin: 10}}>Сохранить как PNG</button>
          </div>
      </div>
  );
}

export default App;
