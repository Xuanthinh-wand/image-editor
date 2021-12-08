import { useContext } from 'react';
import { RmeContext } from "../reducers/index";

//Action cập nhật các state
export const templateAction = () => {
    const { state, dispatch } = useContext(RmeContext);

    const templateInitState = () => {
        dispatch({ type: "TEMPLATE_INIT_STATE" })
    }
    const templateChangeExportSize = (width, height) => {
        dispatch({ width, height, type: "TEMPLATE_CHANGE_EXPORT_SIZE" })
    }
    const templateUpdateSize = (exportWidth, exportHeight, defaultWidth, defaultHeight) => {
        dispatch({ exportWidth, exportHeight, defaultWidth, defaultHeight, type: "TEMPLATE_UPDATE_SIZE" })
    }

    const templateZoom = (scaleX, scaleY, defaultWidth, defaultHeight) => {
        dispatch({ scaleX, scaleY, defaultWidth, defaultHeight, type: "TEMPLATE_ZOOM" })
    }

    const zoomIn = () => {
        if (state.templateReducer.defaultWidth >= 200) {
            const scaleX = state.templateReducer.scaleX / 1.2;
            const scaleY = state.templateReducer.scaleY / 1.2;
            const defaultWidth = state.templateReducer.defaultWidth / 1.2;
            const defaultHeight = state.templateReducer.defaultHeight / 1.2;

            dispatch({ scaleX, scaleY, defaultWidth, defaultHeight, type: "TEMPLATE_ZOOM" })
        }
    }
    const zoomOut = () => {
        if (state.templateReducer.defaultWidth <= 3000) {
            const scaleX = state.templateReducer.scaleX * 1.2;
            const scaleY = state.templateReducer.scaleY * 1.2;
            const defaultWidth = state.templateReducer.defaultWidth * 1.2;
            const defaultHeight = state.templateReducer.defaultHeight * 1.2;

            dispatch({ scaleX, scaleY, defaultWidth, defaultHeight, type: "TEMPLATE_ZOOM" })
        }
    }

    return {
        templateStore: state.templateReducer || {},
        templateInitState,
        templateChangeExportSize,
        templateUpdateSize,
        templateZoom,
        zoomIn,
        zoomOut
    }
}