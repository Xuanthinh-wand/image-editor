
export const initState = {
    exportWidth: 1280,
    exportHeight: 720,
    defaultWidth: 740,
    defaultHeight: 740 * 720 / 1280,
    boundingWidth: 740,
    boundingHeight: 740 * 720 / 1280,
    scaleX: 1,
    scaleY: 1,
};

export function templateReducer(state = initState, action) {
    switch (action.type) {
        case 'TEMPLATE_INIT_STATE':
            return {
                ...state,
                exportWidth: 1280,
                exportHeight: 720,
                defaultWidth: 740,
                defaultHeight: 740 * 720 / 1280,
                scaleX: 1,
                scaleY: 1,
            }
        case 'TEMPLATE_CHANGE_EXPORT_SIZE':
            let newHeight = action.height, newWidth = action.width;
            if (newWidth > 740 || newHeight > 740 * 720 / 1280) {
                if (newHeight > newWidth) {
                    if (newHeight > 600) {
                        newHeight = 600;
                        newWidth = 600 * action.width / action.height;
                    }
                    if (newWidth > 740) {
                        newHeight = 740 * newHeight / newWidth;
                        newWidth = 740;
                    }
                } else {
                    newWidth = 740;
                    newHeight = 740 * action.height / action.width;

                    if (newHeight > 600) {
                        newWidth = 600 * action.width / action.height;
                        newHeight = 600;
                    }
                }
            }

            return {
                ...state,
                exportWidth: action.width,
                exportHeight: action.height,
                defaultWidth: newWidth,
                defaultHeight: newHeight,
            }
        case 'TEMPLATE_UPDATE_SIZE':
            return {
                ...state,
                exportWidth: action.exportWidth,
                exportHeight: action.exportHeight,
                defaultWidth: action.defaultWidth,
                defaultHeight: action.defaultHeight,
            }
        case 'TEMPLATE_ZOOM':
            return {
                ...state,
                scaleX: action.scaleX,
                scaleY: action.scaleY,
                defaultWidth: action.defaultWidth,
                defaultHeight: action.defaultHeight
            }
        default:
            return state;
    }
}
