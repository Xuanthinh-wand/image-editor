import React, { useState, useEffect } from 'react';
import { templateAction } from "../../actions/template"
import { appAction } from '../../actions/app';
import _ from 'lodash';

export default function ControlbarPage(props) {
    const { appUndo, appRedo } = appAction();
    const { templateStore, templateZoom, zoomIn, zoomOut } = templateAction();

    return <React.Fragment>
        <div className="rme-main-control">
            {/* <div className="rme-main-control--group">
                <button className="rme-form-control rme-button circle" onClick={() => appUndo()}>
                    <i className="fa fa-undo"></i>
                </button>
                <button className="rme-form-control rme-button circle" onClick={() => appRedo()}>
                    <i className="fa fa-redo"></i>
                </button>
            </div> */}
            <div className="rme-main-control--group">
                <button className="rme-form-control rme-button circle" onClick={() => zoomIn()}>
                    <i className="fa fa-search-minus"></i>
                </button>
                <button className="rme-form-control rme-button circle" onClick={() => zoomOut()}>
                    <i className="fa fa-search-plus"></i>
                </button>
            </div>
        </div>
    </React.Fragment>
}
