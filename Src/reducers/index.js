import React, { useReducer } from 'react';
import { appReducer, initState as initAppState } from './app';
import { templateReducer, initState as initTemplateState } from './template';
import { imageReducer, initState as initImageState } from './image';
import { backgroundReducer, initState as initBackgroundState } from './background';
import { textReducer, initState as initTextState } from './text';
import { shapeReducer, initState as initShapeState } from './shape';

export const RmeContext = React.createContext(null);

export const RmeProvider = ({ children }) => {
    const rootReducer = combineReducers({
        appReducer,
        templateReducer,
        backgroundReducer,
        imageReducer,
        textReducer,
        shapeReducer
    });

    const initState = {
        appReducer: initAppState,
        templateReducer: initTemplateState,
        imageReducer: initImageState,
        backgroundReducer: initBackgroundState,
        textReducer: initTextState,
        shapeReducer: initShapeState
    }

    const [state, dispatch] = useReducer(rootReducer, initState);

    return (
        <RmeContext.Provider value={{ state, dispatch }}>
            {children}
        </RmeContext.Provider>
    );
};

// Helper
function combineReducers(reducerDict) {
    const _initialState = getInitialState(reducerDict);
    return function (state = _initialState, action) {
        return Object.keys(reducerDict).reduce((acc, curr) => {
            let slice = reducerDict[curr](state[curr], action);
            return { ...acc, [curr]: slice };
        }, state);
    };
}

function getInitialState(reducerDict) {
    return Object.keys(reducerDict).reduce((acc, curr) => {
        const slice = reducerDict[curr](undefined, { type: undefined });
        return { ...acc, [curr]: slice };
    }, {});
}