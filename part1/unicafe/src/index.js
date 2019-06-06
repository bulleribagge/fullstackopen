import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Statistics = (props) => {
    return (
        <div>
            <span>good {props.good}</span><br/>
            <span>neutral {props.neutral}</span><br/>
            <span>bad {props.bad}</span><br/>
        </div>
    )
}

const FeedbackButtons = (props) => {
    return(
        <div>
            <button style={{margin: '5px'}} onClick={props.goodClickHandler}>good</button>
            <button style={{margin: '5px'}} onClick={props.neutralClickHandler}>neutral</button>
            <button style={{margin: '5px'}} onClick={props.badClickHandler}>bad</button>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const setGoodValue = val => {
        setGood(val);
    }

    const setNeutralValue = val => {
        setNeutral(val);
    }

    const setBadValue = val => {
        setBad(val);
    }

    return(
        <div>
            <h1>Give Feedback</h1>
            <FeedbackButtons goodClickHandler={() => setGoodValue(good + 1)} neutralClickHandler={() => setNeutralValue(neutral + 1)} badClickHandler={() => setBadValue(bad + 1)}/>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
