export const initState = {
    showApp: false,
    appHistory: [],
    appHistoryStep: 0,
    appActionFire: false,
    appUndoFire: false,
    appRedoFire: false,
    appExportFire: false,
    appScaleBy: 1.1,
    appScale: 1,
    appScaleStep: 0,
    menu: null,
    fullScreen: true,
    workspaceWidth: 0,
    workspaceHeight: 0
};

export function appReducer(state = initState, action) {
    switch (action.type) {
        case 'APP_INIT_STATE':
            return {
                ...state,
                showApp: false,
                appHistory: [],
                appHistoryStep: 0,
                appActionFire: false,
                appUndoFire: false,
                appRedoFire: false,
                appExportFire: false,
                appScaleBy: 1.1,
                appScale: 1,
                appScaleStep: 0,
                menu: null,
                fullScreen: true,
                workspaceWidth: 0,
                workspaceHeight: 0
            }
        case 'APP_TOGGLE_SHOW':
            return {
                ...state,
                showApp: !state.showApp
            }
        case 'APP_INIT_HISTORY':
            return {
                ...state,
                appHistory: state.appHistory.concat(action.data),
            }
        case 'APP_SET_HISTORY':
            let newHistory = state.appHistory.slice(0, state.appHistoryStep + 1)
            newHistory = newHistory.concat(action.data)
            return {
                ...state,
                appHistory: newHistory,
                appHistoryStep: state.appHistoryStep + 1
            }
        case 'APP_UNDO':
            if (state.appHistoryStep === 0) {
                return { ...state }
            }
            return {
                ...state,
                appHistoryStep: state.appHistoryStep - 1,
                appActionFire: !state.appActionFire,
                appUndoFire: !state.appUndoFire
            }
        case 'APP_REDO':
            if (state.appHistoryStep == (state.appHistory.length - 1)) {
                return { ...state }
            }
            return {
                ...state,
                appHistoryStep: state.appHistoryStep + 1,
                appActionFire: !state.appActionFire,
                appRedoFire: !state.appRedoFire
            }
        case 'APP_UPDATE_WORKSPACE':
            return {
                ...state,
                workspaceWidth: action.width,
                workspaceHeight: action.height,
            }
        case 'APP_CHANGE_MENU':
            return {
                ...state,
                menu: action.data
            }
        case 'APP_CHANGE_FULLSCREEN':
            return {
                ...state,
                fullScreen: action.data
            }
        case 'APP_EXPORT_IMAGE':
            return {
                ...state,
                appExportFire: !state.appExportFire
            }
        case 'APP_ZOOM_IN':
            if (state.appScaleStep > 3) return;
            return {
                ...state,
                appScale: state.appScale * state.appScaleBy,
                appScaleStep: state.appScaleStep + 1
            }
        case 'APP_ZOOM_OUT':
            if (state.appScaleStep < -1) return;
            return {
                ...state,
                appScale: state.appScale / state.appScaleBy,
                appScaleStep: state.appScaleStep - 1
            }
        default:
            return state;
    }
}
