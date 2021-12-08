import { useContext } from 'react';
import { RmeContext } from "../reducers/index";

//Action cập nhật các state
export const backgroundAction = () => {
    const { state, dispatch } = useContext(RmeContext);

    const backgroundInitState = () => {
        dispatch({ type: "BACKGROUND_INIT_STATE" })
    }
    const backgroundSetState = (value) => {
        dispatch({ data: value, type: "BACKGROUND_SET_STATE" });
    }
    const backgroundSetImage = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_IMAGE" })
    }
    const backgroundUploadImage = (data) => {
        dispatch({ data, type: "BACKGROUND_UPLOAD_IMAGE" })
    }
    const backgroundSetImageScale = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_IMAGE_SCALE" })
    }
    const backgroundSetImageScaleToFit = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_IMAGE_SCALE_TO_FIT" })
    }
    const backgroundSetImageSetting = (data) => {
        dispatch({ data, type: "BACKGROUND_UPDATE_IMAGE_SETTING" })
    }
    const backgroundSetImageRepeat = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_IMAGE_REPEAT" })
    }
    const backgroundSetImageRotation = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_IMAGE_ROTATION" })
    }
    const backgroundSetImagePatternX = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_IMAGE_PATTERN_X" })
    }
    const backgroundSetImagePatternY = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_IMAGE_PATTERN_Y" })
    }
    const backgroundSetFill = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_FILL" })
    }
    const backgroundSetBlur = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_BLUR" })
    }
    const backgroundSetBrightness = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_BRIGHTNESS" })
    }
    const backgroundSetContrast = (value) => {
        dispatch({ data: value, type: "BACKGROUND_UPDATE_CONTRAST" })
    }

    return {
        backgroundStore: state.backgroundReducer || {},
        backgroundInitState,
        backgroundSetState,
        backgroundSetImage,
        backgroundUploadImage,
        backgroundSetImageScale,
        backgroundSetImageScaleToFit,
        backgroundSetImageSetting,
        backgroundSetImageRepeat,
        backgroundSetImageRotation,
        backgroundSetImagePatternX,
        backgroundSetImagePatternY,
        backgroundSetFill,
        backgroundSetBlur,
        backgroundSetBrightness,
        backgroundSetContrast
    }
}
