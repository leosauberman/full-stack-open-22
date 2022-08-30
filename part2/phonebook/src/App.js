import {useEffect, useState} from 'react'
import {Filter} from "./Filter";
import {PersonForm} from "./PersonForm";
import {Numbers} from "./Numbers";
import phoneService from "./phonebook";
import {Notification} from "./Notification";
import './index.css';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState(null);
    const [alertType, setAlertType] = useState('success');

    useEffect(() => {
        phoneService
            .getAll()
            .then((res) => setPersons(res));
    }, [])

    const pushNotification = (message, isError) => {
        setMessage(message);
        setAlertType(isError ? 'error' : 'success');
        setTimeout(() => setMessage(null), 1500);
    }

    const addPerson = (ev) => {
        ev.preventDefault();
        const newPhoneNumber = {
            name: newName,
            number: newNumber,
            id: (persons.at(-1).id + 1)
        };

        const existingPhoneNumber = persons.filter((p) => p.name === newName);
        if (existingPhoneNumber.length > 0) {
            updatePhoneNumber({...newPhoneNumber, id: existingPhoneNumber[0].id});
            return;
        }

        phoneService.save(newPhoneNumber)
            .then(() => {
                setPersons([
                    ...persons,
                    newPhoneNumber
                ]);
                setNewName('');
                setNewNumber('');
                pushNotification(
                    `${newName} phone's has been added to your phonebook!`,
                    false
                );
            })
            .catch((error) => {
                console.log(error);
                pushNotification(
                    "Couldn't save phone number. Try again later",
                    true
                );
            })
    }

    const handleNameChange = (ev) => setNewName(ev.target.value);
    const handleNumberChange = (ev) => setNewNumber(ev.target.value);
    const applyFilter = (ev) => setFilter(ev.target.value);

    const deletePhoneNumber = (id) => {
        if(window.confirm('Do you really want to delete this phone number?')){
            phoneService.deletePhone(id)
                .then(() => {
                    setPersons(persons.filter((p) => p.id !== id));
                    pushNotification(
                        'Deleted successfully',
                        false
                    );
                })
                .catch((error) => {
                    console.log(error);
                    pushNotification(
                        "Couldn't delete phone number. Try again later",
                        true
                    );
                });
        }
    }

    const updatePhoneNumber = (phoneNumber) => {
        if(window.confirm(`${newName} is already in our phonebook. Do you want to update this phone number?`)){
            phoneService.update(phoneNumber)
                .then(() => {
                    const newPhoneIdx = persons.findIndex((p) => p.id === phoneNumber.id);
                    const personsCopy = [...persons];
                    personsCopy.splice(newPhoneIdx, 1, phoneNumber);
                    setPersons(personsCopy);
                    pushNotification(
                        `${newName} phone's has been been updated!`,
                        false
                    );
                })
                .catch((error) => {
                    console.log(error);
                    pushNotification(
                        "Couldn't update phone number. Try again later",
                        true
                    );
                });
        }
    }

    return (
        <div>
            <Filter filter={filter} applyFilter={applyFilter}/>
            <Notification message={message} type={alertType}/>
            <h2>Phonebook</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Numbers
                persons={persons}
                filter={filter}
                onClick={deletePhoneNumber}
            />
        </div>
    )
}

export default App