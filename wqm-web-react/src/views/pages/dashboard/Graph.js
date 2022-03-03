import React from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

function Graph(props) {
  let x_datetime = [];
  let y_value = [];
  const data = props.measured_data;
  var type = props.measured_dataType;

  //console.log(type);

  for (let i in data) {
    //console.log(data[i][type]);
    y_value.push(data[i][type]);
    x_datetime.push(new Date(data[i].datetime));
  }

  var dataPoints = x_datetime.map((value, index) => {
    return { x: value, y: y_value[index] };
  });

  //console.log(dataPoints);
  //console.log(x_datetime);

  const options = {
    animationEnabled: true,
    theme: "light2",
    zoomEnabled: true,
    toolbar: {
      itemBackgroundColor: "#fff",
      itemBackgroundColorOnHover: "#eccaa0",
      buttonBorderColor: "#eccaa0",
      buttonBorderThickness: 2,
      fontColor: "#d6d6d6",
      fontColorOnHover: "#d3d3d3",
    },
    title: {
      text: type,
    },
    axisX: {
      intervalType: "hour",
      valueFormatString: "DD-MMM-YY  H:m ",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "",
      valueFormatString: "0.00",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return CanvasJS.formatNumber(e.value, "##0.00");
        },
      },
    },
    dataPointWidth: 200,
    data: [
      {
        markerColor: "#008000",
        connectNullData: true,
        type: "line",
        xValueFormatString: "DD-MMM-YY  H:m ",
        yValueFormatString: "0.00",
        dataPoints: dataPoints,
      },
    ],
    
  };
  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto",
  };

  return (
    <div>
      
      <CanvasJSChart options={options} />
    </div>
  );
}
//
export default Graph;
