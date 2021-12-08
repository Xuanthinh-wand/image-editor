import React, { useState, useEffect } from 'react';
import ColorPicker from '../../controls/colorpicker';
import { appAction } from '../../actions/app';
import { textAction } from '../../actions/text';
import { fonts } from '../../constants/font';
import { isActiveFontStyle, isActiveTextDecoration, isActiveTextAlign } from '../../lib/textHelper';
import _ from 'lodash';

export default function TextControlPage(props) {
    const { appStore, appSetHistory } = appAction();
    const { textStore, textClone, textAdd, textUpdate, textRemoveSelected, textMoveSelected, textSetShadow } = textAction();
    const [fontFamily, setFontFamily] = useState("Arial")

    let textState = textStore;
    if (appStore.appHistory[appStore.appHistoryStep]) {
        let currentState = appStore.appHistory[appStore.appHistoryStep];
        textState = currentState['text'];
    }

    function setFontStyle(value) {
        if (!textStore.selectedItem) {
            return;
        }
        let updateValue;
        if (!textStore.selectedItem.fontStyle) {
            updateValue = value;
        } else {
            if (textStore.selectedItem.fontStyle.includes(value)) {
                updateValue = [...textStore.selectedItem.fontStyle.split(" ")].filter(item => item != value).join(" ");
            } else {
                updateValue = [...textStore.selectedItem.fontStyle.split(" "), value].join(" ");
            }
        }

        textUpdate({ ...textStore.selectedItem, fontStyle: updateValue })
        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
        historyState['text'].items.map((item) => {
            if (item.id == textStore.selectedItem.id) {
                item.fontStyle = updateValue;
            }
        });
        appSetHistory(historyState);
    }

    function setTextDecoration(value) {
        if (!textStore.selectedItem) {
            return;
        }
        if (!textStore.selectedItem.textDecoration) {
            textUpdate({ ...textStore.selectedItem, textDecoration: value });
            return;
        }
        delete textStore.selectedItem.textDecoration;
        textUpdate({ ...textStore.selectedItem, textDecoration: "" });
        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
        historyState['text'].items.map((item) => {
            if (item.id == textStore.selectedItem.id) {
                item.textDecoration = updateValue;
            }
        });
        appSetHistory(historyState);
    }

    function setTextAlign(value) {
        if (!textStore.selectedItem) {
            return;
        }
        if (!textStore.selectedItem.align && textStore.selectedItem.align != value) {
            textUpdate({ ...textStore.selectedItem, align: value });
            return;
        }
        delete textStore.selectedItem.align;
        textUpdate({ ...textStore.selectedItem, align: "" })
        // let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
        // historyState['text'].items.map((item) => {
        //     if (item.id == textStore.selectedItem.id) {
        //         item.textDecoration = updateValue;
        //     }
        // });
        // appSetHistory(historyState);
    }

    function addText(textId, _fontSize, _fontStyle) {
        textAdd({
            id: textId,
            text: "Hello Removal",
            width: 220,
            fontSize: _fontSize,
            fontFamily: "Arial",
            fontStyle: _fontStyle,
            fill: "#000",
            shadowEnabled: false,
            shadowColor: "#000",
            shadowBlur: 3,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowOpacity: 0.5,
        });
        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
        historyState['text'].items.push({
            id: textId,
            text: "Hello Removal",
            width: 220,
            fontSize: _fontSize,
            fontFamily: "Arial",
            fontStyle: _fontStyle,
            fill: "#000",
            shadowEnabled: false,
            shadowColor: "#000",
            shadowBlur: 3,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowOpacity: 0.5,
        });
        historyState['elements'].push(textId);
        appSetHistory(historyState);
    }

    return <React.Fragment>
        <div className="layout-menu layout-text">
            <div className="layout-text-header layout-menu-padding">
                <div className="text-item" onClick={() => {
                    addText(`text-${Date.now()}`, 24, 'bold');
                }}>
                    <h2>Add HEADER</h2>
                </div>
                <div className="text-item" onClick={() => {
                    addText(`text-${Date.now()}`, 20, 'bold');
                }}>
                    <h4>Add SUB HEADER</h4>
                </div>
                <div className="text-item" onClick={() => {
                    addText(`text-${Date.now()}`, 14);
                }}>
                    <p>Add body text</p>
                </div>
            </div>
            <React.Fragment>
                <div className="splitter"></div>
                {
                    textStore.selectedItem && <React.Fragment>
                        <div className="layout-text-layering layout-menu-padding">
                            <div className="rme-button-control-are">
                                <button className="rme-form-control rme-button-simple rme-button-o rme-button-icon"
                                    style={{ marginBottom: "10px" }}
                                    onClick={() => {
                                        textMoveSelected("down");
                                    }}>
                                    <i className="far fa-send-backward"></i>
                                </button>
                                &nbsp;
                                <button className="rme-form-control rme-button-simple rme-button-o rme-button-icon"
                                    style={{ marginBottom: "10px" }}
                                    onClick={() => textMoveSelected("up")} >
                                    <i className="far fa-bring-forward"></i>
                                </button>
                                &nbsp;
                                <button title="Clone" className="rme-form-control rme-button-simple rme-button-o rme-button-icon"
                                    style={{ marginBottom: "10px" }}
                                    onClick={() => {
                                        let textId = `text-${Date.now()}`;
                                        textClone(textId);
                                        let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                        historyState['text'].items.push({
                                            ...textStore.selectedItem,
                                            id: textId,
                                            x: textStore.selectedItem.x + 10,
                                            y: textStore.selectedItem.y + 10
                                        });
                                        appSetHistory(historyState);

                                    }} >
                                    <i className="far fa-clone"></i>
                                </button>
                                &nbsp;
                                <button className="rme-form-control rme-button-simple rme-button-remove-o rme-button-icon rme-button-right"
                                    style={{ marginBottom: "10px" }}
                                    onClick={() => {
                                        textRemoveSelected();
                                    }} >
                                    <i className="fad fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div className="splitter"></div>
                    </React.Fragment>
                }
                <div className="layout-text-style layout-menu-padding">
                    <div className={textStore.selectedItem && "rme-text-control" || "rme-text-control rme-control-disabled"}>
                        <div className="rme-text-control--font-family text-left">
                            <h3>Font</h3>
                            <select
                                className="rme-form-control"
                                value={textStore.selectedItem && textStore.selectedItem.fontFamily || "Arial"}
                                onChange={e => {
                                    textUpdate({ ...textStore.selectedItem, fontFamily: e.target.value });
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['text'].items.map((item) => {
                                        if (item.id == textStore.selectedItem.id) {
                                            item.fontFamily = e.target.value;
                                        }
                                    });
                                    appSetHistory(historyState);
                                }}>
                                {
                                    fonts.map(item => {
                                        return <option style={{ fontFamily: item }} key={item} value={item}>{item}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="rme-text-control--font-style">
                            <div className="rme-text-control--font-style---item d-inline-block">
                                <i className={isActiveFontStyle("bold", textStore.selectedItem) && "fa fa-bold active" || "fa fa-bold"}
                                    onClick={() => {
                                        setFontStyle("bold");
                                    }}></i>
                                <i className={isActiveFontStyle("italic", textStore.selectedItem) && "fa fa-italic active" || "fa fa-italic"}
                                    onClick={() => {
                                        setFontStyle("italic");
                                    }}></i>
                                <i className={isActiveTextDecoration("underline", textStore.selectedItem) && "fa fa-underline active" || "fa fa-underline"}
                                    onClick={() => {
                                        setTextDecoration("underline");
                                    }}></i>
                            </div>
                            <div className="rme-text-control--font-style---item d-inline-block">
                                <i className={isActiveTextAlign("left", textStore.selectedItem) && "fa fa-align-left active" || "fa fa-align-left"} onClick={() => setTextAlign("left")}></i>
                                <i className={isActiveTextAlign("center", textStore.selectedItem) && "fa fa-align-center active" || "fa fa-align-center"} onClick={() => setTextAlign("center")}></i>
                                <i className={isActiveTextAlign("right", textStore.selectedItem) && "fa fa-align-right active" || "fa fa-align-right"} onClick={() => setTextAlign("right")}></i>
                            </div>
                        </div>
                        <div className="rme-text-control--font-color">
                            <span>Color</span>
                            <ColorPicker
                                showType="color"
                                showText={textStore.selectedItem && textStore.selectedItem.fill || "#000"}
                                value={textStore.selectedItem && textStore.selectedItem.fill || "#000"}
                                onChange={(value) => {
                                    textUpdate({ ...textStore.selectedItem, fill: value });
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['text'].items.map((item) => {
                                        if (item.id == textStore.selectedItem.id) {
                                            item.fill = value;
                                        }
                                    });
                                    appSetHistory(historyState);
                                }} />
                        </div>
                    </div>
                    <div className={textStore.selectedItem && "rme-range-slider" || "rme-range-slider rme-control-disabled"}>
                        <div className="rme-range-slider__title">
                            <span>Size</span>
                            <span className="rme-control-value">{textStore.selectedItem && textStore.selectedItem.fontSize || 12}</span>
                        </div>
                        <input className="rme-range-slider__range"
                            type="range"
                            min="1"
                            max="200"
                            value={textStore.selectedItem && textStore.selectedItem.fontSize || 12}
                            onChange={e => {
                                textUpdate({ ...textStore.selectedItem, fontSize: Number(e.target.value) });
                                let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                historyState['text'].items.map((item) => {
                                    if (item.id == textStore.selectedItem.id) {
                                        item.fontSize = Number(e.target.value);
                                    }
                                });
                                appSetHistory(historyState);
                            }}
                        />
                    </div>
                    <div className={textStore.selectedItem && "rme-range-slider" || "rme-range-slider rme-control-disabled"}>
                        <div className="rme-range-slider__title">
                            <span>Line height</span>
                            <span className="rme-control-value">{textStore.selectedItem && textStore.selectedItem.lineHeight || 1}</span>
                        </div>
                        <input className="rme-range-slider__range"
                            type="range"
                            min="0.1"
                            step="0.1"
                            max="4"
                            value={textStore.selectedItem && textStore.selectedItem.lineHeight || 1}
                            onChange={e => {
                                textUpdate({ ...textStore.selectedItem, lineHeight: Number(e.target.value) });
                                let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                historyState['text'].items.map((item) => {
                                    if (item.id == textStore.selectedItem.id) {
                                        item.lineHeight = Number(e.target.value);
                                    }
                                });
                                appSetHistory(historyState);
                            }}
                        />
                    </div>
                </div>
                <div className="splitter"></div>
                <div className="layout-text-shadow layout-menu-padding">
                    <div style={{ textAlign: "left" }} className={textStore.selectedItem && "rme-control-enable" || "rme-control-disabled"}>
                        <label className="rme-checkbox-container"><span>Add Text Shadow</span>
                            <input type="checkbox"
                                checked={textStore.selectedItem && textStore.selectedItem.shadowEnabled || false}
                                onChange={e => {
                                    textSetShadow({ shadowEnabled: e.target.checked });
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['text'].items.map((item) => {
                                        if (item.id == textStore.selectedItem.id) {
                                            item.shadowEnabled = e.target.checked;
                                        }
                                    });
                                    appSetHistory(historyState);
                                }} />
                            <span className="rme-checkmark"></span>
                        </label>
                        <span style={{ color: "#000", textAlign: "left", fontFamily: "'Roboto', sans-serif", fontSize: "12px", lineHeight: "1.8" }}>Color</span>
                        <ColorPicker
                            showType="color"
                            showText={textStore.selectedItem && textStore.selectedItem.shadowColor || '#000'}
                            value={textStore.selectedItem && textStore.selectedItem.shadowColor || '#000'}
                            onChange={value => {
                                textSetShadow({ shadowColor: value });
                                let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                historyState['text'].items.map((item) => {
                                    if (item.id == textStore.selectedItem.id) {
                                        item.shadowColor = value;
                                    }
                                });
                                appSetHistory(historyState);
                            }} />
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Blur</span>
                                <span className="rme-control-value">{textStore.selectedItem && textStore.selectedItem.shadowBlur || textStore.shadow.shadowBlur}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="0"
                                max="40"
                                step="1"
                                value={textStore.selectedItem && textStore.selectedItem.shadowBlur || textStore.shadow.shadowBlur}
                                onChange={(e) => {
                                    textSetShadow({ shadowBlur: e.target.value });
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['text'].items.map((item) => {
                                        if (item.id == textStore.selectedItem.id) {
                                            item.shadowBlur = e.target.value;
                                        }
                                    });
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Opacity</span>
                                <span className="rme-control-value">{textStore.selectedItem && textStore.selectedItem.shadowOpacity || textStore.shadow.shadowOpacity}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                value={textStore.selectedItem && textStore.selectedItem.shadowOpacity || textStore.shadow.shadowOpacity}
                                onChange={(e) => {
                                    textSetShadow({ shadowOpacity: e.target.value });
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['text'].items.map((item) => {
                                        if (item.id == textStore.selectedItem.id) {
                                            item.shadowOpacity = e.target.value;
                                        }
                                    });
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Offset X</span>
                                <span className="rme-control-value">{textStore.selectedItem && textStore.selectedItem.shadowOffsetX || textStore.shadow.shadowOffset.x}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="-50"
                                max="50"
                                step="1"
                                value={textStore.selectedItem && textStore.selectedItem.shadowOffsetX || textStore.shadow.shadowOffset.x}
                                onChange={(e) => {
                                    textSetShadow({ shadowOffset: { ...textStore.shadow.shadowOffset, x: e.target.value } });
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['text'].items.map((item) => {
                                        if (item.id == textStore.selectedItem.id) {
                                            item.shadowOffset.x = e.target.value;
                                        }
                                    });
                                    appSetHistory(historyState);
                                }} />
                        </div>
                        <div className="rme-range-slider">
                            <div className="rme-range-slider__title">
                                <span>Offset Y</span>
                                <span className="rme-control-value">{textStore.selectedItem && textStore.selectedItem.shadowOffsetY || textStore.shadow.shadowOffset.y}</span>
                            </div>
                            <input className="rme-range-slider__range"
                                type="range"
                                min="-50"
                                max="50"
                                step="1"
                                value={textStore.selectedItem && textStore.selectedItem.shadowOffsetY || textStore.shadow.shadowOffset.y}
                                onChange={(e) => {
                                    textSetShadow({ shadowOffset: { ...textStore.shadow.shadowOffset, y: e.target.value } });
                                    let historyState = _.cloneDeep(appStore.appHistory[appStore.appHistoryStep]);
                                    historyState['text'].items.map((item) => {
                                        if (item.id == textStore.selectedItem.id) {
                                            item.shadowOffset.y = e.target.value;
                                        }
                                    });
                                    appSetHistory(historyState);
                                }} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    </React.Fragment>
}
