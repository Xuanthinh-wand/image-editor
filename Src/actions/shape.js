import { useContext } from 'react';
import { RmeContext } from "../reducers/index";

//Action cập nhật các state
export const shapeAction = () => {
    const { state, dispatch } = useContext(RmeContext);

    const shapeInitState = () => {
        dispatch({ type: "SHAPE_INIT_STATE" })
    }

    const shapeSetSelected = (data) => {
        dispatch({ data, type: "SHAPE_SELECTED" })
    }

    const shapeRemoveSelected = () => {
        dispatch({ type: "SHAPE_REMOVE_SELECTED" })
    }

    const shapeMoveSelected = (move) => {
        dispatch({ move, type: "SHAPE_MOVE_SELECTED" })
    }

    const shapeAdd = (data) => {
        if (!data) {
            return;
        }
        dispatch({ data, type: "SHAPE_ADD" })
    }

    const shapeUpdate = (data) => {
        if (!data) {
            return;
        }
        dispatch({ data, type: "SHAPE_UPDATE_SELECTED" })
    }

    const shapeDelete = (data) => {
        if (!data) {
            return;
        }
        dispatch({ data, type: "SHAPE_DELETE_SELECTED" })
    }

    const shapeSetShadow = (data) => {
        dispatch({ data, type: "SHAPE_UPDATE_SHADOW" })
    }

    return {
        shapeStore: state.shapeReducer || {},
        shapeInitState,
        shapeSetSelected,
        shapeRemoveSelected,
        shapeMoveSelected,
        shapeAdd,
        shapeUpdate,
        shapeDelete,
        shapeSetShadow
    }
}