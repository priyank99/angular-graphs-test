import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from 'cjs/canvasjs.min';
//var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})

export class ChartComponent implements OnInit {
  ngOnInit() {
    let dataPoints = [];
    let points = [];
    let csvLines = [];
    let dpsLength = 0;

    function getSubsGapDataPointsFromCSV(csv) {
      var dataPoints = csvLines = points = [];
      csvLines = csv.split(/[\r?\n|\r|\n]+/);

      for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
          points = csvLines[i].split(",");
          dataPoints.push({
            x: new Date(Date.parse(points[0])),
            y: parseInt(points[7])
          });
          console.log(points)
        }
      return dataPoints;
    }
    function getViewsGapDataPointsFromCSV(csv) {
      var dataPoints = csvLines = points = [];
      csvLines = csv.split(/[\r?\n|\r|\n]+/);

      for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
          points = csvLines[i].split(",");
          dataPoints.push({
            x: new Date(Date.parse(points[0])),
            y: parseInt(points[8])
          });
          console.log(points)
        }
      return dataPoints;
    }

    function getSubsAFromCSV(csv) {
      var dataPoints = csvLines = points = [];
      csvLines = csv.split(/[\r?\n|\r|\n]+/);

      for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
          points = csvLines[i].split(",");
          dataPoints.push({
            x: new Date(Date.parse(points[0])),
            y: parseInt(points[2])
          });
          console.log(points)
        }
      return dataPoints;
    }
    function getSubsBFromCSV(csv) {
      var dataPoints = csvLines = points = [];
      csvLines = csv.split(/[\r?\n|\r|\n]+/);

      for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
          points = csvLines[i].split(",");
          dataPoints.push({
            x: new Date(Date.parse(points[0])),
            y: parseInt(points[5])
          });
          console.log(points)
        }
      return dataPoints;
    }

    function getViewsAFromCSV(csv) {
      var dataPoints = csvLines = points = [];
      csvLines = csv.split(/[\r?\n|\r|\n]+/);

      for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
          points = csvLines[i].split(",");
          dataPoints.push({
            x: new Date(Date.parse(points[0])),
            y: parseInt(points[3])
          });
          console.log(points)
        }
      return dataPoints;
    }
    function getViewsBFromCSV(csv) {
      var dataPoints = csvLines = points = [];
      csvLines = csv.split(/[\r?\n|\r|\n]+/);

      for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
          points = csvLines[i].split(",");
          dataPoints.push({
            x: new Date(Date.parse(points[0])),
            y: parseInt(points[6])
          });
          console.log(points)
        }
      return dataPoints;
    }


    $.get("/assets/counts.csv", function(data) {

      var chartsubsgap = new CanvasJS.Chart("chartContainerSubsGap", {

        zoomEnabled: true,
        zoomType: "y",
        legend: {
          horizontalAlign: "right",
          verticalAlign: "center"
        },

        title: {
          text: "Subscribers gap",
        },
        axisY: {
          includeZero: false,
          //viewportMinimum: 1000000,
        },
        data: [{
          type: "line",
          dataPoints: getSubsGapDataPointsFromCSV(data)
        }]
      });
      chartsubsgap.render();

      var chartviewsgap = new CanvasJS.Chart("chartContainerViewsGap", {

        zoomEnabled: true,
        zoomType: "y",
        legend: {
          horizontalAlign: "right",
          verticalAlign: "center"
        },

        title: {
          text: "Views gap",
        },
        axisY: {
          includeZero: false,
        },
        data: [{
          type: "line",
          dataPoints: getViewsGapDataPointsFromCSV(data)
        }]
      });
      chartviewsgap.render();

      var chartsubsA = new CanvasJS.Chart("chartContainerSubsA", {

        zoomEnabled: true,
        zoomType: "y",
        legend: {
          horizontalAlign: "right",
          verticalAlign: "center"
        },

        title: {
          text: "Subscribers-A ",
        },
        axisY: {
          includeZero: false,
        },
        data: [{
          type: "line",
          dataPoints: getSubsAFromCSV(data)
        }]
      });
      //  chartsubsA.render();
      var chartSubsAB = new CanvasJS.Chart("chartContainerSubsAB", {

        zoomEnabled: true,
        zoomType: "y",
        legend: {
          horizontalAlign: "right",
          verticalAlign: "center"
        },

        title: {
          text: "Subscribers of A,B",
        },
        axisY: {
          includeZero: false,
        },
        data: [
          {
          type: "line",
          showInLegend: true,
          name: "series1",
          legendText: "T Series",
          dataPoints: getSubsAFromCSV(data)
          },
          {
          type: "line",
          showInLegend: true,
          name: "series2",
          legendText: "PewDiePie",
          dataPoints: getSubsBFromCSV(data)
          },
        ]
      });
      chartSubsAB.render();

      var chartViewsAB = new CanvasJS.Chart("chartContainerViewsAB", {

        zoomEnabled: true,
        zoomType: "y",
        legend: {
          horizontalAlign: "right",
          verticalAlign: "center"
        },

        title: {
          text: "Views of A,B",
        },
        axisY: {
          includeZero: false,
        },
        data: [
          {
          type: "line",
          showInLegend: true,
          name: "series1",
          legendText: "T Series",
          dataPoints: getViewsAFromCSV(data)
          },
          {
          type: "line",
          showInLegend: true,
          name: "series2",
          legendText: "PewDiePie",
          dataPoints: getViewsBFromCSV(data)
          },
        ]
      });
      chartViewsAB.render();

    });

  }
}
