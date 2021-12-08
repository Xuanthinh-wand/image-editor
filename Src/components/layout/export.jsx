import React from 'react';
import { appAction } from '../../actions/app';
import _ from 'lodash';

export default function ExportControl(props) {
    const { appExportImage } = appAction();

    return <React.Fragment>
        <div className="export-control">
            <button onClick={() => appExportImage()} className="rme-form-control rme-button-simple">Download Image</button>
        </div>
    </React.Fragment>
}