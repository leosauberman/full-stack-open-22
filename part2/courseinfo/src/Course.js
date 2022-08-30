const Header = ({course}) => <h1>{course.name}</h1>

const Total = ({sum}) => <p><strong>Number of exercises {sum}</strong></p>

const Part = ({part}) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({parts}) =>
    <>
        {parts.map((p) =>
            <Part
                key={p.id}
                part={p}
            />
        )}
    </>

const Course = ({course}) => {
    const sum = course.parts.map((p) => p.exercises).reduce(
        (prev, curr) =>
            prev + curr,
        0
    );

    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total sum={sum}/>
        </div>
    )
}

export default Course;