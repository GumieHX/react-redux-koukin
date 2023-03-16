import { useEffect, useReducer } from "react"
import store from "../store/index.js"

const ReduxPage = () => {
  const [, addReducer] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    store.subscribe(() => {
    addReducer()
    })
  })

  const add = () => {
    store.dispatch({ type: 'ADD'})
  }

  const minus = () => {
    store.dispatch({ type: 'MINUS' })
  }

  const promiseMinus = () => {
    store.dispatch(Promise.resolve({ type: 'MINUS' }))
  }


  return (
    <div>
      { store.getState().count }
      <button onClick={add}>Add</button>
      <button onClick={minus}>Minus</button>
      <button onClick={promiseMinus}>promiseMinus</button>

    </div>
  )
}

export default ReduxPage
