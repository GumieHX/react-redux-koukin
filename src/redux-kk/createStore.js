export default function createStore (reducer, enhander) {

    if(enhander) return enhander(createStore)(reducer);

    let currentState;
    let currentListeners = [];

    const dispatch = (action) => {
        currentState = reducer(currentState, action)
        currentListeners.forEach((listener) => listener())
    }

    const getState = () => currentState;

    const subscribe = (listener) => {
        currentListeners.push(listener)

        return () => {
            const index = currentListeners.findIndex(listener)
            currentListeners.splice(index, 1)
        } 
    }
    
    dispatch({ type: 'reduxFristLoad'})

    return {
        dispatch,
        getState,
        subscribe
    }
}