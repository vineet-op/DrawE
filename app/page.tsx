"use client"

import { Download, CircleIcon, MoveRight, Pencil, RectangleHorizontal, Hand, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Layer, Rect, Stage, Circle, Arrow, Line, Transformer } from "react-konva";
import { useRef, useState } from "react";
import { ACTIONS } from "./actions"
import { v4 as uuidv4 } from "uuid"


interface RectangleProps {
  id: string,
  x: number
  y: number
  height: number
  width: number
  fillColor: string
}

interface CircleProps {
  id?: string,
  x: number
  y: number
  radius: number | string
  fillColor: string
}

interface ArrowProps {

}

export default function Home() {


  const [fillColor, setFillColor] = useState("#FF0000") // Default Red color
  const [strokeColor, setStrokeColor] = useState("#FFFFFF")
  const [action, setAction] = useState(ACTIONS.circle)
  const [rectangles, setRectangles] = useState<RectangleProps[]>([])
  const [circles, setCircles] = useState<CircleProps[]>([])
  const [arrows, setArrows] = useState<{ id: string; points: number[]; strokeColor: string }[]>([]);
  const [lines, setLines] = useState<{ id: string; points: number[]; strokeColor: string }[]>([]);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const transformerRef = useRef<any>(null);

  const StageRef = useRef<any>(null);
  const isPainting = useRef<boolean>(true);
  const currentShapeId = useRef("")

  const onPointerDown = () => {
    if (action === ACTIONS.select) {
      return;
    }

    const stage = StageRef.current
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4()
    currentShapeId.current = id;
    isPainting.current = true;

    switch (action) {

      case ACTIONS.rectangle:
        setRectangles((rectangles) => [
          ...rectangles,
          {
            id,
            x,
            y,
            height: 0,
            width: 0,
            fillColor,
          }
        ])
        break;


      case ACTIONS.circle:
        setCircles((circles) => [
          ...circles,
          {
            id,
            x,
            y,
            radius: 20,
            fillColor,
          }
        ])
        break;

      case ACTIONS.arrow:
        setArrows((arrows) => [
          ...arrows,
          {
            id,
            points: [x, y, x, y],
            strokeColor,
          },
        ]);
        break;

      case ACTIONS.pencil:
        setLines((lines) => [
          ...lines,
          {
            id,
            points: [x, y],
            strokeColor,
          },
        ]);
        break;

    }
  }

  const onPointerMove = () => {
    if (action === ACTIONS.select || !isPainting.current) {
      return;
    }

    const stage = StageRef.current
    const { x, y } = stage.getPointerPosition();


    switch (action) {
      case ACTIONS.rectangle:
        setRectangles((rectangles) => rectangles.map((rectangle) => {
          if (rectangle.id === currentShapeId.current) {
            return {
              ...rectangle,
              width: x - rectangle.x,
              height: y - rectangle.y
            }
          }
          return rectangle;
        }))
        break;

      case ACTIONS.circle:
        setCircles((circles) => circles.map((circle) => {
          if (circle.id === currentShapeId.current) {
            return {
              ...circle,
              radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
            }
          }
          return circle;
        }))
        break;

      case ACTIONS.arrow:
        setArrows((arrows) =>
          arrows.map((arrow) => {
            if (arrow.id === currentShapeId.current) {
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], x, y],
              };
            }
            return arrow;
          })
        );
        break;

      case ACTIONS.pencil:
        setLines((lines) =>
          lines.map((line) => {
            if (line.id === currentShapeId.current) {
              return {
                ...line,
                points: [...line.points, x, y],
              };
            }
            return line;
          })
        );
        break;

    }

  }

  const onPointerUp = () => {
    isPainting.current = false
  }

  const ExportImage = () => {
    if (StageRef.current) { // Added a check to ensure StageRef.current is not null
      const uri = StageRef.current.toDataURL();
      var link = document.createElement('a')
      link.download = "image.png"
      link.href = uri
      document.body.appendChild(link)
      link.click();
      document.body.removeChild(link)
    }
  }

  const isDraggable = action === ACTIONS.select


  const onclick = (e: any) => {
    if (action != ACTIONS.select) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target])
  }

  const ClearCanvas = () => {
    setRectangles([]);
    setCircles([]);
    setArrows([]);
    setLines([]);
  }


  return (
    <main className="w-screen h-screen bg-black/100 overflow-hidden">
      <div className="flex justify-center w-full bg-purple-100 items-center p-3 gap-3">

        <Button className="w-10 h-10 bg-black cursor-pointer hover:bg-purple-500" onClick={() => setAction(ACTIONS.select)}>
          <Hand />
        </Button>

        <Button className="w-10 h-10 bg-black cursor-pointer hover:bg-purple-500" onClick={() => setAction(ACTIONS.rectangle)}>
          <RectangleHorizontal style={{ width: '100%', height: '70%' }} />
        </Button>


        <Button className="w-10 h-10 bg-black cursor-pointer hover:bg-purple-500" onClick={() => setAction(ACTIONS.circle)} >
          <CircleIcon style={{ width: '100%', height: '70%' }} />
        </Button>
        <Button className="w-10 h-10 bg-black cursor-pointer hover:bg-purple-500" onClick={() => setAction(ACTIONS.arrow)} >
          <MoveRight style={{ width: '100%', height: '70%' }} />
        </Button>
        <Button className="w-10 h-10 bg-black cursor-pointer hover:bg-purple-500" onClick={() => setAction(ACTIONS.pencil)} >
          <Pencil style={{ width: '100%', height: '70%' }} />
        </Button>
        <Button className="w-12 h-10 bg-black cursor-pointer hover:bg-purple-500">
          <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
        </Button>

        <Button className="w-10 h-10 bg-black cursor-pointer hover:bg-purple-500" onClick={ClearCanvas} >
          <Trash2 style={{ width: '100%', height: '70%' }} />
        </Button>

        <Button className="w-10 h-10 bg-black cursor-pointer hover:bg-purple-500" onClick={ExportImage}>
          <Download style={{ width: '100%', height: '70%' }} />
        </Button>
      </div>

      {/* Stage */}
      <Stage
        ref={StageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >

        <Layer>
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            stroke={strokeColor}
            strokeWidth={2}
            onClick={() => {
              transformerRef.current.nodes([])
            }}
          />

          {rectangles.map((rectangle) => (
            <Rect
              key={rectangle.id}
              x={rectangle.x}
              y={rectangle.y}
              width={rectangle.width}
              height={rectangle.height}
              fill={rectangle.fillColor}
              stroke={strokeColor}
              strokeWidth={2}
              draggable={isDraggable}
              onDragEnd={(e) => {
                setPosition({
                  x: e.target.x(),
                  y: e.target.y()
                });
              }}
              onMouseEnter={(e) => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                document.body.style.cursor = 'default';
              }}
              onclick={onclick}
            />

          ))}

          {circles.map((circle) => (
            <Circle
              key={circle.id}
              x={circle.x}
              y={circle.y}
              radius={typeof circle.radius === 'number' ? circle.radius : parseFloat(circle.radius)}
              fill={circle.fillColor}
              stroke={strokeColor}
              strokeWidth={2}
              draggable={isDraggable}
              onMouseEnter={(e) => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                document.body.style.cursor = 'default';
              }}
              onclick={onclick}
            />
          ))}

          {arrows.map((arrow) => (
            <Arrow
              key={arrow.id}
              points={arrow.points}
              stroke={arrow.strokeColor}
              strokeWidth={2}
              pointerLength={10}
              pointerWidth={10}
              fill={arrow.strokeColor}
              draggable={isDraggable}
              onMouseEnter={(e) => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                document.body.style.cursor = 'default';
              }}
              onclick={onclick}
            />
          ))}

          {lines.map((line) => (
            <Line
              key={line.id}
              points={line.points}
              stroke={fillColor}
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
              draggable={isDraggable}
              onMouseEnter={(e) => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                document.body.style.cursor = 'default';
              }}
              onclick={onclick}
            />
          ))}

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </main>
  );
}
