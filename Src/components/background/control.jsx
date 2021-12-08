import React, { useState, useRef, useEffect } from 'react';
import useImage from 'use-image';
import { appAction } from '../../actions/app';
import { backgroundImages } from '../../constants/backgroundimage';
import { backgroundAction } from '../../actions/background';
import { templateAction } from '../../actions/template';
import _ from 'lodash';

export default function BackgroundControlPage(props) {
    const { appStore, appSetHistory } = appAction();
    const { backgroundStore, backgroundUploadImage, backgroundSetImage, backgroundSetImageScale, backgroundSetImageSetting, backgroundSetImageScaleToFit, backgroundSetBlur, backgroundSetContrast, backgroundSetBrightness } = backgroundAction();
    const { templateStore } = templateAction();
    let backgroundState = backgroundStore;
    if (appStore.appHistory[appStore.appHistoryStep]) {
        let currentState = appStore.appHistory[appStore.appHistoryStep];
        backgroundState = currentState['background'];
    }

    const inputFileRef = useRef();
    const removalBackroundUrl = "https://removal.ai/wp-content/uploads/rme/background/";

    useEffect(() => {
        if (backgroundStore.image) {
            let img = new window.Image();
            img.onload = function () {
                handleBackgroundScale(backgroundStore.fillScaleToFit, img);
            }
            img.crossOrigin = 'Anonymous';
            img.src = backgroundStore.image;
        }
    }, [backgroundStore.image, backgroundStore.fillScaleToFit])

    function onInputFileChange(event) {
        event.preventDefault();
        event.stopPropagation();
        var files = event.target.files || event.dataTransfer.files;
        const reader = new FileReader();
        reader.readAsBinaryString(files[0]);
        reader.onload = () => {
            let fileRes = btoa(reader.result);
            if (fileRes) {
                fileRes = `data:image/jpg;base64,${fileRes}`;
                backgroundUploadImage(fileRes);
                backgroundSetImage(fileRes);
            }
        };
    }

    function handleBackgroundScale(scaleToFitOption, img) {
        backgroundSetImageScaleToFit(scaleToFitOption);
        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
        historyState['background'] = _.cloneDeep(backgroundStore);
        historyState['background'].fillScaleToFit = scaleToFitOption;

        if (!backgroundStore.image) {
            return;
        }
        if (!img) {
            return;
        }

        historyState['background'].fillPatternX = 0;
        historyState['background'].fillPatternY = 0;

        if (scaleToFitOption == "original") {
            backgroundSetImageSetting({
                fillPatternScale: 1,
                fillPatternX: 0,
                fillPatternY: 0,
            });
            historyState['background'].fillPatternScale = 1;
        }
        if (scaleToFitOption == "full-width") {
            let newScale = templateStore.defaultWidth / img.naturalWidth;
            backgroundSetImageSetting({
                fillPatternScale: newScale,
                fillPatternX: 0,
                fillPatternY: 0,
            });
            historyState['background'].fillPatternScale = newScale;
        }
        if (scaleToFitOption == "full-height") {
            let newScale = templateStore.defaultHeight / img.naturalHeight;
            backgroundSetImageSetting({
                fillPatternScale: newScale,
                fillPatternX: 0,
                fillPatternY: 0,
            });
            historyState['background'].fillPatternScale = newScale;
        }

        historyState['background'].fill = null;
        historyState['background'].image = backgroundStore.image;

        appSetHistory(historyState);
    }

    return (<React.Fragment>
        <div className="layout-menu layout-bg">
            <React.Fragment>
                <div className="layout-bg-upload layout-menu-padding">
                    <div className="background-upload-image rme-control">
                        <img src="https://removal.ai/wp-content/uploads/rme/upload-image.png"
                            onClick={() => inputFileRef.current.click()}
                            onDrop={(event) => onInputFileChange(event)} />
                        <input
                            ref={inputFileRef}
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => onInputFileChange(event)} />
                    </div>
                </div>
                <div className="splitter"></div>
                <div className="layout-bg-style layout-menu-padding">
                    <div className={!backgroundState.image && "rme-control-disabled" || ""}>
                        <div>
                            <span className="rme-control-title">Scale To Fit</span>
                            <select className="rme-form-control"
                                value={backgroundState.fillScaleToFit}
                                onChange={(e) => handleBackgroundScale(e.target.value)}>
                                <option value="original">Custom</option>
                                <option value="full-width">Full Width</option>
                                <option value="full-height">Full Height</option>
                                {/* <optgroup label="Cover">
                                <option value="left-top">Left Top</option>
                                <option value="center-top">Center Top</option>
                                <option value="right-top">Right Top</option>
                                <option value="left-middle">Left Middle</option>
                                <option value="center-middle">Center Middle</option>
                                <option value="right-middle">Right Middle</option>
                                <option value="left-bottom">Left Bottom</option>
                                <option value="center-bottom">Center Bottom</option>
                                <option value="right-bottom">Right Bottom</option>
                            </optgroup> */}
                            </select>
                        </div>

                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Scale</span>
                                <span className="rme-control-value">{Number(backgroundState.fillPatternScale) && Number(backgroundState.fillPatternScale).round(1)}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={backgroundState.fillPatternScale}
                                onChange={(e) => {
                                    backgroundSetImageScale(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['background'].fillPatternScale = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>

                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Brightness</span>
                                <span className="rme-control-value">{backgroundState.brightness}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="-1"
                                max="1"
                                step="0.05"
                                value={backgroundState.brightness}
                                onChange={(e) => {
                                    backgroundSetBrightness(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['background'].brightness = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Contrast</span>
                                <span className="rme-control-value">{backgroundState.contrast}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="-100"
                                max="100"
                                step="1"
                                value={backgroundState.contrast}
                                onChange={(e) => {
                                    backgroundSetContrast(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['background'].contrast = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Blur</span>
                                <span className="rme-control-value">{backgroundState.blur}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="0"
                                max="40"
                                step="0.05"
                                value={backgroundState.blur}
                                onChange={(e) => {
                                    backgroundSetBlur(e.target.value);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['background'].blur = e.target.value;
                                    appSetHistory(historyState);
                                }} />
                        </div>
                    </div>
                </div>
                <div className="splitter"></div>
                <div className="layout-bg-list layout-menu-padding">
                    <div className="background-image-list">
                        {
                            backgroundState.imageUploads.map(item => {
                                return <div key={item} onClick={() => {
                                    backgroundSetImage(item);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['background'].fill = null;
                                    historyState['background'].image = item;
                                    appSetHistory(historyState);
                                }} className="rme-control background-image--item">
                                    <img src={item}></img>
                                </div>
                            })
                        }
                        {
                            backgroundImages.map(item => {
                                return <div key={item} onClick={() => {
                                    backgroundSetImage(removalBackroundUrl + item);
                                }} className="rme-control background-image--item">
                                    <img src={removalBackroundUrl + "thumb_" + item}></img>
                                </div>
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        </div>
    </React.Fragment>)
}
