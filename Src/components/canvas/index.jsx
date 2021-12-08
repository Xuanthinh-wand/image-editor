import React, { useContext, useRef, useEffect, useState } from 'react';
import { Stage, Layer, Group, Rect, Image, Transformer, Text, Path } from 'react-konva';
import { downloadURI } from '../../lib/imageHelper';
import { isTextObject, isShapeObject } from '../../lib/textHelper';
import useImage from 'use-image';

import { appAction } from '../../actions/app';
import { templateAction } from '../../actions/template';
import { backgroundAction } from '../../actions/background';
import { imageAction } from '../../actions/image';
import { textAction } from '../../actions/text';
import { shapeAction } from '../../actions/shape';
import { Menu } from '../../constants/menu';
import _ from 'lodash';

export default function CanvasPage(props) {
    //Init action
    const { appStore, appExportImage, appInitHistory, appSetHistory, appUpdateWorkspace, appChangeMenu } = appAction();
    const { textStore, textSetSelected, textUpdate } = textAction();
    const { shapeStore, shapeSetSelected } = shapeAction();
    const { templateStore, } = templateAction();
    const { backgroundStore, backgroundSetState } = backgroundAction();
    const { imageStore, imageSetState, imageSetX, imageSetY, imageSetWidth, imageSetHeight, imageSetScaleX, imageSetScaleY, imageSetRotation } = imageAction();

    //State
    const [selectedObj, setSelectedObj] = useState(null);
    const [appLoading, setAppLoading] = useState(false);

    //Ref
    const canvasContainerRef = useRef();
    const stageRef = useRef();
    const layerRef = useRef();
    const groupRef = useRef();
    const backgroundRef = useRef();
    const imgRef = useRef();
    const transRef = useRef();

    let backgroundState = backgroundStore, imageState = imageStore, textState = textStore, templateState = templateStore;
    let elements = [];
    if (appStore.appHistory[appStore.appHistoryStep]) {
        let currentState = appStore.appHistory[appStore.appHistoryStep];
        let elIndex = currentState['elements'];
        elements = elIndex;
        backgroundState = currentState['background'];
        imageState = currentState['image'];
        textState = currentState['text'];
        templateState = currentState['template'];
        if (currentState['text'].items.length < 1) {
            if (isTextObject(selectedObj)) {
                setSelectedObj(null);
            }
        } else {
            if (isTextObject(selectedObj)) {
                const isSelectTextDeleted = currentState['text'].items.filter(item => item.id == selectedObj);
                !isSelectTextDeleted.length && setSelectedObj(null);
            }
        }
    }

    // coord for workspace
    const coordX = (appStore.workspaceWidth - templateState.defaultWidth) / 2;
    const coordY = (appStore.workspaceHeight - templateState.defaultHeight) / 2;

    useEffect(() => {
        if (appStore.appExportFire) {
            if (backgroundState.fill == 'transparent') {
                backgroundRef.current.fill('transparent');
                backgroundRef.current.fillPatternImage(null);
                backgroundRef.current.cache();
                layerRef.current.draw();
            }
            setSelectedObj(null);
            transRef.current.nodes([]);
            const ratio = templateStore.exportWidth / templateStore.defaultWidth;
            const dataURL = groupRef.current.toDataURL({ pixelRatio: ratio });
            downloadURI(dataURL, `Removal-${(new Date()).getMilliseconds()}.png`);
            if (backgroundState.fill == 'transparent') {
                setBackgroundPattern();
            }
            appExportImage();
        }
    }, [appStore.appExportFire])

    useEffect(() => {
        if (imageStore.imageClone) {
            const width = imgRef.current.width();
            const height = imgRef.current.height();
            imgRef.current.image(imageStore.imageClone);
            imgRef.current.width(width);
            imgRef.current.height(height);
            transRef.current.enabledAnchors(['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right']);
            transRef.current.nodes([imgRef.current]);
            layerRef.current.draw();
        }
    }, [imageStore.useImageClone])

    useEffect(() => {
        transRef.current.enabledAnchors(['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right']);
        if (selectedObj) {
            if (selectedObj == imgRef.current) {
                appChangeMenu(Menu.find(item => item.key == "image"));
                transRef.current.nodes([selectedObj]);
            }
            else if (selectedObj == backgroundRef.current && backgroundStore.fill) {
                appChangeMenu(Menu.find(item => item.key == "background-color"));
                transRef.current.nodes([]);
            }
            else if (selectedObj == backgroundRef.current && backgroundStore.image) {
                appChangeMenu(Menu.find(item => item.key == "background"));
                transRef.current.nodes([]);
            }
            // This is id of text
            else if (isTextObject(selectedObj)) {
                const selectedText = stageRef.current.findOne(`#${selectedObj}`);
                appChangeMenu(Menu.find(item => item.key == "text"));
                textSetSelected(selectedText.attrs);
                transRef.current.enabledAnchors(['middle-left', 'middle-right']);
                transRef.current.nodes([selectedText]);
            }
            // This is id of shape
            else if (isShapeObject(selectedObj)) {
                const selectedShape = stageRef.current.findOne(`#${selectedObj}`);
                appChangeMenu(Menu.find(item => item.key == "shape"));
                shapeSetSelected(selectedShape.attrs);
                transRef.current.enabledAnchors(['top-left', 'top-right', 'bottom-left', 'bottom-right']);
                transRef.current.nodes([selectedShape]);
            }
            else {
                setSelectedObj(null)
            }
        } else {
            transRef.current.nodes([]);
        }
    }, [selectedObj])

    useEffect(() => {
        if (imageStore.url) {
            let img = new window.Image();
            img.onload = function () {
                console.log(img)
                imgRef.current.image(img)
                let ratio;
                if (img.height > img.width) {
                    ratio = templateStore.defaultHeight / img.height;
                } else {
                    ratio = templateStore.defaultWidth / img.width;
                }
                imageState = imageStore;
                imageState.x = coordX;
                imageState.y = coordY;
                imageState.scaleX = ratio;
                imageState.scaleY = ratio;
                imageState.width = img.width;
                imageState.height = img.height;
                imageSetState(imageState);

                if (!appStore.appHistory.length) {
                    backgroundState = backgroundStore;
                    backgroundState.id = 'background';
                    backgroundState.type = 'rect';
                    imageState.type = 'image';
                    imageState.id = 'image';

                    const initHistoryState = {
                        'image': imageState,
                        'background': backgroundState,
                        'text': textStore,
                        'template': templateStore,
                        'elements': [imageState.id, ...textStore.items.map(text => text.id)]
                    };

                    appInitHistory(initHistoryState);
                }
            }
            img.crossOrigin = 'Anonymous';
            img.src = imageStore.url;
        }
    }, [imageStore.url])

    useEffect(() => {
        if (imageStore.moveImage.type == "up") {
            imgRef.current.moveUp();
            let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
            const imgIndex = historyState['elements'].findIndex(el => el == imgRef.current.id());
            if (imgIndex < historyState['elements'].length - 1) {
                historyState['elements'] = sortIndex(historyState['elements'], imgIndex, 'up');
                appSetHistory(historyState);
            }
        }
        if (imageStore.moveImage.type == "down") {
            imgRef.current.moveDown();
            let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
            const imgIndex = historyState['elements'].findIndex(el => el == imgRef.current.id());
            if (imgIndex > 0) {
                historyState['elements'] = sortIndex(historyState['elements'], imgIndex, 'up');
                appSetHistory(historyState);
            }
        }

        backgroundRef.current.moveToBottom();
        transRef.current.moveToTop();
    }, [imageStore.moveImage])

    useEffect(() => {
        imgRef.current.setAttrs({ ...imageStore.shadow })
        imgRef.current.clearCache();
        imgRef.current.cache();
    }, [imageStore])

    useEffect(() => {
        imgRef.current.clearCache();
        imgRef.current.cache();
    }, [imageState])

    // useEffect(() => {
    //     backgroundRef.current.clearCache();
    // }, [backgroundState])

    useEffect(() => {
        if (textStore.selectedItem) {
            const selectedText = stageRef.current.findOne(`#${textStore.selectedItem.id}`);
            if (textStore.moveSelected.type == "up") {
                selectedText.moveUp();
                let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                const textIndex = historyState['elements'].findIndex(el => el == selectedText.id());
                if (textIndex < historyState['elements'].length - 1) {
                    historyState['elements'] = sortIndex(historyState['elements'], textIndex, 'up');
                    appSetHistory(historyState);
                }
            }
            if (textStore.moveSelected.type == "down") {
                selectedText.moveDown();
                let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                const textIndex = historyState['elements'].findIndex(el => el == selectedText.id());
                if (textIndex > 0) {
                    historyState['elements'] = sortIndex(historyState['elements'], textIndex, 'down');
                    appSetHistory(historyState);
                }
            }
            backgroundRef.current.moveToBottom();
            transRef.current.moveToTop();
        }
    }, [textStore.moveSelected])

    useEffect(() => {
        if (textStore.selectedItem) {
            const selectedText = stageRef.current.findOne(`#${textStore.selectedItem.id}`);
            selectedText.setAttrs({ ...textStore.shadow });
        }
    }, [textStore.shadow])

    useEffect(() => {
        if (textStore.selectedItem) {
            textRemove();
        }
    }, [textStore.removeSelected])

    useEffect(() => {
        if (backgroundStore.image) {
            setBackgroundImage(backgroundStore.image);
        }

        return () => {
            backgroundRef.current.clearCache();
        }
    }, [backgroundStore.fillPatternScale, backgroundStore.fillPatternRotation, backgroundStore.fillPatternX, backgroundStore.fillPatternY, backgroundStore.fillPatternRepeat, templateStore.exportWidth, templateStore.exportHeight]);

    useEffect(() => {
        if (backgroundStore.image) {
            setBackgroundImage(backgroundStore.image, true);
        }

        return () => {
            backgroundRef.current.clearCache();
        }
    }, [backgroundStore.image])

    useEffect(() => {
        if (backgroundState.image) {
            setBackgroundImage(backgroundState.image);
        }

        if (backgroundState.fill == 'transparent') {
            setBackgroundPattern();
        }

        backgroundRef.current.clearCache();
        layerRef.current.draw();
    }, [backgroundState])

    useEffect(() => {
        if (selectedObj) {
            if (isTextObject(selectedObj)) {
                const currentTextState = textState.items.find(i => i.id == selectedObj);
                textUpdate({ ...currentTextState });
            }
        } else {
            if (textStore.selectedItem) {
                textSetSelected(null);
            }
        }
    }, [appStore.appActionFire])

    useEffect(() => {
        let previousIndex = appStore.appHistory[appStore.appHistoryStep - 1];

        // check if zindex change
        // Prerequisites: two step have the same items
        // so we are not misleading the case which item removed
        if (previousIndex && elements.length == previousIndex['elements'].length) {
            let indexChange = elements.filter((item, index) => {
                return previousIndex['elements'][index] != item;
            });
            if (indexChange.length == 2) {
                const obj = stageRef.current.findOne(`#${indexChange[0]}`);
                obj.moveDown();
                backgroundRef.current.moveToBottom();
                transRef.current.moveToTop();
            }
        } else {
            // in case item restored/removed, we need to set its zindex for current state
        }
        layerRef.current.clearCache();
        layerRef.current.draw();
    }, [appStore.appRedoFire])

    useEffect(() => {
        let previousIndex = appStore.appHistory[appStore.appHistoryStep + 1];
        // check if zindex change
        // Prerequisites: two step have the same items
        // so we are not misleading the case which item removed
        if (previousIndex && elements.length == previousIndex['elements'].length) {
            let indexChange = elements.filter((item, index) => {
                return previousIndex['elements'][index] != item;
            });
            if (indexChange.length == 2) {
                const obj = stageRef.current.findOne(`#${indexChange[0]}`);
                obj.moveDown();
                backgroundRef.current.moveToBottom();
                transRef.current.moveToTop();
            }
        } else {
            // in case item restored, we need to set its zindex for current state
            if (previousIndex) {
                let difference = elements.filter(i => !previousIndex['elements'].includes(i));
                if (difference.length == 1) {
                    const obj = stageRef.current.findOne(`#${difference[0]}`);
                    for (let i = 0; i < (elements.length - elements.indexOf(difference[0])); i++) {
                        obj.moveDown();
                        layerRef.current.batchDraw();
                    }
                    backgroundRef.current.moveToBottom();
                    transRef.current.moveToTop();
                }
            }
        }
        // layerRef.current.clearCache();
        // layerRef.current.draw();
    }, [appStore.appUndoFire])

    useEffect(() => {
        layerRef.current.batchDraw();
    })

    useEffect(() => {
        zoom(appStore.appScale);
    }, [appStore.appScale])

    function setBackgroundImage(url, appendLoading = false) {
        appendLoading && setAppLoading(true);
        appendLoading && setTimeout(function () { setAppLoading(false) }, 5000);
        let img = new window.Image();
        img.onload = function () {
            backgroundRef.current.fill(null);
            backgroundRef.current.fillPatternImage(img);
            backgroundRef.current.fillPatternRotation(backgroundState.fillPatternRotation);
            backgroundRef.current.fillPatternX(Number(backgroundState.fillPatternX));
            backgroundRef.current.fillPatternY(Number(backgroundState.fillPatternY));
            backgroundRef.current.fillPatternRepeat(backgroundState.fillPatternRepeat);
            backgroundRef.current.fillPatternScale({ x: backgroundState.fillPatternScale, y: backgroundState.fillPatternScale });
            backgroundRef.current.cache();
            layerRef.current.draw();
            appendLoading && setAppLoading(false);
        }
        img.crossOrigin = 'Anonymous';
        img.src = url;
    }

    function setBackgroundPattern() {
        let img = new window.Image();
        img.onload = function () {
            backgroundRef.current.fill(null);
            backgroundRef.current.fillPatternImage(img);
            backgroundRef.current.fillPatternRotation(0);
            backgroundRef.current.fillPatternX(0);
            backgroundRef.current.fillPatternY(0);
            backgroundRef.current.fillPatternRepeat('repeat');
            backgroundRef.current.cache();
            layerRef.current.draw();
        }
        img.crossOrigin = 'Anonymous';
        img.src = 'https://removal.ai/wp-content/uploads/rme/png-bg.png';
    }

    function textRemove() {
        const selectedText = stageRef.current.findOne(`#${textStore.selectedItem.id}`);
        if (selectedText) {
            const textId = textStore.selectedItem.id;
            selectedText.destroy();
            textSetSelected(null);
            transRef.current.nodes([]);

            let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
            let items = historyState['text'].items.filter((item) => {
                return item.id != textId;
            });
            historyState['text'].items = items;
            historyState['text'].selectedItem = null;
            historyState['elements'] = historyState['elements'].filter(item => item != textId);
            appSetHistory(historyState);
        }
    }

    function textDblClick(textId) {
        let textNode = isTextObject(textId) && stageRef.current.findOne(`#${textId}`) || null;
        const contentBox = document.getElementsByClassName("konvajs-content")[0] || document.getElementsByClassName("rme-content")[0];

        if (!textNode) {
            return;
        }

        textNode.hide();
        layerRef.current.draw();

        var textPosition = textNode.absolutePosition();

        var stageBox = stageRef.current.container().getBoundingClientRect();

        var areaPosition = {
            x: stageBox.left + textPosition.x + contentBox.offsetLeft,
            y: stageBox.top + textPosition.y + contentBox.offsetTop + 1,
        };

        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = 'fixed';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        const textFontStyles = textNode.fontStyle().split(" ") || [];
        if (textFontStyles.includes('bold')) {
            textarea.style.fontWeight = 'bold';
        }
        if (textFontStyles.includes('italic')) {
            textarea.style.fontStyle = 'italic';
        }
        if (textNode.textDecoration()) {
            textarea.style.textDecoration = "underline"
        }
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.zIndex = 9999;
        textarea.style.color = textNode.fill();

        let rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;

        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        textarea.style.height = 'auto';

        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
            historyState['text'].items.map((item) => {
                if (item.id == textNode.id()) {
                    item.text = textNode.text();
                }
            });
            appSetHistory(historyState);
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            layerRef.current.draw();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
            textNode.text(textarea.value);
            transRef.current.forceUpdate();
            layerRef.current.draw();
            if ((e.keyCode === 13 && !e.shiftKey) || e.keyCode === 27) {
                removeTextarea();
            }
        });

        textarea.addEventListener('keydown', function (e) {
            let scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                textNode.text(textarea.value);
                removeTextarea();
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    }

    function handleDragEnd(e, type) {
        const currentObj = stageRef.current.findOne(`#${e.target.id()}`);
        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);

        switch (type) {
            case 'background':
                break;
            case 'image':
                imageSetX(currentObj.x());
                imageSetY(currentObj.y());

                historyState['image'].x = currentObj.x();
                historyState['image'].y = currentObj.y();

                break;
            case 'text':
                textUpdate({ ...textStore.selectedItem });

                historyState['text'].items.map((item, index) => {
                    if (item.id == currentObj.id()) {
                        historyState['text'].items[index] = { ...item, ...textStore.selectedItem };
                    }
                });

                break;
        }

        appSetHistory(historyState);
    }

    function handleTransformend(e, type) {
        const currentObj = stageRef.current.findOne(`#${e.target.id()}`);
        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
        switch (type) {
            case 'background':
                break;
            case 'image':
                imageSetX(currentObj.x());
                imageSetY(currentObj.y());
                imageSetScaleX(currentObj.scaleX());
                imageSetScaleY(currentObj.scaleY());
                imageSetRotation(currentObj.rotation());

                historyState['image'].x = currentObj.x();
                historyState['image'].y = currentObj.y();
                historyState['image'].scaleX = currentObj.scaleX();
                historyState['image'].scaleY = currentObj.scaleY();
                historyState['image'].rotation = currentObj.rotation();

                break;
            case 'text':
                textUpdate({ ...textStore.selectedItem });
                historyState['text'].items.map((item, index) => {
                    if (item.id == currentObj.id()) {
                        historyState['text'].items[index] = { ...item, ...textStore.selectedItem };
                    }
                });

                break;
        }

        appSetHistory(historyState);
    }

    function zoom(newScale) {
        const stage = stageRef.current;
        var oldScale = stage.scaleX();
        if (newScale > 1 || (newScale == 1 && oldScale > newScale)) {
            const oldWidth = stage.width();
            const oldHeight = stage.height();
            stage.width(appStore.workspaceWidth * newScale);
            stage.height(appStore.workspaceHeight * newScale);
            if (stage.width() > 0) {
                const pos = {
                    x: (stage.width() - oldWidth) / 2,
                    y: (stage.height() - oldHeight) / 2,
                };
                stage.position(pos);
                const canvasContainer = document.getElementById("canvasContainerRME");
                canvasContainer.style.width = stage.width() + 'px';
                canvasContainer.style.height = stage.height() + 'px';
            }
        }
        let center = {
            x: stage.width() / 2,
            y: stage.height() / 2,
        };
        var pointer = center;

        var mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        stage.scale({ x: newScale, y: newScale });

        var newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        stage.position(newPos);
        layerRef.current.batchDraw();
        const container = document.getElementById('canvas-area');
        if (stage.width() > 0) {
            const pos = {
                x: (stage.width() - appStore.workspaceWidth) / 2,
                y: (stage.height() - appStore.workspaceHeight) / 2,
            };
            container.scrollTop = pos.y;
            container.scrollLeft = pos.x;
        }
    }

    function sortIndex(arr, index, move = 'up') {
        const length = arr.length;

        if (index < 0 || index > length - 1) {
            return arr;
        }

        const tmp = arr[index];
        if (move == 'up') {
            if (index == length - 1) return arr;
            arr[index] = arr[index + 1];
            arr[index + 1] = tmp;
        } else {
            if (index == 0) return arr;
            arr[index] = arr[index - 1];
            arr[index - 1] = tmp;
        }

        return arr;
    }

    return <React.Fragment>
        <div className="canvas-area" id="canvas-area">
            {
                appLoading && <div className="canvas-loading">
                    <img className="logo-bounce" src="https://removal.ai/wp-content/uploads/rme/fasion.png" />
                </div>
            }
            {/* <Controlbar /> */}
            <div id="canvasContainerRME" data-shadow={imageState.shadow.shadowEnabled} ref={canvasContainerRef}>
                <Stage
                    ref={stageRef}
                    width={appStore.workspaceWidth}
                    height={appStore.workspaceHeight}
                    scaleX={templateState.scaleX}
                    scaleY={templateState.scaleY} >
                    <Layer ref={layerRef}>
                        <Group
                            ref={groupRef}
                            clip={{
                                x: coordX,
                                y: coordY,
                                width: templateState.defaultWidth,
                                height: templateState.defaultHeight
                            }}
                        >
                            <Rect
                                id="background"
                                ref={backgroundRef}
                                x={coordX}
                                y={coordY}
                                width={templateState.defaultWidth}
                                height={templateState.defaultHeight}
                                fill={backgroundState.fill}
                                noise={backgroundState.noise}
                                filters={[Konva.Filters.Blur, Konva.Filters.Contrast, Konva.Filters.Brighten, Konva.Filters.Noise]}
                                blurRadius={Number(backgroundState.blur)}
                                contrast={Number(backgroundState.contrast)}
                                brightness={Number(backgroundState.brightness)}
                                onClick={() => {
                                    setSelectedObj(backgroundRef.current)
                                }} />
                            <Image
                                id="image"
                                ref={imgRef}
                                draggable
                                x={imageState.x}
                                y={imageState.y}
                                scaleX={imageState.scaleX}
                                scaleY={imageState.scaleY}
                                rotation={imageState.rotation}
                                height={imageState.height}
                                width={imageState.width}
                                opacity={Number(imageState.opacity)}
                                filters={[Konva.Filters.Blur, Konva.Filters.Contrast, Konva.Filters.Brighten, Konva.Filters.Noise]}
                                noise={parseFloat(imageState.noise)}
                                blurRadius={Number(imageState.blur)}
                                contrast={parseFloat(imageState.contrast)}
                                brightness={Number(imageState.brightness)}
                                shadowEnabled={imageState.shadow.shadowEnabled}
                                shadowBlur={Number(imageState.shadow.shadowBlur || 0)}
                                shadowColor={imageState.shadow.shadowColor}
                                shadowOffset={imageState.shadow.shadowOffset || { x: 0, y: 0 }}
                                shadowOpacity={Number(imageState.shadow.shadowOpacity || 0)}
                                onClick={(e) => {
                                    setSelectedObj(imgRef.current)
                                }}
                                onTab={() => {
                                    setSelectedObj(imgRef.current)
                                }}
                                onDragStart={(e) => {
                                    setSelectedObj(imgRef.current)
                                }}
                                onDragEnd={(e) => handleDragEnd(e, 'image')}
                                onTransformEnd={(e) => handleTransformend(e, 'image')}
                            />

                            {
                                textState && textState.items.map(item => {
                                    return <Text
                                        key={item.id}
                                        x={coordX}
                                        y={coordY}
                                        draggable
                                        onClick={() => {
                                            setSelectedObj(item.id)
                                        }}
                                        onDragStart={() => {
                                            setSelectedObj(item.id)
                                        }}
                                        onTab={() => {
                                            setSelectedObj(item.id)
                                        }}
                                        onDblClick={() => {
                                            textDblClick(item.id)
                                        }}
                                        onDblTab={() => {
                                            textDblClick(item.id)
                                        }}
                                        onTransform={(e) => {
                                            const selectedText = e.currentTarget;
                                            selectedText.setAttrs({
                                                width: selectedText.width() * selectedText.scaleX(),
                                                scaleX: 1,
                                            });
                                        }}
                                        onTransformEnd={(e) => handleTransformend(e, 'text')}
                                        onDragEnd={(e) => handleDragEnd(e, 'text')}
                                        {
                                        ...item
                                        }
                                    />
                                })
                            }

                            {
                                shapeStore && shapeStore.items.map(item => {
                                    return <Path
                                        draggable
                                        key={item.id}
                                        onClick={() => {
                                            setSelectedObj(item.id)
                                        }}
                                        onTab={() => {
                                            setSelectedObj(item.id)
                                        }}
                                        {...item}
                                    />
                                })
                            }

                        </Group>
                        <Transformer
                            id="transformer"
                            ref={transRef}
                            boundBoxFunc={(oldBox, newBox) => {
                                newBox.width = Math.max(30, newBox.width);
                                return newBox
                            }} />
                    </Layer>
                </Stage>
            </div>
        </div>
    </React.Fragment>
}
