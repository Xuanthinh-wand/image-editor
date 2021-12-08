import React, { useState, useEffect } from 'react';

import { templateAction } from '../../actions/template';
import { appAction } from '../../actions/app';
import _ from 'lodash';

export default function TemplateControlPage(props) {

    const { templateStore, templateUpdateSize, templateChangeExportSize } = templateAction();
    const { appStore, appSetHistory } = appAction();
    const [width, setWidth] = useState(templateStore.exportWidth);
    const [height, setHeight] = useState(templateStore.exportHeight);

    function changeExportTemplate($width, $height) {
        if ($width > 8000 || $height > 8000) {
            alert("Size should not be larger than 8000");
            return;
        }
        if ($width < 50 || $height < 50) {
            alert("Size should not be smaller than 100px");
            return;
        }
        setWidth($width);
        setHeight($height);
        templateChangeExportSize($width, $height);

        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);

        let newHeight = $height, newWidth = $width;
        if (newWidth > 740 || newHeight > 740 * 720 / 1280) {
            if (newHeight > newWidth) {
                if (newHeight > 600) {
                    newHeight = 600;
                    newWidth = 600 * $width / $height;
                }
                if (newWidth > 740) {
                    newHeight = 740 * newHeight / newWidth;
                    newWidth = 740;
                }
            } else {
                newWidth = 740;
                newHeight = 740 * $height / $width;

                if (newHeight > 600) {
                    newWidth = 600 * $width / $height;
                    newHeight = 600;
                }
            }
        }

        historyState['template'].exportWidth = $width;
        historyState['template'].exportHeight = $height;
        historyState['template'].defaultWidth = newWidth;
        historyState['template'].defaultHeight = newHeight;
        appSetHistory(historyState);
    }

    return <React.Fragment>
        <div className="layout-menu layout-template">
            <div className="layout-template-custom layout-menu-padding">
                <h3>Custom size</h3>
                <div className="template-item common-size-custom-form">
                    <input
                        type="text"
                        className="rme-form-control common-size-input"
                        value={width}
                        onChange={e => {
                            if ((width.toString().length < 4 && !isNaN(e.target.value)) || (width.toString().length == 4 && e.target.value.toString().length < 4)) {
                                setWidth(e.target.value)
                            }
                        }} />
                    <span>x</span>
                    <input
                        type="text"
                        className="rme-form-control common-size-input"
                        value={height}
                        onChange={e => {
                            if ((height.toString().length < 4 && !isNaN(e.target.value)) || (height.toString().length == 4 && e.target.value.toString().length < 4)) {
                                setHeight(e.target.value)
                            }
                        }} />
                    <input
                        type="button"
                        className="rme-form-control rme-button common-size-button"
                        defaultValue="Change"
                        onClick={() => changeExportTemplate(width, height)} />
                </div>
            </div>
            <div className="splitter"></div>
            <div className="layout-template-common layout-menu-padding">
                <h3>Common Sizes</h3>
                <div className="template-item" onClick={() => changeExportTemplate(851, 315)}>
                    <div className="template-image">
                        <img src="https://removal.ai/wp-content/uploads/rme/layout/FBCover851x315.svg"></img>
                    </div>
                    <span>Facebook Cover</span>
                    <span>851x315</span>
                </div>
                <div className="template-item" onClick={() => changeExportTemplate(940, 788)}>
                    <div className="template-image">
                        <img src="https://removal.ai/wp-content/uploads/rme/layout/FBWallPost940x788.svg"></img>
                    </div>
                    <span>Facebook Wall Post</span>
                    <span>940x788</span>
                </div>
                <div className="template-item" onClick={() => changeExportTemplate(564, 1200)}>
                    <div className="template-image">
                        <img src="https://removal.ai/wp-content/uploads/rme/layout/PinterestAdvert564x1200.svg"></img>
                    </div>
                    <span>Pinterest Tall Post</span>
                    <span>564x1200</span>
                </div>
                <div className="template-item" onClick={() => changeExportTemplate(1080, 1080)}>
                    <div className="template-image">
                        <img src="https://removal.ai/wp-content/uploads/rme/layout/IGSquarePhoto1080x1080.svg"></img>
                    </div>
                    <span>Instagram Post</span>
                    <span>1080x1080</span>
                </div>
                <div className="template-item" onClick={() => changeExportTemplate(2000, 2000)}>
                    <div className="template-image">
                        <img src="https://removal.ai/wp-content/uploads/rme/layout/ShopifyProductImage964.svg"></img>
                    </div>
                    <span>Shopify Product</span>
                    <span>2000x2000</span>
                </div>
                <div className="template-item" onClick={() => changeExportTemplate(1920, 1080)}>
                    <div className="template-image">
                        <img src="https://removal.ai/wp-content/uploads/rme/layout/ShopifyHDBanner1920x1080.svg"></img>
                    </div>
                    <span>Shopify Banner</span>
                    <span>1920x1080</span>
                </div>
            </div>
        </div>
    </React.Fragment>
}
