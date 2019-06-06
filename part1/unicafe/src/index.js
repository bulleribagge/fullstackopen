import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const FeedbackButton = ({ text, clickHandler }) => (
    <button style={{ margin: '5px' }} onClick={clickHandler}>{text}</button>
)

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

    const calculateAverage = () => {
        return (good + (bad * -1)) / ((good + bad + neutral) === 0 ? NaN : (good + bad + neutral))
    }

    const calculatePercentage = () => {
        return (good / ((good + bad + neutral) === 0 ? NaN : (good + bad + neutral))) * 100
    }
    if ((good + neutral + bad) > 0) {
        return (
            <div>
                <h1>Give Feedback</h1>
                <FeedbackButton clickHandler={() => setGoodValue(good + 1)} text="good" />
                <FeedbackButton clickHandler={() => setNeutralValue(neutral + 1)} text="neutral" />
                <FeedbackButton clickHandler={() => setBadValue(bad + 1)} text="bad" />
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="all" value={good + neutral + bad} />
                        <Statistic text="average" value={calculateAverage()} />
                        <Statistic text="percentage" value={calculatePercentage() + " %"} />
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <FeedbackButton clickHandler={() => setGoodValue(good + 1)} text="good" />
            <FeedbackButton clickHandler={() => setNeutralValue(neutral + 1)} text="neutral" />
            <FeedbackButton clickHandler={() => setBadValue(bad + 1)} text="bad" />
            <h1>Statistics</h1>
            <span>No feedback given yet</span>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
