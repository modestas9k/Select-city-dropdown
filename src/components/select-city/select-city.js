import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './select-city.css';

const access = axios.create({
  baseURL: "https://www.universal-tutorial.com/api/",
  headers: {
    "Accept": "application/json",
    "api-token": process.env.REACT_APP_API_TOKEN,
    "user-email": process.env.REACT_APP_USER_EMAIL
  }
});

function SelectCity() {
  const [token, setToken] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  
  const client = axios.create({
    baseURL: "https://www.universal-tutorial.com/api/",
    headers: {
      Authorization : `Bearer ${token}`,
    }
  })
  async function getToken() {
    try {
      const response = await access.get('getaccesstoken');
      setToken(response.data.auth_token);
      return response.data.auth_token;
    } catch (error) {
      console.error(error);
    }
  }
  async function getCountries() {
    const token = await getToken();
    axios.get('https://www.universal-tutorial.com/api/countries/', {
      headers: {
        Authorization : `Bearer ${token}`,
     }
    }).then((response) => {
      const data = [];
      response.data.forEach((country) => {
        data.push({
          value: country.country_name, 
          label: country.country_name
        })
      });
      setCountries(data);
    })
  }
  function getStates(country) {
    setStates([]);
    setCities([]);
    setCity('');
    client.get(`/states/${country.value}`)
      .then((response) => {
        const data = [];
        response.data.forEach((state) => {
          data.push({
            value: state.state_name, 
            label: state.state_name
          })
        });
        setStates(data);
      })
  }
  function getCities(state) {
    setCities([]);
    setCity('');
    client.get(`/cities/${state.value}`)
      .then((response) => {
        const data = [];
        response.data.forEach((city) => {
          data.push({
            value: city.city_name, 
            label: city.city_name
          })
        });
        setCities(data);
      })
  }

  React.useEffect(() => {
    getCountries()
  }, []);

  return (
    <div className="select_wrapper">
      <Select 
        className="select"
        options={countries} 
        placeholder="Select country"
        isSearchable
        onChange={function(value) {
          getStates(value)
        }}
      />
      <Select 
        className="select"
        options={states}
        placeholder="Select state"
        isSearchable
        onChange={function(value) {
          getCities(value)
        }}
      />
      <Select 
        className="select"
        options={cities}
        placeholder="Select city"
        isSearchable
        onChange={setCity}
      />
    </div>
  )
}

export default SelectCity;