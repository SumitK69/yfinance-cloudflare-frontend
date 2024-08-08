import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function CustomForm({ onSubmit }) {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  // const [quotes, setQuotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      number1,
      number2,
      text1,
      text2,
    });
  };

  // useEffect(() => {
  //   if (text2) {
  //     const debounceTimer = setTimeout(() => {
  //       fetchQuotes(text2);
  //     }, 300);

  //     return () => clearTimeout(debounceTimer);
  //   } else {
  //     setQuotes([]);
  //   }
  // }, [text2]);

  const prod_search_url =
    "https://main--yfinance-backend.netlify.app/.netlify/functions/api/search";
  // const local_search_url =    "http://localhost:8888/.netlify/functions/api/search";

  // const fetchQuotes = async (query) => {
  //   try {
  //     const response = await axios.post(url, { query: query });
  //     setQuotes(response.data.quotes || []);
  //   } catch (error) {
  //     console.error("Error fetching quotes:", error);
  //     setQuotes([]);
  //   }
  // };

  const handleText1Change = (e) => {
    const newValue = e.target.value.toUpperCase();
    setText1(newValue);
    axios
      .post(prod_search_url, {
        query: newValue,
      })
      .then((res) => {
        // const quote_list = res.data.quotes;
        // setQuotes(quote_list);
        // console.log(quote_list);
      });
    console.log("newValue", newValue);
  };

  const handleText2Change = (e) => {
    const newValue = e.target.value.toUpperCase();
    setText2(newValue);
    axios
      .post(prod_search_url, {
        query: newValue,
      })
      .then((res) => {
        // const quote_list = res.data.quotes;
        // setQuotes(quote_list);
        // console.log(quote_list);
      });
    console.log("newValue", newValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          ratio Numbers:
          <input
            type="number"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            required
          />
        </label>{" "}
        <span>: </span>
        <input
          type="number"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
          required
        />
      </div>{" "}
      <div>
        <label>
          Text Area 1:
          <textarea value={text1} onChange={handleText1Change} required />
        </label>{" "}
      </div>{" "}
      <div>
        <label>
          Text Area 2:
          <textarea value={text2} onChange={handleText2Change} required />
          {/* {quotes.length > 0 && (
            <ul className="quote-dropdown">
              {quotes.map((quote, index) => (
                <li key={index} className="quote-item">
                  {quote.symbol}: {quote.longname}
                </li>
              ))}
            </ul>
          )} */}
        </label>{" "}
      </div>{" "}
      <button type="submit"> Submit </button>{" "}
    </form>
  );
}

export default CustomForm;
