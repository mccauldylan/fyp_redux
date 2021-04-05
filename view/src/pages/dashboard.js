import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export class dashboard extends Component {
  render() {
    const data = {
      labels: [
        "Medical",
        "Nursing",
        "Research",
        "Dietitian",
        "Administration",
        "Neuropsychology",
        "Speech and Language",
        "Occupational Health",
      ],
      datasets: [
        {
          label: "Votes for",
          data: [320, 450, 390, 560, 200, 600, 433, 456],
          borderColor: [
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
          ],
          backgroundColor: [
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
            "rgba(46, 204, 41, 0.5)",
          ],
        },

        {
          label: "Votes against",
          data: [42, 50, 49, 51, 30, 50, 33, 56],
          borderColor: [
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
          ],
          backgroundColor: [
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
          ],
        },
        {
          label: "N/A votes",
          data: [420, 650, 520, 660, 300, 600, 493, 656],
          borderColor: [
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
          ],
          backgroundColor: [
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.5)",
          ],
        },
        // {
        //   label: "Total",
        //   data: [26, 50, 67],
        //   borderColor: [
        //     "rgba(0, 0, 0, 0.5)",
        //     "rgba(0, 0, 0, 0.5)",
        //     "rgba(0, 0, 0, 0.5)",
        //   ],
        //   backgroundColor: [
        //     "rgba(0, 0, 0, 0.5)",
        //     "rgba(0, 0, 0, 0.5)",
        //     "rgba(0, 0, 0, 0.5)",
        //   ],
        // },
      ],
    };
    const options = {
      title: {
        display: true,
        text: "Votes per User per Profession",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 700,
            },
          },
        ],
      },
    };

    const optionsTwo = {
      title: {
        display: true,
        text: "Progress per Category",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 100,
            },
          },
        ],
      },
    };
    const dataTwo = {
      labels: [
        "1 Register Info",
        "2 Pt. demo",
        "3 Comm Contacts",
        "4 NOK Details",
        "5 First Visit Registration",
        "6 ACP",
        "7 Spirituality",
        "8 Dx Confirmed",
        "9 First Symptom",
        "10 PMHxPSHx",
        "11 Family Status",
        "12 Employment Hx",
        "13 BSA Housing",
        "14 BSA Comm Supports",
        "15 Care Giver",
        "16 Cognitive Behaviour",
        "17 Safe Environment",
        "18 Comm Pain",
        "19 Breathing",
        "20 Eating & Drinking",
        "21 Elimination",
        "22 Personal Care",
        "23 Temp",
        "24 Mobilising",
        "25 Working & Playing",
        "26 Expressing Sexuality",
        "27 Sleeping",
        "28 Death & Dying",
        "29 Appliances",
        "30 Pt. Results",
        "31 Pt. Referrals",
        "32. All Contacts",
      ],
      datasets: [
        // These two will be in the same stack.
        {
          label: "Progess %",
          data: [
            100,
            94,
            83,
            74,
            65,
            76,
            47,
            38,
            59,
            48,
            90,
            100,
            32,
            45,
            22,
            10,
            17,
            45,
            84,
            45,
            74,
            63,
            43,
            24,
            56,
            23,
            82,
            15,
            45,
            39,
            57,
            100,
          ],
          borderColor: [
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
          ],
          backgroundColor: [
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
            "rgba(255, 194, 120)",
          ],
        },
      ],
    };
    return (
      <div>
        <Bar data={dataTwo} options={optionsTwo} />
        <br></br>
        <br></br>
        <Bar data={data} options={options} />
      </div>
    );
  }
}

export default dashboard;
