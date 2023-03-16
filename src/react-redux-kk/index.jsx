import { useContext, useLayoutEffect, useState, createContext, useCallback } from "react";
import { bindActionCreators } from "../redux-kk";

const Context = createContext();

export function Provider ({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

export const connect =  (mapStateToProps, mapDispatchToProps) => (WrapperComponent) => (props) => {
    const store = useContext(Context);
    const { getState, dispatch, subscribe } = store;

    const stateProps = mapStateToProps(getState());
    let dispatchProps = { dispatch };

    if(typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch);
    }else if(typeof mapDispatchToProps === 'object'){
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    const forceUpdate = useForceUpdate();

    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate();
        })

        return () => { unsubscribe() };
    }, [subscribe])

    return <WrapperComponent {...props} {...stateProps} {...dispatchProps} />
}

const useForceUpdate = () => {
    const [state, setState] = useState(0);
    const update = useCallback(() => {
        setState((prev) => prev + 1)
    }, []);

    return update;
}

export function useSelector(selector) {
    const store = useContext(Context);
    const { getState, subscribe } = store;

    const selectedState = selector(getState())

    const forceUpdate = useForceUpdate();

    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate();
        })

        return () => { unsubscribe() };
    }, [subscribe]);

    return selectedState;
}

export function useDispatch() {
    const store = useContext(Context);
    const { dispatch } = store;

    return dispatch;
}