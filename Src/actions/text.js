import { useContext } from 'react';
import { RmeContext } from "../reducers/index";

//Action cập nhật các state
export const textAction = () => {
    const { state, dispatch } = useContext(RmeContext);

    const textInitState = () => {
        dispatch({ type: "TEXT_INIT_STATE" })
    }
    const textSetSelected = (data) => {
        dispatch({ data, type: "TEXT_SELECTED" })
    }

    const textRemoveSelected = () => {
        dispatch({ type: "TEXT_REMOVE_SELECTED" })
    }

    const textMoveSelected = (move) => {
        dispatch({ move, type: "TEXT_MOVE_SELECTED" })
    }

    const textAdd = (data) => {
        if (!data) {
            return;
        }
        dispatch({ data, type: "TEXT_ADD" })
    }

    const textClone = (data) => {
        dispatch({ data, type: "TEXT_CLONE" })
    }

    const textUpdate = (data) => {
        if (!data) {
            return;
        }
        dispatch({ data, type: "TEXT_UPDATE_SELECTED" })
    }

    const textDelete = (data) => {
        if (!data) {
            return;
        }
        dispatch({ data, type: "TEXT_DELETE_SELECTED" })
    }
    const textSetShadow = (data) => {
        dispatch({ data, type: "TEXT_UPDATE_SHADOW" })
    }


    return {
        textStore: state.textReducer || {},
        textInitState,
        textSetSelected,
        textRemoveSelected,
        textMoveSelected,
        textAdd,
        textClone,
        textUpdate,
        textDelete,
        textSetShadow,
    }
}