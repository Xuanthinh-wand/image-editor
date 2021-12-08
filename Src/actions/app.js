import { useContext } from 'react';
import { RmeContext } from "../reducers/index";

//Action cập nhật các state
export const appAction = () => {
    const { state, dispatch } = useContext(RmeContext);

    const appInitState = () => {
        dispatch({ type: "APP_INIT_STATE" })
    }

    const appToggleShow = () => {
        dispatch({ type: "APP_TOGGLE_SHOW" })
    }

    const appInitHistory = (data) => {
        dispatch({ data, type: "APP_INIT_HISTORY" })
    }

    const appSetHistory = (data) => {
        dispatch({ data, type: "APP_SET_HISTORY" })
    }

    const appUndo = () => {
        dispatch({ type: "APP_UNDO" })
    }

    const appRedo = () => {
        dispatch({ type: "APP_REDO" })
    }

    const appUpdateWorkspace = (width, height) => {
        dispatch({ width, height, type: "APP_UPDATE_WORKSPACE" })
    }

    const appChangeMenu = (value) => {
        dispatch({ data: value, type: "APP_CHANGE_MENU" })
    }

    const appChangeFullScreen = (value) => {
        dispatch({ data: value, type: "APP_CHANGE_FULLSCREEN" })
    }

    const appExportImage = () => {
        dispatch({ type: "APP_EXPORT_IMAGE" })
    }

    const appZoomIn = () => {
        dispatch({ type: "APP_ZOOM_IN" })
    }

    const appZoomOut = () => {
        dispatch({ type: "APP_ZOOM_OUT" })
    }

    return {
        appStore: state.appReducer,
        appInitState,
        appToggleShow,
        appExportImage,
        appInitHistory,
        appSetHistory,
        appUndo,
        appRedo,
        appUpdateWorkspace,
        appChangeMenu,
        appChangeFullScreen,
        appZoomIn,
        appZoomOut
    }
}
