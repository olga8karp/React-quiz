
function NextButton({ dispatch, answer, numQuestions, index }) {
    if (answer === null) {
        return null;
    }

    if (index < numQuestions - 1)  return (
        <div className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
            Next
        </div>
    )
}

export default NextButton;