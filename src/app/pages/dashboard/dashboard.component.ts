import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Bar } from 'chartist'

import io from 'socket.io-client'
import { data } from 'jquery';



const socket = io('http://localhost:4200');



@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public speedChart;
  public soilmoisture1;
  public leaf;
  public wind_direction;

  data1 = [];
    ngOnInit(){

      socket.on('data1', (res) => {
        this.updateChartData(this.chartHours,res,0);
        this.updateChartData(this.speedChart,res,0);
        this.updateChartData(this.wind_direction,res,0);
        
        
      })
      socket.on('data2',(res)=>{
        this.updateChartData(this.chartHours, res, 1);
        this.updateChartData(this.speedChart, res, 1);
        this.updateChartData(this.wind_direction,res,1);
        
      })

      
      
      


      this.canvas = document.getElementById("speedChart");
      this.ctx = this.canvas.getContext("2d");

      this.speedChart = new Chart(this.ctx, {
        type: 'line',
        options: {
          responsive: true,
          title: {
            display: false,
            
          },
        },
        data: {
          labels: ["2am", "5am", "8am", "11am", "2pm", "5pm", "8pm", "11pm"],
          datasets: [
            {
              type: 'line',
              
              data: [30, 31, 24, 28, 30, 31, 26, 28],
              fill: false,
              label: "Wind speed in km/hr",
              borderColor: '#fbc658',
              backgroundColor: 'transparent',
              pointBorderColor: '#fbc658',
              pointRadius: 4,
              pointHoverRadius: 4,
              pointBorderWidth: 8,
            },
            
            {
              type: 'line',
              
              data: [30, 31, 24, 28, 30, 31, 26, 28].reverse(),
              fill: false,
              label: "Wind gusts in km/hr",
              borderColor: '#586bfb',
              backgroundColor: 'transparent',
              pointBorderColor: '#586bfb',
              pointRadius: 4,
              pointHoverRadius: 4,
              pointBorderWidth: 8,
            }
          ]
        }
      });
  
      let options = {
        // aspectRatio: 1,
        // legend: false,
        tooltips: false,
  
        elements: {
          point: {
            borderWidth: function (context) {
              return Math.min(Math.max(1, context.datasetIndex + 1), 8);
            },
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: function (context) {
              return "red";
            },
            hoverBorderWidth: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return Math.round(8 * value.v / 1000);
            },
            radius: function (context) {
              var value = context.dataset.data[context.dataIndex];
              var size = context.chart.width;
              var base = Math.abs(value.v) / 1000;
              return (size / 24) * base;
            }
          }
        }
      };
      this.chartColor = "#FFFFFF";

      
    

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: [17,18,19,20,21,22,23,24,25,26,27,28,29,30],
          datasets: [{
              borderColor: "#03f8fc",
              backgroundColor: "#03f8fc",
              label: 'My First dataset',
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [55,31,31,55,55,43,41,12,21,14,20,21,12,11]
            },
            {
            borderColor: "#03f8fc",
            backgroundColor: "#03f8fc",
            label: 'My Second dataset',
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [55,31,31,55,55,43,41,12,21,14,20,21,12,11].reverse()
          }
            
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        },
        elements: {
          point: {
            borderWidth: function (context) {
              return Math.min(Math.max(1, context.datasetIndex + 1), 8);
            },
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: function (context) {
              return "red";
            },
            hoverBorderWidth: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return Math.round(8 * value.v / 1000);
            },
            radius: function (context) {
              var value = context.dataset.data[context.dataIndex];
              var size = context.chart.width;
              var base = Math.abs(value.v) / 1000;
              return (size / 24) * base;
            }
          }
        }
      });

      this.canvas = document.getElementById("wind_direction");
      this.ctx = this.canvas.getContext("2d");

      this.wind_direction = new Chart(this.ctx, {
        type: 'bar',

        data: {
          labels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
          datasets: [{
              borderColor: "#71a832",
              backgroundColor: "#71a832",
              label: 'My First dataset',
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [12,29, 13, 34, 43, 22, 6, 19]
            },
            
            
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

           
          },
        },
        elements: {
          point: {
            borderWidth: function (context) {
              return Math.min(Math.max(1, context.datasetIndex + 1), 8);
            },
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: function (context) {
              return "red";
            },
            hoverBorderWidth: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return Math.round(8 * value.v / 1000);
            },
            radius: function (context) {
              var value = context.dataset.data[context.dataIndex];
              var size = context.chart.width;
              var base = Math.abs(value.v) / 1000;
              return (size / 24) * base;
            }
          }
        }
      });


     
     
          

    


      
    }


    
    addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
      });
      chart.update();
  }
  
  removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset) => {
          dataset.data.pop();
      });
      chart.update();
  }
  
  updateChartData(chart, data, dataSetIndex){
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }
}
