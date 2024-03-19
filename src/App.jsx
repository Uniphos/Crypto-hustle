import { useState, useEffect } from 'react' // Don't forget to import useEffect
import viteLogo from '/vite.svg'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import CoinInfo from "./Components/CoinInfo";

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };


  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" 
      + API_KEY
      ); //calls api
      const data = await response.json();
      const coinLimit = 50;

      const limitedList  = Object.fromEntries(
        Object.entries(data.Data).slice(0, coinLimit)
      );
      setList({ Data: limitedList });
    }

    fetchAllCoinData().catch(console.error); // Call the function
  }, []);

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
        <ul>
        {searchInput.length > 0
          ? filteredResults.map((coin) => 
              list.Data[coin].PlatformType === "blockchain" ? 
              <CoinInfo
                key={coin.symbol}
                image={list.Data[coin].ImageUrl}
                name={list.Data[coin].FullName}
                symbol={list.Data[coin].Symbol}
              />
              : null
            )
          : list && Object.entries(list.Data).map(([coin]) => 
              list.Data[coin].PlatformType === "blockchain" ? 
              <CoinInfo
                key={coin.symbol}
                image={list.Data[coin].ImageUrl}
                name={list.Data[coin].FullName}
                symbol={list.Data[coin].Symbol}
              />
          : null
        )}
        </ul>
    </div>
  )
}

export default App