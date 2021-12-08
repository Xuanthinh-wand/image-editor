import React, { useState, useEffect } from 'react';
import ColorPicker from '../../controls/colorpicker';
import { appAction } from '../../actions/app';
import { imageAction } from '../../actions/image';
import _ from 'lodash';

export default function ImageControlPage(props) {
    const { appStore, appSetHistory } = appAction();
    const { imageStore, imageSetEraseMode, imageSetEraseBursh, imageSetClone, imageUseClone, imageSetOpacity, imageSetBrightness, imageSetContrast, imageSetScaleX, imageSetScaleY, imageSetNoise, imageSetBlur, imageMove, imageSetShadow } = imageAction();

    const [brushSize, setBrushSize] = useState(20);
    const [imageCanvasBackup, setImageCanvasBackup] = useState(null);

    let imageState = imageStore;
    if (appStore.appHistory[appStore.appHistoryStep]) {
        let currentState = appStore.appHistory[appStore.appHistoryStep];
        imageState = currentState['image'];
    }
    useEffect(() => {
        setBrushSize(imageStore.eraseBrushSize);
    }, [imageStore.eraseBrushSize])

    useEffect(() => {
        setImageCanvasBackup(imageStore.imageClone);
    }, [imageStore.eraseMode])

    useEffect(() => {
        return () => {
            imageSetEraseMode(false);
        }
    }, [])

    return <React.Fragment>
        <div className="layout-menu layout-main-image">
            <div className="layout-main-image-preview layout-menu-padding">
                <div className="view-main-image">
                    <img src={imageStore.url} />
                </div>
            </div>
            <div className="splitter"></div>
            {
                <React.Fragment>
                    <div className="layout-image-control layout-menu-padding">
                        <div className="rme-button-control-are">
                            <button title="Send back" className="rme-form-control rme-button-simple rme-button-o rme-button-icon"
                                style={{ marginBottom: "10px" }}
                                onClick={() => imageMove("down")} >
                                <i className="far fa-send-backward"></i>
                            </button>
                            &nbsp;
                            <button className="rme-form-control rme-button-simple rme-button-o rme-button-icon"
                                style={{ marginBottom: "10px" }}
                                onClick={() => imageMove("up")} >
                                <i className="far fa-bring-forward"></i>
                            </button>
                            &nbsp;
                            <button className="rme-form-control rme-button-simple rme-button-o rme-button-icon"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                    imageSetScaleX(-imageStore.scaleX);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['image'].scaleX = -imageStore.scaleX;
                                    appSetHistory(historyState);
                                }} >
                                <i className="fad fa-brackets"></i>
                            </button>
                            &nbsp;
                            <button className="rme-form-control rme-button-simple rme-button-o rme-button-icon"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                    imageSetScaleY(-imageStore.scaleY);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['image'].scaleY = -imageStore.scaleY;
                                    appSetHistory(historyState);
                                }} >
                                <i className="fad fa-brackets fa-rotate-90"></i>
                            </button>
                        </div>
                    </div>
                    <div className="splitter"></div>
                    <div className="layout-image-style layout-menu-padding">
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Opacity</span>
                                <span className="rme-control-value">{imageState.opacity}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                value={imageState.opacity}
                                onChange={(e) => {
                                    imageSetOpacity(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['image'].opacity = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Brightness</span>
                                <span className="rme-control-value">{imageState.brightness}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="-1"
                                max="1"
                                step="0.1"
                                value={imageState.brightness}
                                onChange={(e) => {
                                    imageSetBrightness(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['image'].brightness = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Contract</span>
                                <span className="rme-control-value">{imageState.contrast}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="-100"
                                max="100"
                                step="5"
                                value={imageState.contrast}
                                onChange={(e) => {
                                    imageSetContrast(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['image'].contrast = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Noise</span>
                                <span className="rme-control-value">{imageState.noise}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={imageState.noise}
                                onChange={(e) => {
                                    imageSetNoise(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['image'].noise = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Blur</span>
                                <span className="rme-control-value">{imageState.blur}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="0"
                                max="40"
                                step="0.05"
                                value={imageState.blur}
                                onChange={(e) => {
                                    imageSetBlur(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['image'].blur = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>
                    </div>
                    <div className="splitter"></div>
                    <div className="layout-image-shadow layout-menu-padding">
                        <div style={{ textAlign: "left" }}>
                            <label className="rme-checkbox-container"><span>Add Shadow</span>
                                <input type="checkbox"
                                    checked={imageState.shadow.shadowEnabled}
                                    onChange={e => {
                                        imageSetShadow({ shadowEnabled: e.target.checked });
                                        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                        historyState['image'].shadow.shadowEnabled = e.target.checked;
                                        appSetHistory(historyState);
                                    }} />
                                <span className="rme-checkmark"></span>
                            </label>
                            <span style={{ color: "#000", textAlign: "left", fontFamily: "'Roboto', sans-serif", fontSize: "12px", lineHeight: "1.8" }}>Color</span>
                            <ColorPicker
                                showType="color"
                                showText={imageState.shadow.shadowColor}
                                value={imageState.shadow.shadowColor}
                                onChange={value => {
                                    imageSetShadow({ shadowColor: value });
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['image'].shadow.shadowColor = value;
                                    appSetHistory(historyState);
                                }} />
                            <div className="rme-range-slider">
                                <div className="rme-range-slider__title">
                                    <span>Blur</span>
                                    <span className="rme-control-value">{imageState.shadow.shadowBlur}</span>
                                </div>
                                <input className="rme-range-slider__range"
                                    type="range"
                                    min="0"
                                    max="40"
                                    step="1"
                                    value={imageState.shadow.shadowBlur}
                                    onChange={(e) => {
                                        imageSetShadow({ shadowBlur: e.target.value });
                                        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                        historyState['image'].shadow.shadowBlur = e.target.value;
                                        appSetHistory(historyState);
                                    }} />
                            </div>
                            <div className="rme-range-slider">
                                <div className="rme-range-slider__title">
                                    <span>Opacity</span>
                                    <span className="rme-control-value">{imageState.shadow.shadowOpacity}</span>
                                </div>
                                <input className="rme-range-slider__range"
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={imageState.shadow.shadowOpacity}
                                    onChange={(e) => {
                                        imageSetShadow({ shadowOpacity: e.target.value });
                                        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                        historyState['image'].shadow.shadowOpacity = e.target.value;
                                        appSetHistory(historyState);
                                    }} />
                            </div>
                            <div className="rme-range-slider">
                                <div className="rme-range-slider__title">
                                    <span>Offset X</span>
                                    <span className="rme-control-value">{imageState.shadow.shadowOffset.x}</span>
                                </div>
                                <input className="rme-range-slider__range"
                                    type="range"
                                    min="-100"
                                    max="100"
                                    step="1"
                                    value={imageState.shadow.shadowOffset.x}
                                    onChange={(e) => {
                                        imageSetShadow({ shadowOffset: { ...imageStore.shadow.shadowOffset, x: e.target.value } });
                                        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                        historyState['image'].shadow.shadowOffset.x = e.target.value;
                                        appSetHistory(historyState);
                                    }} />
                            </div>
                            <div className="rme-range-slider">
                                <div className="rme-range-slider__title">
                                    <span>Offset Y</span>
                                    <span className="rme-control-value">{imageState.shadow.shadowOffset.y}</span>
                                </div>
                                <input className="rme-range-slider__range"
                                    type="range"
                                    min="-100"
                                    max="100"
                                    step="1"
                                    value={imageState.shadow.shadowOffset.y}
                                    onChange={(e) => {
                                        imageSetShadow({ shadowOffset: { ...imageStore.shadow.shadowOffset, y: e.target.value } });
                                        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                        historyState['image'].shadow.shadowOffset.y = e.target.value;
                                        appSetHistory(historyState);
                                    }} />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
        </div>
    </React.Fragment>
}
