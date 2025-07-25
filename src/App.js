import Header from "./Header";
import Main from "./Main";
import React, { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

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
        case 'start':
            return {
                ...state,
                status: 'active',
            }
        default:
           throw new Error(`Unknown action type ${action.type}`);
    }
}
function App() {
  const [{ questions, status}, dispatch] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;

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
          {status === 'ready' && <StartScreen numOfQuestions={numberOfQuestions} dispatch={dispatch} />}
          {status === 'active' && <Question />}
      </Main>
    </div>
  );
}

export default App;
