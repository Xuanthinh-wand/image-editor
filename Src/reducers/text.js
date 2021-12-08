
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

export function textReducer(state = initState, action) {
    let index;
    switch (action.type) {
        case 'TEXT_INIT_STATE':
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
        case 'TEXT_ADD':
            return {
                ...state,
                items: [...state.items, action.data]
            }
        case 'TEXT_CLONE':
            let newText = {
                ...state.selectedItem,
                id: action.data,
                x: state.selectedItem.x + 10,
                y: state.selectedItem.y + 10
            };
            return {
                ...state,
                items: [...state.items, newText]
            }
        case 'TEXT_SELECTED':
            return {
                ...state,
                selectedItem: action.data
            }
        case 'TEXT_REMOVE_SELECTED':
            return {
                ...state,
                removeSelected: !state.removeSelected
            }
        case 'TEXT_MOVE_SELECTED':
            return {
                ...state,
                moveSelected: { ...state.moveSelected, type: action.move, action: !state.moveSelected.action }
            }
        case 'TEXT_UPDATE_SELECTED':
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
        case 'TEXT_DELETE_SELECTED':
            if (!state.selectedItem) {
                return {
                    ...state
                }
            }
            state.items = state.items.filter(item => item.id != state.selectedItem.id);
            return {
                ...state
            }
        case 'TEXT_UPDATE_SHADOW':
            if (!state.selectedItem) {
                return {
                    ...state
                }
            }

            index = state.items.findIndex(item => item.id == state.selectedItem.id);

            if (index >= 0) {
                state.items[index] = { ...state.items[index], ...action.data };
                state.selectedItem = { ...state.selectedItem, ...action.data };
            }
            return {
                ...state,
            }
        default:
            return state;
    }
}
