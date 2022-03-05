import React, { Component, useState, useEffect } from "react";
import Chart from "react-google-charts";
import { BsScrewdriver } from "react-icons/bs";
import { Container, Row, Col } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { fetchStationInfoById } from "../../../functions/apiActions";
import { history } from "../../../history";
const gaugeData = [
  ["Label", "Value"],
  ["Memory", 80],
];
const fullRrangeValue = {
  ph: [0, 14],
  ec: [0, 15],
  do: [0, 10],
  temperature: [0, 100],
  tds: [0, 500],
  ammonia: [0.25, 32.5],
  salinity: [0, 20],
  turbidity: [0, 3000],
};

function getData(type,value){ 
  console.log("--------------"+value)
  return [
    ["Label","Value"],
    [String(type),value]
  ];

  
}

export default function GaugeChartdetail2(props) {
  let min, max;
  const type = props.dash_type;
  const current_value =props.value;
  const [isLoading, setIsLoading] = useState(true);

  const [stationInfo, setStationInfo] = useState({});
  const [data,setData]= useState(getData(type,current_value));
  const [phGoodRange,setphGoodRange] =useState([])
  const [ecGoodRange,setecGoodRange] =useState([])
  const [doGoodRange,setdoGoodRange] =useState([])
  const [tempGoodRange,settempGoodRange] =useState([])
  const [tdsGoodRange,settdsGoodRange] =useState([])
  const [ammoniaGoodRange,setammoniaGoodRange] =useState([])
  const [salinityGoodRange,setsalinityGoodRange] =useState([])
  const [turbidityGoodRange,setRangeturbidityGoodRange] =useState([])

  

  useEffect(() => {
    const station_id = history.location.state.station_id;
    fetchStationInfoById(station_id)
      .then((res) => {
        //console.log(res);
        return res;
      })
      .then((data) => {
        //console.log("---------------------" + data.userId);
        //console.log("aunn",data);
        const stations = { ...data };

        setIsLoading(false);
        setStationInfo(stations);
      });

      //setData(getData(type,current_value))
      
  }, []);

  function getGoodWaterRange() {
    let min, max;
    for (const d in stationInfo) {
      const t = d.toLowerCase();
      //console.log("-----------"+t);
      //console.log("+++++++++++++++++"+type);
      if (t.includes(type.toLowerCase()) || t.includes("turp")) {
        if (t.includes("min")) {
          min = stationInfo[d];
          //console.log(d + ":" + min);
          /*setGoodWaterRange({
            ...goodWaterRange,
            d: (goodWaterRange.type[0] = min),
          });*/
        }
        if (t.includes("max")) {
          max = stationInfo[d];
          //console.log(d + ":" + max);
          /*setGoodWaterRange({
            ...goodWaterRange,
            d: (goodWaterRange.type[1] = max),
          });*/
        }
      }
      /*setGoodWaterRange({
        ...goodWaterRange,
        d: (goodWaterRange.type = [max,min]),
      })*/
    }
  }

  //console.log("stringified",stationInfo.userId);
  function getRange() {
    for (let t in fullRrangeValue) {
      if (type.toLowerCase() == t) {
        if (
          fullRrangeValue[t][1] == undefined ||
          fullRrangeValue[t][1] == null
        ) {
          min = 0;
          max = 15;
        } else {
          min = fullRrangeValue[t][0];
          max = fullRrangeValue[t][1];
        }
      }
    }

    return min, max;
  }

  getRange();
  getGoodWaterRange();
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  console.log("--------------"+data)
  return (
    <div className="max-width container-lg">
      <Chart
        height={140}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          redFrom: 10,//////ref from type type is props.dash_type
          redTo: 30,
          greenFrom:20,
          GreenTo: 10,
          minorTicks: 5,
          majorTicks: [min, max],
        }}
        rootProps={{ "data-testid": "1" }}
      />
      <Button color="warning">
        {" "}
        แก้ไข <BsScrewdriver />
      </Button>
    </div>
  );
}

  
/*const [goodWaterRange, setGoodWaterRange] = useState({
  pH: [],
  ec: [],
  do: [],
  temperature: [],
  tds: [],
  ammonia: [],
  salinity: [],
  turbidity: [],
});*/

/*const [goodWaterRange, setGoodWaterRange] = useState({
  pHMin: [],
  pHMax: [],
  ecMin: [],
  ecMax: [],
  doMin: [],
  doMax: [],
  tempMin: [],
  tempMax: [],
  TdsMin: [],
  TdsMax: [],
  ammoniaMax: [],
  ammoniaMin: [],
  salMax: [],
  salMin: [],
  turpMax: [],
  turpMin: []
});*/