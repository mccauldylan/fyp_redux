import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export class dashboard extends Component {
  render() {
    const data = {
      labels: ["Dylan", "Sinead", "Gaye"],
      datasets: [
        {
          label: "Rows Approved",
          data: [21, 43, 55],
          borderColor: [
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
          ],
          backgroundColor: [
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
          ],
        },

        {
          label: "Rows Disapproved",
          data: [5, 7, 12],
          borderColor: [
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
          ],
          backgroundColor: [
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
          ],
        },
        {
          label: "Total Approves/Disapproved",
          data: [26, 50, 67],
          borderColor: [
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
          ],
          backgroundColor: [
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
          ],
        },
      ],
    };
    const options = {
      title: {
        display: true,
        text: "Bar Chart",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 70,
            },
          },
        ],
      },
    };
    return (
      <div>
        <Bar data={data} options={options} />
      </div>
    );
  }
}

export default dashboard;
