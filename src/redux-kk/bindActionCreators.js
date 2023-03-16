const bindActionCreator = (creator, dispatch) => {
    return (...args) => dispatch(creator(...args))
}

export default function bindActionCreators(creators, dispatch) {
    const obj = {};

    for(const key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch);
    }

    return obj;
}