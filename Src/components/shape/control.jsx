import React from 'react';
import ColorPicker from '../../controls/colorpicker';
import { shapeAction } from '../../actions/shape';
import { shapes } from '../../constants/shape';

export default function ShapeControlPage(props) {

    const { shapeStore, shapeAdd, shapeUpdate, shapeRemoveSelected, shapeMoveSelected, shapeSetShadow } = shapeAction();

    const removalSVGUrl = "https://removal.ai/wp-content/uploads/rme/svg";

    return <React.Fragment>
        <div className="layout-menu layout-text">
            {
                shapeStore.selectedItem && <React.Fragment>
                    <h3>Shape style</h3>
                    <div className="splitter"></div>

                </React.Fragment>
            }
            <h3>Shape</h3>
            {
                shapes && shapes.map(item => {
                    return <img key={item.name} onClick={() => {
                        shapeAdd({
                            id: `shape-${Date.now()}`,
                            data: item.path,
                            scale: {
                                x: 0.2,
                                y: 0.2,
                            },
                            fill: "#000"
                        })
                    }} style={{ width: "50px", cursor: "pointer" }} src={`${removalSVGUrl}/${item.name}.svg`} />
                })
            }
        </div>
    </React.Fragment>
}