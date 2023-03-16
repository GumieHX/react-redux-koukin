import { Component } from "react";
import { connect } from "../react-redux-kk";
import { bindActionCreators } from "../redux-kk/";

export default connect(
    ({ count }) => ({ count }),
    (dispatch) => {
        const creators = bindActionCreators({
            add: () => ({ type: "ADD"}),
            minus: () => ({ type: "MINUS" })
        },dispatch); 

        return { dispatch, ...creators };
    }
)
(class ReactPage extends Component {
    render() {
        const { count, dispatch , add } = this.props;
        return (
            <div>
                {count}
                <button onClick={() => { dispatch({ type: 'ADD'})}}>ADD</button>
                <button onClick={add}>add</button>
            </div>
        )
    }
}) 