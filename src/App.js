import Header from "./Header";
import Main from "./Main";
import React, { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";

const initialState = {
    questions: [],
    status: 'loading',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            }
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            }
        default:
           throw new Error(`Unknown action type ${action.type}`);
    }
}
function App() {
    const [{ questions, status}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
        .then((response) => response.json())
        .then((data) => dispatch({ type: 'dataReceived', payload: data }))
        .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
      </Main>
    </div>
  );
}

export default App;
