import {useState} from "react";

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const StatisticsLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const {good, neutral, bad} = props;
    const sum = () => good + neutral + bad;
    const scoreEnum = { good: 1, neutral: 0, bad: -1};
    const avg = () => ((good * scoreEnum.good) + (neutral * scoreEnum.neutral) + (bad * scoreEnum.bad));
    const positive = () => {
        const sumVal = sum();
        if(sumVal > 0) return good/sumVal * 100;
        return 0;
    }

    if(sum() > 0) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Stats</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <StatisticsLine text="good" value={good}/>
                    <StatisticsLine text="neutral" value={neutral}/>
                    <StatisticsLine text="bad" value={bad}/>
                    <StatisticsLine text="all" value={sum()}/>
                    <StatisticsLine text="average" value={avg()}/>
                    <StatisticsLine text="positive" value={`${positive()}%`}/>
                </tbody>
            </table>
        )
    }
    return <p>No feedback given</p>

}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
                <Button onClick={() => setGood(good + 1)} text="good"/>
                <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
                <Button onClick={() => setBad(bad + 1)} text="bad"/>
            </div>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App;
