import React, { useEffect, useState } from "react";
import './App.css';

import { FaQuoteLeft } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareTumblr } from "react-icons/fa6";

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
  '#3498db',
  '#e67e22',
  '#8e44ad',
  '#c0392b',
  '#1abc9c',
  '#2980b9',
  '#d35400',
  '#9b59b6',
  '#e74c3c',
  '#2ecc71',
  '#f1c40f',
  '#34495e',
  '#e74c3c',
  '#8e44ad',
  '#27ae60' 
];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function App() {

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [colorChanger, setColorChanger] = useState(getRandomColor());

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch(`https://api.quotable.io/quotes?tags=famous-quotes`);
      const data = await response.json();
      const quotes = data.results;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];

      /*
      const randomQuoteFetch = await fetch('https://api.quotable.io/random');
      const randomQuote = await randomQuoteFetch.json();
      */

      setQuote(randomQuote.content);
      const authorText = randomQuote.author;
      setAuthor(authorText);
      setColorChanger(getRandomColor());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } 
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);
  


  return (
    <div className="App" style={{backgroundColor: colorChanger}}>
      <div id="quote-box">
        {loading ? ( 
          <p>Loading...</p> 
        ) : (
          <div>
            <p id="text" style={{color: colorChanger}}>
              <FaQuoteLeft />
                {quote}
            </p>
            <p id="author" style={{color: colorChanger}}>- {author}</p>
          </div>
        )}
        <div className="buttons">
          <button id="new-quote" onClick={fetchRandomQuote} style={{backgroundColor: colorChanger}}>
            New Quote
          </button>
          <div>
            <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter className="social-net" style={{color: colorChanger}} />
            </a>
            <a href="https://www.tumblr.com/" target="_blank" rel="noopener noreferrer">
              <FaSquareTumblr className="social-net" style={{color: colorChanger}} />
            </a>
          </div>
        </div>
      </div>
      <span className="madeBy">by mike-506</span>
    </div>
  )
}

export default App;
