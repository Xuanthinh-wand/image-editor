
export const initState = {
    items: [],
    selectedItem: null,
    removeSelected: false,
    moveSelected: {
        type: "",
        action: false
    },
    shadow: {
        shadowEnabled: false,
        shadowColor: '#000',
        shadowBlur: 3,
        shadowOffset: { x: 5, y: 5 },
        shadowOpacity: 0.5,
    },
};

export function shapeReducer(state = initState, action) {
    let index;
    switch (action.type) {
        case 'SHAPE_INIT_STATE':
            return {
                ...state,
                items: [],
                selectedItem: null,
                removeSelected: false,
                moveSelected: {
                    type: "",
                    action: false
                },
                shadow: {
                    shadowEnabled: false,
                    shadowColor: '#000',
                    shadowBlur: 3,
                    shadowOffset: { x: 5, y: 5 },
                    shadowOpacity: 0.5,
                },
            }
        case 'SHAPE_ADD':
            return {
                ...state,
                items: [...state.items, action.data]
            }
        case 'SHAPE_SELECTED':
            return {
                ...state,
                selectedItem: action.data
            }
        case 'SHAPE_REMOVE_SELECTED':
            return {
                ...state,
                removeSelected: !state.removeSelected
            }
        case 'SHAPE_MOVE_SELECTED':
            return {
                ...state,
                moveSelected: { ...state.moveSelected, type: action.move, action: !state.moveSelected.action }
            }
        case 'SHAPE_UPDATE_SELECTED':
            if (!state.selectedItem) {
                return {
                    ...state
                }
            }
            delete action.data.draggable;
            index = state.items.findIndex(item => item.id == state.selectedItem.id);
            if (index >= 0) {
                state.items[index] = action.data;
                state.selectedItem = { ...action.data }
            }
            return {
                ...state
            }
        case 'SHAPE_DELETE_SELECTED':
            if (!state.selectedItem) {
                return {
                    ...state
                }
            }
            state.items = state.items.filter(item => item.id != state.selectedItem.id);
            return {
                ...state
            }
        case 'SHAPE_UPDATE_SHADOW':
            return {
                ...state,
                shadow: { ...state.shadow, ...action.data }
            }
        default:
            return state;
    }
}