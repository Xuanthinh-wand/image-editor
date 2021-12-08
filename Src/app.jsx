import React, { useState, useEffect, useContext } from 'react';
import Sitebar from './components/layout/sitebar';
import Canvas from './components/canvas';
import { appAction } from './actions/app';
import { imageAction } from './actions/image';
import { templateAction } from './actions/template';
import { backgroundAction } from './actions/background';
import { textAction } from './actions/text';
import { Menu } from './constants/menu';
import ImageErase from './components/image/erase';
import ExportControl from './components/layout/export';

export default function App(props) {
    const { appStore, appInitState, appToggleShow, appUpdateWorkspace, appUndo, appRedo, appZoomIn, appZoomOut } = appAction();
    const { imageStore, imageInitState, imageSetImage } = imageAction();
    const { textInitState } = textAction();
    const { backgroundInitState } = backgroundAction();
    const { templateStore, templateInitState } = templateAction();

    const defaultMenu = Menu.find(item => item.default);
    const menuActive = appStore.menu || defaultMenu;
    const controlComponent = React.createElement(menuActive.component);

    useEffect(() => {
        if (!imageStore.url) {
            document.addEventListener('click', (e) => {
                const element = e.target;
                if (element.classList.contains("rme-image") && element.getAttribute("data-image")) {
                    appToggleShow();
                    imageSetImage(element.getAttribute("data-image"));
                }
            });
        }
        return () => {
            imageSetImage(null);
        }
    }, [])

    useEffect(() => {
        if (!appStore.showApp) {
            if (appStore.workspaceWidth > 0) {
                const canvasContainer = document.getElementById("canvasContainerRME");
                canvasContainer.style.width = appStore.workspaceWidth + 'px';
                canvasContainer.style.height = appStore.workspaceHeight + 'px';
            }

            appInitState();
            imageInitState();
            textInitState();
            backgroundInitState();
            templateInitState();
        } else {
            const canvasContainer = document.getElementById("canvasContainerRME");
            appUpdateWorkspace(canvasContainer.clientWidth, canvasContainer.clientHeight);
        }
    }, [appStore.showApp])

    useEffect(() => {
        const canvasContainer = document.getElementById("canvasContainerRME");
        appUpdateWorkspace(canvasContainer.clientWidth, canvasContainer.clientHeight);
    }, [appStore.fullScreen])

    return (<React.Fragment>
        <div className={appStore.showApp && (appStore.fullScreen && "rme-modal-frame state-appear rme-modal-full" || "rme-modal-frame state-appear") || "rme-modal-frame"}>
            <div className="rme-modal">
                <div className="rme-modal-inset">
                    <div className="rme-modal-body">
                        <Sitebar />
                        <div className="effect-menu">
                            {controlComponent}
                            <ExportControl />
                        </div>
                        <Canvas />
                        {
                            imageStore.eraseMode &&
                            <ImageErase />
                        }
                    </div>
                    <div className="interactive-menu">
                        <button id="undo" disabled={appStore.appHistoryStep < 1}
                            className="rme-form-control rme-button-simple" onClick={() => appUndo()}><i className="far fa-undo"></i></button>
                        <button id="redo" disabled={appStore.appHistoryStep >= appStore.appHistory.length - 1}
                            className="rme-form-control rme-button-simple" onClick={() => appRedo()}><i className="far fa-redo"></i></button>
                        <button id="zoomin" disabled={appStore.appScaleStep >= 4}
                            className="rme-form-control rme-button-simple" onClick={() => appZoomIn()}><i className="far fa-search-plus"></i></button>
                        <button id="zoomout" disabled={appStore.appScaleStep <= -2}
                            className="rme-form-control rme-button-simple" onClick={() => appZoomOut()}><i className="far fa-search-minus"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div className={appStore.showApp && "rme-modal-overlay state-show" || "rme-modal-overlay"}></div>
    </React.Fragment>)
}
