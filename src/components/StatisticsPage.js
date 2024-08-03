import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getExpensesPerCategory } from "../services/statistics";
import { useEffect, useState } from "react";
import "../styles/StatisticsPage.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const expenseAmountPerCategory = useSelector(state => 
    state.statisticsSlice.expenseAmountPerCategory || []); 
  const [doughnut, setDoughnut] = useState({
    labels: [],
    data: [],
    backgroundColor: [],
  });

  useEffect(() => {
   
    const colors = [
      "#FF6384", // Light Red
      "#36A2EB", // Light Blue
      "#FFCE56", // Light Yellow
      "#4BC0C0", // Light Teal
      "#9966FF", // Light Purple
      "#FF9F40", // Light Orange
      "#FFB6C1", // Light Pink
      "#C0C0C0", // Light Gray
      "#7FFF00", // Chartreuse
      "#00CED1"  // Dark Turquoise
    ];


    if (expenseAmountPerCategory.length > 0) {
      setDoughnut({
        labels: expenseAmountPerCategory.map(x => x.key),
        data: expenseAmountPerCategory.map(x => x.value),
        backgroundColor: colors.slice(0, expenseAmountPerCategory.length),
      });
    }
  }, [expenseAmountPerCategory]);

  useEffect(() => {
    getExpensesPerCategory(dispatch);
  }, [dispatch]);

  const data = {
    labels: doughnut.labels,
    datasets: [{
      data: doughnut.data,
      backgroundColor: doughnut.backgroundColor,
    }]
  };

    const options = {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#6DC38D',
            fontWeight: "bold",
          }
        }
      }
    };

  const isMultiColumn = expenseAmountPerCategory.length > 3;

  return (
    <div style={{ maxWidth: "35rem", margin: "auto", textAlign: "center" }} className="main-div-statistics">
      {expenseAmountPerCategory.length > 0 ? (
        <>
          <h4 style={{ marginTop: "2rem", marginBottom: "2rem", color:"var(--primary-color)", fontSize: "2.5rem", fontFamily: "var(--font-heading-lora)" }}>Expenses per Category</h4>
          <Doughnut data={data}  options={options}/>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px", color:"var(--primary-color)", padding: "0.2rem" }} className="bottom-div">
            <ul style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: isMultiColumn ? "column" : "column",
              width: isMultiColumn ? "50%" : "100%",
            }}>
              {expenseAmountPerCategory.slice(0, 3).map((category, index) => (
                <li key={category.key} style={{ display: "flex", alignItems: "center", marginBottom: "5px", marginLeft: "1rem", }}>
                  <div style={{ width: "15px", height: "15px", backgroundColor: doughnut.backgroundColor[index], marginRight: "10px" }}></div>
                  <span style={{ fontWeight: "bold", whiteSpace:"nowrap", marginRight:"0.1rem" }}>{category.key}:</span> {category.value}€
                </li>
              ))}
            </ul>
            {isMultiColumn && (
              <ul style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}>
                {expenseAmountPerCategory.slice(3).map((category, index) => (
                  <li key={category.key} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                    <div style={{ width: "15px", height: "15px", backgroundColor: doughnut.backgroundColor[index + 3], marginRight: "10px"}}></div>
                    <span style={{ fontWeight: "bold" }}>{category.key}</span>: {category.value}€
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default StatisticsPage;