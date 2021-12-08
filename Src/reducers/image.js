
export const initState = {
    url: null,
    moveImage: {
        type: "",
        action: false
    },
    eraseMode: false,
    eraseBrushSize: 20,
    eraseBrushOpacity: 1,
    imageClone: null,
    useImageClone: true,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    width: 100,
    height: 100,
    opacity: 1,
    fill: null,
    shadow: {
        shadowEnabled: false,
        shadowColor: '#000',
        shadowBlur: 10,
        shadowOffset: { x: 10, y: 10 },
        shadowOpacity: 0.5,
    },
    blur: 0,
    brightness: 0,
    contrast: 0,
    noise: 0,
};

export function imageReducer(state = initState, action) {
    switch (action.type) {
        case 'IMAGE_INIT_STATE':
            return {
                ...state,
                url: null,
                moveImage: {
                    type: "",
                    action: false
                },
                eraseMode: false,
                eraseBrushSize: 20,
                eraseBrushOpacity: 1,
                imageClone: null,
                useImageClone: true,
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                width: 10,
                height: 10,
                opacity: 1,
                fill: null,
                shadow: {
                    shadowEnabled: false,
                    shadowColor: '#000',
                    shadowBlur: 10,
                    shadowOffset: { x: 10, y: 10 },
                    shadowOpacity: 0.5,
                },
                blur: 0,
                brightness: 0,
                contrast: 0,
                noise: 0,
            }
        case 'IMAGE_SET_STATE':
            return {
                ...state,
                url: action.data.url,
                moveImage: action.data.moveImage,
                eraseMode: action.data.eraseMode,
                eraseBrushSize: action.data.eraseBrushSize,
                eraseBrushOpacity: action.data.eraseBrushOpacity,
                imageClone: null,
                useImageClone: true,
                x: action.data.x,
                y: action.data.y,
                scaleX: action.data.scaleX,
                scaleY: action.data.scaleY,
                width: action.data.width,
                height: action.data.height,
                opacity: action.data.opacity,
                fill: action.data.fill,
                shadow: action.data.shadow,
                blur: action.data.blur,
                brightness: action.data.brightness,
                contrast: action.data.contrast,
                noise: action.data.noise,
            }
        case 'IMAGE_UPDATE_IMAGE':
            return {
                ...state,
                url: action.data
            }
        case 'IMAGE_MOVE':
            return {
                ...state,
                moveImage: { ...state.moveImage, type: action.move, action: !state.moveImage.action }
            }
        case 'IMAGE_SET_ERASE_MODE':
            return {
                ...state,
                eraseMode: action.mode,
            }

        case 'IMAGE_SET_ERASE_BRUSH':
            return {
                ...state,
                eraseBrushSize: action.brushSize,
                eraseBrushOpacity: action.brushOpacity
            }
        case 'IMAGE_SET_CLONE':
            return {
                ...state,
                imageClone: action.data,
            }
        case 'IMAGE_USE_CLONE':
            return {
                ...state,
                useImageClone: !state.useImageClone,
            }
        case 'IMAGE_UPDATE_X':
            return {
                ...state,
                x: action.data,
            }
        case 'IMAGE_UPDATE_Y':
            return {
                ...state,
                y: action.data,
            }
        case 'IMAGE_UPDATE_WIDTH':
            return {
                ...state,
                width: action.data,
            }
        case 'IMAGE_UPDATE_HEIGHT':
            return {
                ...state,
                height: action.data,
            }
        case 'IMAGE_UPDATE_SCALEX':
            return {
                ...state,
                scaleX: action.data,
            }
        case 'IMAGE_UPDATE_SCALEY':
            return {
                ...state,
                scaleY: action.data,
            }
        case 'IMAGE_UPDATE_ROTATION':
            return {
                ...state,
                rotation: action.data,
            }
        case 'IMAGE_UPDATE_FILL':
            return {
                ...state,
                fill: action.data,
            }
        case 'IMAGE_UPDATE_OPACITY':
            return {
                ...state,
                opacity: action.data,
            }
        case 'IMAGE_UPDATE_BLUR':
            return {
                ...state,
                blur: action.data
            }
        case 'IMAGE_UPDATE_BRIGHTNESS':
            return {
                ...state,
                brightness: action.data
            }
        case 'IMAGE_UPDATE_CONTRAST':
            return {
                ...state,
                contrast: action.data
            }
        case 'IMAGE_UPDATE_NOISE':
            return {
                ...state,
                noise: action.data
            }
        case 'IMAGE_UPDATE_SHADOW':
            return {
                ...state,
                shadow: { ...state.shadow, ...action.data }
            }
        default:

            return state;
    }
}
