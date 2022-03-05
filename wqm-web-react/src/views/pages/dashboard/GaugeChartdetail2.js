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
  ec: [0, 3000],
  do: [0, 20],
  temperature: [0, 100],
  tds: [0, 500],
  ammonia: [0, 35],
  salinity: [0, 20],
  turbidity: [0, 3000],
};

function getData(type, value, fullRrangeValue) {
 
 const t=getRange(type)
 console.log("-------value-------" + t[1]);
    return [
        ["Label", "Value"],
        [String(type), value],
      ];
  
}

function getRange(type) {
  let min, max;
  for (let t in fullRrangeValue) {
    if (type.toLowerCase().includes(t)) {
      if (fullRrangeValue[t][1] == undefined || fullRrangeValue[t][1] == null) {
        min = 0;
        max = 15;
      } else {
        min = fullRrangeValue[t][0];
        max = fullRrangeValue[t][1];
      }
    }
  }

  return [min, max];
}

export default function GaugeChartdetail2(props) {
  let min, max;
  const type = props.dash_type;
  const current_value = props.value;
  const [isLoading, setIsLoading] = useState(true);

  const [stationInfo, setStationInfo] = useState({});
  const [data, setData] = useState(
    getData(type, current_value, fullRrangeValue)
  );
  const [phGoodRange, setphGoodRange] = useState([]);
  const [ecGoodRange, setecGoodRange] = useState([]);
  const [doGoodRange, setdoGoodRange] = useState([]);
  const [tempGoodRange, settempGoodRange] = useState([]);
  const [tdsGoodRange, settdsGoodRange] = useState([]);
  const [ammoniaGoodRange, setammoniaGoodRange] = useState([]);
  const [salinityGoodRange, setsalinityGoodRange] = useState([]);
  const [turbidityGoodRange, setturbidityGoodRange] = useState([]);

  function getGoodMin(type) {
    if (type.toLowerCase().includes("ph")) {
      //console.log("---------phGoodRange"+phGoodRange[0] )
      return phGoodRange[0];
    } else if (type.toLowerCase().includes("ec")) {
      //console.log("---------ecGoodRange"+ecGoodRange[0] )
      return ecGoodRange[0];
    } else if (type.toLowerCase().includes("do")) {
      // console.log("---------doGoodRange"+doGoodRange[0] )
      return doGoodRange[0];
    } else if (type.toLowerCase().includes("temp")) {
      // console.log("---------tempGoodRange"+tempGoodRange[0] )
      return tempGoodRange[0];
    } else if (type.toLowerCase().includes("tds")) {
      //console.log("---------tdsGoodRange"+tdsGoodRange[0] )
      return tdsGoodRange[0];
    } else if (type.toLowerCase().includes("ammonia")) {
      //console.log("---------ammoniaGoodRange"+ammoniaGoodRange[0] )
      return ammoniaGoodRange[0];
    } else if (type.toLowerCase().includes("sal")) {
      // console.log("---------salinityGoodRange"+salinityGoodRange[0] )
      return salinityGoodRange[0];
    } else if (type.toLowerCase().includes("turb")) {
      // console.log("---------turbidityGoodRange"+turbidityGoodRange[0] )
      return turbidityGoodRange[0];
    }
  }

  function getGoodMax(type) {
    if (type.toLowerCase().includes("ph")) {
      // console.log("---------ph"+phGoodRange[1] )
      return phGoodRange[1];
    } else if (type.toLowerCase().includes("ec")) {
      //console.log("---------ecGoodRange"+ecGoodRange[1] )
      return ecGoodRange[1];
    } else if (type.toLowerCase().includes("do")) {
      //console.log("---------doGoodRange"+doGoodRange[1] )
      return doGoodRange[1];
    } else if (type.toLowerCase().includes("temp")) {
      // console.log("---------tempGoodRange"+tempGoodRange[1] )
      return tempGoodRange[1];
    } else if (type.toLowerCase().includes("tds")) {
      //console.log("---------tdsGoodRange"+tdsGoodRange[1] )
      return tdsGoodRange[1];
    } else if (type.toLowerCase().includes("ammonia")) {
      //console.log("---------ammoniaGoodRange"+ammoniaGoodRange[1] )
      return ammoniaGoodRange[1];
    } else if (type.toLowerCase().includes("sal")) {
      //console.log("---------salinityGoodRange"+salinityGoodRange[1] )
      return salinityGoodRange[1];
    } else if (type.toLowerCase().includes("turb")) {
      //console.log("---------turbidityGoodRange"+turbidityGoodRange[1] )
      return turbidityGoodRange[1];
    }
  }

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
        setphGoodRange([stations["pHMin"], stations["pHMax"]]);
        setecGoodRange([stations["ecMin"], stations["ecMax"]]);
        setdoGoodRange([stations["doMin"], stations["doMax"]]);
        settempGoodRange([stations["tempMin"], stations["tempMax"]]);
        settdsGoodRange([stations["TdsMin"], stations["TdsMax"]]);
        setammoniaGoodRange([stations["ammoniaMin"], stations["ammoniaMax"]]);
        setsalinityGoodRange([stations["salMin"], stations["salMax"]]);
        setturbidityGoodRange([stations["turpMin"], stations["turpMax"]]);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  //console.log("----------" + fullRrangeValue.ph[1]);
  return (
    <div className="max-width container-lg">
      <Chart
        height={140}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          // greenFrom: getGoodMin(type),
          // greenTo: getGoodMax(type),
          greenFrom: getGoodMin(type) ,
          greenTo: getGoodMax(type),
          redFrom: getGoodMax(type), //////ref from type type is props.dash_type
          redTo: getRange(type)[1],
          yellowFrom: getRange(type)[0], //////ref from type type is props.dash_type
          yellowTo: getGoodMin(type) ,
          minorTicks: 5,
          majorTicks: getRange(type),
          min:getRange(type)[0],
          max:getRange(type)[1]
        }}
        rootProps={{ "data-testid": "1" }}
      />
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
