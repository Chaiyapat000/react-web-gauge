import GaugeChart from "react-gauge-chart";
import React from "react";
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

function GaugeChartdetail(props) {
  const chartStyle = {
    height: 250,
  };
  console.log(props.value);
  const data = props.value;

  function phTextColorstate() {
    console.log(data.ph);
    return data.ph > 5 ? "#10e317" : "#e31010";
  }

  function doTextColorstate() {
    const DO = data.do;
    return DO > 9.5
      ? "#22f230"
      : DO > 6.5
      ? "#5ef78c"
      : DO > 4
      ? "#f0ff21"
      : "#EA4228";
  }

  function phChange() {
    return data.ph / 14;
  }

  function doChange() {
    return data.do / 14;
  }
  return (
    <Row>
      {/*-------------------------PH gauge-----------------------*/}
      
        <Card className="m-2 shadow bg-white rounded-lg border-0" color="light">
          <CardBody>
            <CardTitle>PH</CardTitle>
            <GaugeChart
              id="ph-chart"
              nrOfLevels={14}
              arcsLength={[0.5, 0.5]}
              colors={["#EA4228", "#5BE12C"]}
              percent={phChange()}
              arcPadding={0.02}
              formatTextValue={(value) => ((value * 14) / 100).toPrecision(3)}
              textColor={phTextColorstate()}
              //style={chartStyle}
            />
          </CardBody>
        </Card>
      
      {/*-------------------------PH gauge-----------------------*/}

      {/*-------------------------turb gauge-----------------------*/}
      
        <Card className="m-2 shadow bg-white rounded-lg border-0" color="light">
          <CardBody>
            <CardTitle>Turbidity</CardTitle>
            <GaugeChart
              id="Turbidity-chart"
              nrOfLevels={14}
              arcsLength={[0.5, 0.5]}
              colors={["#EA4228", "#5BE12C"]}
              percent={0.5}
              arcPadding={0.02}
              formatTextValue={(value) => ((value * 14) / 100).toPrecision(3)}
              //textColor={textColorstate()}
              //style={chartStyle}
            />
          </CardBody>
        </Card>
      
      {/*-------------------------turb gauge-----------------------*/}

      {/*-------------------------Do gauge-----------------------*/}
      <div>
        <Card className="m-2 shadow bg-white rounded-lg border-0" color="light">
          <CardBody>
            <CardTitle>DO mg/L</CardTitle>
            <GaugeChart
              id="DO-chart"
              nrOfLevels={12}
              arcsLength={[4 / 12, 2.5 / 12, 3 / 12, 2.5 / 12]}
              colors={["#EA4228", "#f0ff21", "#5ef78c", "#22f230"]}
              percent={data.do / 12}
              arcPadding={0.02}
              formatTextValue={(value) => (value / 100).toPrecision(3)}
              textColor={doTextColorstate()}
              //style={chartStyle}
            />
          </CardBody>
        </Card>
      </div>
      {/*-------------------------Do gauge-----------------------*/}

      {/*-------------------------EC gauge-----------------------*/}
      <div>
        <Card className="m-2 shadow bg-white rounded-lg border-0" color="light">
          <CardBody>
            <CardTitle>EC Us/cm</CardTitle>
            <GaugeChart
              id="EC-chart"
              nrOfLevels={13000}
              arcsLength={[4 / 12, 2.5 / 12, 3 / 12, 2.5 / 12]}
              colors={["#EA4228", "#f0ff21", "#5ef78c", "#22f230"]}
              percent={data.ec / 1000}
              arcPadding={0.02}
              formatTextValue={(value) => (value / 1000).toPrecision(2)}
              textColor={doTextColorstate()}
              //style={chartStyle}
            />
          </CardBody>
        </Card>
      </div>
      {/*-------------------------EC gauge-----------------------*/}
    </Row>
  );
}

export default GaugeChartdetail;
