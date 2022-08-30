import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(({data}) => setCountries(data));
    }, [])

    const countryList = countries
        .filter((el) =>
            el.name.common.toLowerCase().includes(country.toLowerCase()
            ));

    let result;

    if(countryList.length > 10)
        result = <p>Too many matches</p>
    else if(countryList.length !== 1)
        result =
            (<ul>
                {
                    countryList.map(c =>
                        <li key={c.name.official}>{c.name.common}</li>
                    )
                }
            </ul>);
    else {
        const [selectedCountry] = countryList;
        result = (
            <div>
                <h2>{selectedCountry.name.common}</h2>
                <img src={selectedCountry.flags.png} alt={selectedCountry.name.common}/>
                <p>Capital: {selectedCountry.capital[0]}</p>
                <p>Area: {selectedCountry.area}</p>
                <span>Official Languages:</span>
                <ul>
                    {Object
                        .entries(selectedCountry.languages)
                        .map(([k, l]) => <li key={k}>{l}</li>)
                    }
                </ul>
            </div>
        )
    }

    return (
        <div>
            <span>Find countries</span>
            <input
                type="text"
                value={country}
                onChange={({target}) => setCountry(target.value)}
            />
            {result}
        </div>
    );
}

export default App;
