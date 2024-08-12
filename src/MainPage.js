import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";
import CustomForm from "./CustomForm";

function MainPage() {
  const [scrip1_data, setscript1_Data] = useState(null);
  const [scrip2_data, setscript2_Data] = useState(null);
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setloading(true);
    setFormData(data);
  };

  const prod_hist_url =
    "https://main--yfinance-backend.netlify.app/.netlify/functions/api/hist";
  // const local_hist_url = "http://localhost:8888/.netlify/functions/api/hist";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const scrip1_response = await axios.post(prod_hist_url, {
          query: formData.text1,
        });
        setscript1_Data({
          data: scrip1_response.data,
          ratio_data: formData.number1,
        });
        const scrip2_response = await axios.post(prod_hist_url, {
          query: formData.text2,
        });
        setscript2_Data({
          data: scrip2_response.data,
          ratio_data: formData.number2,
        });
        setloading(false);
      } catch (error) {
        console.log("fetcing error:  ", error);
      }
    };

    fetchData();
  }, [formData]);

  return (
    <div>
      {" "}
      <CustomForm onSubmit={handleFormSubmit} />
      {/* {formData && (
        <div>
          <h2>Submitted Data</h2>
          <p>Number 1: {formData.number1}</p>
          <p>Number 2: {formData.number2}</p>
          <p>Text Area 1: {formData.text1}</p>
          <p>Selected Option for Text Area 1: {formData.selectedOptionText1}</p>
          <p>Text Area 2: {formData.text2}</p>
          <p>Selected Option for Text Area 2: {formData.selectedOptionText2}</p>
        </div>
      )} */}
      {loading ? (
        <p>loading....</p>
      ) : (
        <ChartComponent scrip1_data={scrip1_data} scrip2_data={scrip2_data} />
      )}
    </div>
  );
}

export default MainPage;
