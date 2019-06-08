import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { tsPropertySignature } from '@babel/types';

const Button = ({ text, clickHandler }) => (
    <button onClick={clickHandler}>{text}</button>
)

const Anecdote = ({text, votes}) => (
    <div>
        {text}<br />
        <span>has {votes} votes</span><br/>
    </div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

    const setRandomAnecdote = () => {
        setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)));
    }

    const voteForAnecdote = () => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
    }

    return (
        <div>
            <Anecdote text={props.anecdotes[selected]} votes={votes[selected]}/>
            <Button text="Random" clickHandler={() => setRandomAnecdote()} />
            <Button text="Vote" clickHandler={() => voteForAnecdote()} />
            <h1>Most votes</h1>
            <Anecdote text={props.anecdotes[votes.findIndex(x => x === Math.max(...votes))]} votes={Math.max(...votes)} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)