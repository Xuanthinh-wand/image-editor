
export const initState = {
    image: null,
    fill: "#FFFFFF",
    fillPatternScale: 1,
    fillScaleToFit: "full-width",
    fillPatternRepeat: "repeat",
    fillPatternRotation: 0,
    fillPatternX: 0,
    fillPatternY: 0,
    blur: 0,
    brightness: 0,
    contrast: 0,
    noise: 0,
    imageUploads: []
};

export function backgroundReducer(state = initState, action) {
    switch (action.type) {
        case 'BACKGROUND_INIT_STATE':
            return {
                ...state,
                image: null,
                fill: "#FFFFFF",
                fillPatternScale: 1,
                fillScaleToFit: "full-width",
                fillPatternRepeat: "repeat",
                fillPatternRotation: 0,
                fillPatternX: 0,
                fillPatternY: 0,
                blur: 0,
                brightness: 0,
                contrast: 0,
                noise: 0,
                imageUploads: []
            }
        case 'BACKGROUND_SET_STATE':
            // const imagesUpload = JSON.parse(JSON.stringify(state.imageUploads))
            // imagesUpload.unshift(action.data.imageUploads);
            return {
                ...state,
                image: action.data.image,
                fill: action.data.fill,
                fillPatternScale: action.data.fillPatternScale,
                fillScaleToFit: action.data.fillScaleToFit,
                fillPatternRepeat: action.data.fillPatternRepeat,
                fillPatternRotation: action.data.fillPatternRotation,
                fillPatternX: action.data.fillPatternX,
                fillPatternY: action.data.fillPatternY,
                blur: action.data.blur,
                brightness: action.data.brightness,
                contrast: action.data.contrast,
                noise: action.data.noise,
                // imageUploads: [...imagesUpload]
            }
        case 'BACKGROUND_UPDATE_IMAGE':
            return {
                ...state,
                fill: null,
                image: action.data
            }
        case 'BACKGROUND_UPLOAD_IMAGE':
            const images = JSON.parse(JSON.stringify(state.imageUploads))
            images.unshift(action.data);

            return {
                ...state,
                imageUploads: [...images]
            }
        case 'BACKGROUND_UPDATE_IMAGE_SCALE':
            return {
                ...state,
                fillPatternScale: action.data
            }
        case 'BACKGROUND_UPDATE_IMAGE_SCALE_TO_FIT':
            return {
                ...state,
                fillScaleToFit: action.data
            }
        case 'BACKGROUND_UPDATE_IMAGE_SETTING':
            return {
                ...state,
                ...action.data
            }
        case 'BACKGROUND_UPDATE_IMAGE_REPEAT':
            return {
                ...state,
                fillPatternRepeat: action.data
            }
        case 'BACKGROUND_UPDATE_IMAGE_ROTATION':
            return {
                ...state,
                fillPatternRotation: action.data
            }
        case 'BACKGROUND_UPDATE_IMAGE_PATTERN_X':
            return {
                ...state,
                fillPatternX: action.data
            }
        case 'BACKGROUND_UPDATE_IMAGE_PATTERN_Y':
            return {
                ...state,
                fillPatternY: action.data
            }
        case 'BACKGROUND_UPDATE_FILL':
            return {
                ...state,
                fill: action.data,
                image: null
            }
        case 'BACKGROUND_UPDATE_BLUR':
            return {
                ...state,
                blur: action.data
            }
        case 'BACKGROUND_UPDATE_BRIGHTNESS':
            return {
                ...state,
                brightness: action.data
            }
        case 'BACKGROUND_UPDATE_CONTRAST':
            return {
                ...state,
                contrast: action.data
            }
        default:
            return state;
    }
}
