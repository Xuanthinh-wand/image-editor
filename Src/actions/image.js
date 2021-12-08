import { useContext } from 'react';
import { RmeContext } from "../reducers";

//Action cập nhật các state
export const imageAction = () => {
    const { state, dispatch } = useContext(RmeContext);

    const imageInitState = () => {
        dispatch({ type: "IMAGE_INIT_STATE" })
    }
    const imageSetState = (data) => {
        dispatch({ data, type: "IMAGE_SET_STATE" });
    }
    const imageSetImage = (url) => {
        dispatch({ data: url, type: "IMAGE_UPDATE_IMAGE" })
    }
    const imageMove = (move) => {
        dispatch({ move, type: "IMAGE_MOVE" })
    }
    const imageSetEraseMode = (mode = false) => {
        dispatch({ mode, type: "IMAGE_SET_ERASE_MODE" })
    }
    const imageSetEraseBursh = (brushSize = 20, brushOpacity = 1) => {
        dispatch({ brushSize, brushOpacity, type: "IMAGE_SET_ERASE_BRUSH" })
    }
    const imageSetClone = (data) => {
        dispatch({ data, type: "IMAGE_SET_CLONE" })
    }
    const imageUseClone = () => {
        dispatch({ type: "IMAGE_USE_CLONE" })
    }
    const imageSetX = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_X" })
    }
    const imageSetY = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_Y" })
    }
    const imageSetWidth = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_WIDTH" })
    }
    const imageSetHeight = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_HEIGHT" })
    }
    const imageSetScaleX = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_SCALEX" })
    }
    const imageSetScaleY = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_SCALEY" })
    }
    const imageSetRotation = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_ROTATION" })
    }
    const imageSetFill = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_FILL" })
    }
    const imageSetOpacity = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_OPACITY" })
    }
    const imageSetBlur = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_BLUR" })
    }
    const imageSetBrightness = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_BRIGHTNESS" })
    }
    const imageSetContrast = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_CONTRAST" })
    }
    const imageSetNoise = (value) => {
        dispatch({ data: value, type: "IMAGE_UPDATE_NOISE" })
    }
    const imageSetShadow = (data) => {
        dispatch({ data, type: "IMAGE_UPDATE_SHADOW" })
    }

    return {
        imageStore: state.imageReducer || {},
        imageInitState,
        imageSetState,
        imageSetImage,
        imageMove,
        imageSetEraseMode,
        imageSetEraseBursh,
        imageSetClone,
        imageUseClone,
        imageSetX,
        imageSetY,
        imageSetWidth,
        imageSetHeight,
        imageSetScaleX,
        imageSetScaleY,
        imageSetRotation,
        imageSetFill,
        imageSetOpacity,
        imageSetBlur,
        imageSetBrightness,
        imageSetContrast,
        imageSetNoise,
        imageSetShadow,
    }
}
