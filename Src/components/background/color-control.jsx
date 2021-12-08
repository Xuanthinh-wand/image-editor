import React from 'react';
import ColorPicker from '../../controls/colorpicker';
import { fillColors } from '../../constants/fillcolor';
import { appAction } from '../../actions/app';
import { backgroundAction } from '../../actions/background';
import _ from 'lodash';

export default function ColorControlPage(props) {
    const { appStore, appSetHistory } = appAction();
    const { backgroundStore, backgroundSetFill } = backgroundAction();
    let backgroundState = backgroundStore;
    if (appStore.appHistory[appStore.appHistoryStep]) {
        let currentState = appStore.appHistory[appStore.appHistoryStep];
        backgroundState = currentState['background'];
    }
    // transparent
    return <React.Fragment>
        <div className="layout-menu layout-bg">
            <div className="rme-control-area">
                <div className="layout-color-bg layout-menu-padding">
                    <div className="rme-fill d-block">
                        <h3>Background Color</h3>
                        <div onClick={() => {
                            backgroundSetFill("transparent");
                            let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                            historyState['background'].fill = 'transparent';
                            historyState['background'].image = null;
                            appSetHistory(historyState);
                        }}
                            className="rme-fill-item d-inline-block rme-control" style={{ background: "url(https://removal.ai/wp-content/uploads/rme/transparent-bg.png)" }} ></div>
                        {
                            fillColors.map(item => {
                                return <div key={item} onClick={() => {
                                    backgroundSetFill(item);
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['background'].fill = item;
                                    historyState['background'].image = null;
                                    appSetHistory(historyState);
                                }} className="rme-fill-item d-inline-block rme-control" style={{ backgroundColor: item }} ></div>
                            })
                        }
                    </div>
                </div>
                <div className="splitter"></div>
                <div className="layout-color-custom layout-menu-padding">
                    <span>Custom Background Color</span>
                    <ColorPicker
                        showText={backgroundState.fill}
                        showType="color"
                        value={backgroundState.fill}
                        onChange={(value) => {
                            backgroundSetFill(value);
                            let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                            historyState['background'].fill = value;
                            historyState['background'].image = null;
                            appSetHistory(historyState);
                        }} />
                </div>
            </div>
        </div>
    </React.Fragment>
}
