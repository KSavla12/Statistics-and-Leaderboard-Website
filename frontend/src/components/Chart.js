import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import '../css/base.css';


const Chart = ({ chartdata, ID}) => {

  // Filter out repeated dates:
  const uniqueChartData = [...new Map(chartdata.map((item) =>
    [item['date'], item])).values()];

  // Get ratings based on page id:
  let list =[]
  uniqueChartData.map((data) => {
    if(data.player_a.id === Number(ID)){
      list.push(data.player_a_rating)
    } else {
      list.push(data.player_b_rating)
    }
  })
  
  var chartdata1 = {
    labels: uniqueChartData.map(function (el) { return el.date; }), fontColor: 'rgba(255, 255, 255, 0.7)',
    datasets: [
      {
        label: "Rating History",
        data: list,
        borderColor: 'rgba(255, 99, 132, 0.2)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      }
    ]}

  return (
    <Line data={chartdata1} options={{aspectRatio: 2.5, fontColor: 'red', plugins: {  
      legend: {
        labels: {
          color: 'rgba(125, 125, 125, 0.8)',  
          font: {
            size: 13 
          }
        }
      }
    },
    scales: {
      y: {  
        ticks: {
          color: 'rgba(125, 125, 125, 0.8)', 
          font: {
            size: 13, 
          },
          stepSize: 1,
          beginAtZero: true
        }
      },
      x: {  
        ticks: {
          color: 'rgba(125, 125, 125, 0.8)',  
          font: {
            size: 13 
          },
          stepSize: 1,
          beginAtZero: true
        }
      }
    }}}/>
  )
}

export default Chart