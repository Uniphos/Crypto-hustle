import { useState, useEffect } from 'react' // Don't forget to import useEffect
import viteLogo from '/vite.svg'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import CoinInfo from "./Components/CoinInfo";

function App() {
  const [list, setList] = useState(null)

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" 
      + API_KEY
      ); //calls api
      const data = await response.json();
      setList(data);
    }

    fetchAllCoinData().catch(console.error); // Call the function
  }, []);

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
        <ul>
        {list && Object.entries(list.Data).map(([coin]) =>
          list.Data[coin].PlatformType === "blockchain" ? (
            <CoinInfo
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
          ) : null
        )}
        </ul>
    </div>
  )
}

export default App