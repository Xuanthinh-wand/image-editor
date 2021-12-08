import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import { imageAction } from '../../actions/image';
import _ from 'lodash';

export default function ImageErasePage(props) {
    const { imageStore, imageSetClone } = imageAction();
    const [mainImage] = useImage(imageStore.url, 'Anonymous');
    let canvas, context, eraseEnter, lastPointerPosition;

    const [appLoading, setAppLoading] = useState(false);
    const [defaultSize, setDefaultSize] = useState({
        width: 10,
        height: 10
    })

    const canvasContainerRef = useRef();
    const stageRef = useRef();
    const layerRef = useRef();
    const imgRef = useRef();
    const mouseRef = useRef();

    useEffect(() => {
        if (canvasContainerRef.current) {
            setDefaultSize({
                width: canvasContainerRef.current.offsetWidth,
                height: canvasContainerRef.current.offsetHeight
            })
        }
    }, [canvasContainerRef.current])

    useEffect(() => {
        if (mainImage) {
            setAppLoading(true);

            let height = defaultSize.height;
            let width = defaultSize.height * mainImage.width / mainImage.height;
            let imageDraw = imageStore.imageClone || mainImage;

            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            context = canvas.getContext('2d');
            context.lineWidth = imageStore.eraseBrushSize;
            context.lineCap = "round";
            context.lineJoin = "round";

            context.drawImage(imageDraw, 0, 0, width, height);
            context.globalCompositeOperation = 'destination-out';
            context.globalAlpha = imageStore.eraseBrushOpacity;

            imgRef.current.image(canvas);
            imgRef.current.width(width);
            imgRef.current.height(height);
            layerRef.current.draw();

            imgRef.current.on('mouseover', function () {
                document.body.style.cursor = 'pointer';
            });

            imgRef.current.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });

            stageRef.current.on('mousedown touchstart', function () {
                eraseEnter = true;
                lastPointerPosition = stageRef.current.getPointerPosition();
                if (eraseEnter) {
                    var localPos = {
                        x: lastPointerPosition.x - imgRef.current.x(),
                        y: lastPointerPosition.y - imgRef.current.y(),
                    };

                    context.beginPath();
                    context.moveTo(localPos.x, localPos.y);

                    var pos = stageRef.current.getPointerPosition();
                    localPos = {
                        x: pos.x - imgRef.current.x(),
                        y: pos.y - imgRef.current.y(),
                    };

                    context.lineTo(localPos.x, localPos.y);
                    context.closePath();
                    context.stroke();

                    lastPointerPosition = pos;
                    layerRef.current.batchDraw();
                }
            });

            stageRef.current.on('mouseup touchend', function () {
                eraseEnter = false;
                imageSetClone(imgRef.current.attrs.image);
            });

            stageRef.current.on('mousemove touchmove', function () {
                const position = stageRef.current.getPointerPosition();
                stageRef.current.container().style.cursor = "none"
                mouseRef.current.x(position.x)
                mouseRef.current.y(position.y)
                layerRef.current.batchDraw();
                if (eraseEnter) {
                    var localPos = {
                        x: lastPointerPosition.x - imgRef.current.x(),
                        y: lastPointerPosition.y - imgRef.current.y(),
                    };

                    context.beginPath();
                    context.moveTo(localPos.x, localPos.y);

                    var pos = stageRef.current.getPointerPosition();
                    localPos = {
                        x: pos.x - imgRef.current.x(),
                        y: pos.y - imgRef.current.y(),
                    };

                    context.lineTo(localPos.x, localPos.y);
                    context.closePath();
                    context.stroke();

                    lastPointerPosition = pos;

                    layerRef.current.batchDraw();
                }
            });
            setAppLoading(false);
        }
    }, [mainImage, imageStore.eraseBrushSize, imageStore.eraseBrushOpacity])

    return <div className="erase-area">
        {
            appLoading && <div className="canvas-loading">
                <img className="logo-bounce" src="https://removal.ai/wp-content/uploads/rme/fasion.png" />
            </div>
        }
        <div id="canvasContainerRME" ref={canvasContainerRef}>
            <Stage
                ref={stageRef}
                width={defaultSize.width}
                height={defaultSize.height}>
                <Layer ref={layerRef}>
                    <Image
                        ref={imgRef}
                        image={canvas}
                        width={defaultSize.width}
                        height={defaultSize.height}
                    />
                    <Circle
                        ref={mouseRef}
                        radius={imageStore.eraseBrushSize / 2}
                        fill="transparent"
                        stroke="black"
                        strokeWidth={1}
                    />
                </Layer>
            </Stage>
        </div>
    </div>
}