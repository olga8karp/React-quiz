function StartScreen({ numOfQuestions, dispatch }) {
    return (
        <div>
           <h2>Welcome to the React Quizz!</h2>
           <h3>{numOfQuestions} question to test your React mastery</h3>
           <button onClick={() => dispatch({ type: 'start' })}>Lets start</button>
        </div>
    )
}

export default StartScreen;