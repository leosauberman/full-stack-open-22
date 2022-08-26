/**
 * Header takes care of rendering the name of the course,
 * Content renders the parts and their number of exercises and
 * Total renders the total number of exercises.*/

const Header = (props) => {
  return <h1>{props.course}</h1>;
}

const Part = (props) => {
  return (
      <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  return (
      <div>
        <Part part={props.parts[0]}></Part>
        <Part part={props.parts[1]}></Part>
        <Part part={props.parts[2]}></Part>
      </div>
  )
}

const Total = (props) => {
  const [part1, part2, part3] = props.parts;
  return (
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 70},
      {name: 'State of a component', exercises: 14}
    ],
  };

  return (
      <div>
        <Header course={course} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
  );
}

export default App;
