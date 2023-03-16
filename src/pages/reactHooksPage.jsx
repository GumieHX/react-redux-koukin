import { useCallback } from 'react';
import { useSelector, useDispatch } from '../react-redux-kk/index.jsx'

const reactHooksPage = () => {

  const count = useSelector(({ count }) => count);
  const dispatch = useDispatch()

  const add = useCallback(() => {
    dispatch({ type: 'ADD' });
  });

  return (
    <div>
        {count}
        <button onClick={add}>add</button>
    </div>
  )
}

export default reactHooksPage