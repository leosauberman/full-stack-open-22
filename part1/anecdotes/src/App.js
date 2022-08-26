import {useState} from "react";

const Anecdote = (props) => {
  return (
      <div>
        <h2>{props.text}</h2>
        <span>votes: {props.votes}</span>
      </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const getRandomNumber = () => Math.round(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(getRandomNumber());
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const pickAnecdote = () => setSelected(getRandomNumber());
  const upvote = () => {
    const tempVotes = [...votes];
    tempVotes[selected] += 1;
    setVotes(tempVotes);
  }

  const bestAnecdoteIdx = votes.findIndex((v) => v === Math.max(...votes));

  return (
      <div>
        <Anecdote
            text={anecdotes[selected]}
            votes={votes[selected]}
        />
        <br/>
        <button onClick={upvote}>vote</button>
        <button onClick={pickAnecdote}>next anecdote</button>
        <br/>
        <Anecdote
            text={anecdotes[bestAnecdoteIdx]}
            votes={votes[bestAnecdoteIdx]}
        />
      </div>
  )
}
export default App;
