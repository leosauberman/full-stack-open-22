import {Person} from "./Person";

export const Numbers = (props) => {
    return (
        <ul>
            {props.persons
                .filter((person) =>
                    person.name.toLowerCase().includes(props.filter.toLowerCase())
                ).map((p) =>
                    <Person key={p.id} person={p} onClick={props.onClick}/>
                )}
        </ul>
    )
}