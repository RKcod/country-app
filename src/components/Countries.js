import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(16);
    const RadiosData = ["Africa", "America", "Europe", "Asia", "Oceania"];
    const [selectedValue, setSelectedRadio] = useState("");

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(
                (res) =>
                    setData(res.data)
            )
    }, []);

    return (
        <div className='countries'>
            <ul className="radio-container">
                <input type="range"
                    min="1" max="250"
                    defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                />
                {RadiosData.map((continent, index) => (
                    <li key={index}>
                        <input type="radio" name="continent" id={continent} onChange={(e) => setSelectedRadio(e.target.id)} />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>

            {selectedValue && <button onClick={() => setSelectedRadio("")}> Annuler la recherche</button>}
            <ul>
                {
                    data
                        .filter((country) => country.continents[0].includes(selectedValue))
                        .sort((a, b) => b.population - a.population)
                        .slice(0, rangeValue)
                        .map(
                            (country, index) => (
                                <Card key={index} country={country} />
                            )

                        )
                }
            </ul>
        </div>
    );
};

export default Countries;