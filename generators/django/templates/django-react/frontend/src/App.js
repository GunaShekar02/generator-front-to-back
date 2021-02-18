import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios.get(`${process.env.REACT_APP_HOST_IP_ADDRESS}/api/posts`)
      .then((res) => {
        setData(res.data);
        console.log(data)
        setLoading(false);
      })
  }, [])

  if (loading){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }else{
    return(
      <div className="App">
        <h1>Fetched!</h1>
      </div>
    )
  }
  
}

export default App;
