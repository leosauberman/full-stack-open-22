export const Person = ({person, onClick}) =>
    <li key={person.id}>
        {person.name}: {person.number}
        <button onClick={() => onClick(person.id)}>Delete</button>
    </li>;