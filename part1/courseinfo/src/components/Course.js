import React from 'react';

const Course = ({ course }) => (
    <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

const Header = (props) => (
    <h1>{props.course.name}</h1>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map((x, i) => <Part key={i} part={x.name} exercises={x.exercises} />)}
    </div>
)

const Total = ({ parts }) => {

    const total = parts.map(x => x.exercises).reduce((a,b) => {
        return (a + b);
    });

    return (
        <p>Number of exercises {total}</p>
    )
}

export default Course