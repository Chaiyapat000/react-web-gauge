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
import { Badge } from "reactstrap";

import { BsFillTrashFill } from "react-icons/bs";
import { BsScrewdriver } from "react-icons/bs";
import Dashstatus from "./Dashstatus";
import AddNewItem from "./AddNewItem";
import {
  fetchMeasuredSensor,
  fetchStationInfoById,
  ai,
} from "../../../functions/apiActions";
import { history } from "../../../history";
import DeleteModal from "./modals/DeleteModal";
import EditItemModal from "./modals/EditItemModal";
import ControlModal from "./modals/ControlModal";
import AiModal from "./modals/AiModal";
//import GaugeChartdetail from "./GaugeChartdetail";
import GaugeChartdetail2 from "./GaugeChartdetail2";
import "../../../assets/css/dash.css";
// import * as V from 'victory';
import {
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryZoomContainer,
  VictoryScatter,
} from "victory";

import Chart, { ArgumentAxis, Series, Legend } from "devextreme-react/chart";
import RechartGraph from "./RechartGraph";

class Dashboard_detail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      stations: [],
      measured_data: [],
      current_width: 0,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      isViewItemModalOpen: false,
      isControlModalOpen: false,
      isAiModalOpen: false,
      pred: [],

      temp_list: [],

      ///////////////////pH/////////////////////////
      ph_list: [],
      ///////////////////turb/////////////////////////
      turb_list: [],

      ///////////////////DO/////////////////////////
      do_list: [],

      ///////////////////EC/////////////////////////
      ec_list: [],

      ///////////////////TDS/////////////////////////
      tds_list: [],

      ///////////////////salinity/////////////////////////
      salinity_list: [],

      ///////////////////ammonia/////////////////////////
      ammonia_list: [],
    };

    this.myInput = React.createRef();
  }

  creatDataList = () => {
    var tmp_temp = [];
    var tmp_ph = [];
    var tmp_turb = [];
    var tmp_do = [];
    var tmp_ec = [];
    var tmp_tds = [];
    var tmp_date = [];
    var tmp_index = [];
    var tmp_salinity = [];
    var tmp_ammonia = [];

    for (const i in this.state.measured_data) {
      const data = this.state.measured_data[i];

      tmp_temp.push({ x: data.datetime, y: data.temperature });
      tmp_ph.push({ x: data.datetime, y: data.ph });
      tmp_turb.push({ x: data.datetime, y: data.turbidity });
      tmp_do.push({ x: data.datetime, y: data.do });
      tmp_ec.push({ x: data.datetime, y: data.ec });
      tmp_tds.push({ x: data.datetime, y: data.tds });
      tmp_salinity.push({ x: data.datetime, y: data.salinity });
      tmp_ammonia.push({ x: data.datetime, y: data.ammonia });
      tmp_date.push({ x: data.datetime, y: data.datetime });
      tmp_index.push(data.datetime.slice(9, -3));
    }

    const max_display = 48;
    if (this.state.measured_data.length > max_display) {
      this.setState({
        temp_list: tmp_temp.slice(-max_display),
        ph_list: tmp_ph.slice(-max_display),
        turb_list: tmp_turb.slice(-max_display),
        do_list: tmp_do.slice(-max_display),
        ec_list: tmp_ec.slice(-max_display),
        tds_list: tmp_tds.slice(-max_display),
        salinity_list: tmp_salinity.slice(-max_display),
        ammonia_list: tmp_ammonia.slice(-max_display),
        date_list: tmp_date.slice(-max_display),
      });
    } else if (
      this.state.measured_data.length > 0 &&
      this.state.measured_data.length <= max_display
    ) {
      this.setState({
        temp_list: tmp_temp,
        ph_list: tmp_ph,
        turb_list: tmp_turb,
        do_list: tmp_do,
        ec_list: tmp_ec,
        tds_list: tmp_tds,
        salinity_list: tmp_salinity,
        ammonia_list: tmp_ammonia,
        date_list: tmp_date,
      });
    } else if (this.state.measured_data.length == 0) {
      this.temp_list = [{ x: 0, y: 0 }];

      this.pH_list = [{ x: 0, y: 0 }];

      this.turb_list = [{ x: 0, y: 0 }];

      this.do_list = [{ x: 0, y: 0 }];

      this.ec_list = [{ x: 0, y: 0 }];

      this.tds_list = [{ x: 0, y: 0 }];

      this.salinity_list = [{ x: 0, y: 0 }];

      this.ammonia_list = [{ x: 0, y: 0 }];
    }
    // console.log('8888888888888888888s')
    // //console.log(tmp_ph)

    // console.log(this.state.ph_list)
  };

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  refreshDashboard = () => {
    const station_id = history.location.state.station_id;
    fetchStationInfoById(station_id).then((res) => {
      //console.log('555555555555555station_info')
      //console.log(res)
      this.setState({ stations: res });
    });

    fetchMeasuredSensor(station_id).then((res) => {
      //console.log(res)
      this.setState({ measured_data: res });
      this.creatDataList();
    });
  };

  toggleEdit = () => {
    this.state.isEditModalOpen
      ? this.setState({ isEditModalOpen: false })
      : this.setState({ isEditModalOpen: true });
    this.forceUpdate();
  };
  toggleDelete = () => {
    this.state.isDeleteModalOpen
      ? this.setState({ isDeleteModalOpen: false })
      : this.setState({ isDeleteModalOpen: true });
  };
  toggleControl = () => {
    this.state.isControlModalOpen
      ? this.setState({ isControlModalOpen: false })
      : this.setState({ isControlModalOpen: true });
  };

  toggleAi = () => {
    this.state.isAiModalOpen
      ? this.setState({ isAiModalOpen: false })
      : this.setState({ isAiModalOpen: true });
  };

  aiPred = () => {
    ai(this.state.stations.stationId).then((res) => {
      if (res) {
        // clear field
        // this.props.toggle();
        this.setState({ pred: res });
        this.toggleAi();

        // alert("เริ่มการทดสอบคุณภาพน้ำ ใช้เวลาประมาณ 2 นาที")
      } else {
        alert("เริ่มการทดสอบคุณภาพน้ำไม่สำเร็จ");
      }
    });
  };

  componentDidMount() {
    this.setState({ current_width: this.myInput.current.offsetWidth });
    this.refreshDashboard();
  }

  setLocation = (location, station_id) => {
    // console.log(location.lat(), location.lng(), station_id);

    for (var index in this.state.stations) {
      if (this.state.stations[index].station_id == station_id) {
        // console.log(this.state.stations[index].station_id, "==", station_id);
        this.state.stations[index].location = {
          lat: location.lat(),
          long: location.lng(),
        };
        this.forceUpdate();
      }
    }
  };

  render() {
    // console.log('777777777777777777777777777777');
    // // console.log(history.location.state.station_id)
    //console.log("77777777777777777777777");
    //console.log(this.state.pred);
    const curent_value =
      this.state.measured_data[this.state.measured_data.length - 1];
    const station_info = this.state.stations;
    // console.log(this.state.measured_data)
    // if(curent_value){
    //   console.log(curent_value)
    // }

    // if(this.state.current_width){
    //   console.log(this.state.current_width)
    // }

    return (
      <Container fluid style={{ paddingLeft: 37, paddingRight: 37 }}>
        <Row>
          <Col md={3} style={{ background: "aliceblue" }}>
            <Card
              className="m-2 shadow bg-white rounded-lg border-0"
              color="light"
            >
              <CardBody>
                <p>
                  <Badge color="primary"> สถานะ : </Badge>{" "}
                  {station_info.station_status}
                </p>
                <p>
                  <Badge color="light"> ชื่อสถานี : </Badge>{" "}
                  {station_info.stationName}
                </p>
                <p>
                  <Badge color="light"> ประเภทสถานี : </Badge>{" "}
                  {station_info.stationType}
                </p>
                <p>
                  <Badge color="light"> ตำแหน่ง : </Badge>
                  {station_info.latitude}
                </p>
                {curent_value ? (
                  <p>
                    <Badge color="light"> อัพเดทล่าสุด : </Badge>
                    {curent_value.datetime}
                  </p>
                ) : (
                  <p>
                    <Badge color="light"> อัพเดทล่าสุด:</Badge>
                    {0}
                  </p>
                )}
                <p>
                  <Badge color="light"> userId : </Badge>
                  {station_info.userId}
                </p>
                <p>
                  <Badge color="light"> stationId : </Badge>
                  {station_info.stationId}
                </p>
                <p>
                  <Badge color="light"> Volt : </Badge> {station_info.power} DC
                </p>
              </CardBody>
            </Card>
            <Card
              className="m-2 shadow bg-white rounded-lg border-0"
              color="light"
            >
              <CardBody>
                <CardText>
                  <Badge color="primary">การตั้งค่าปัจจุบัน</Badge>
                </CardText>
                <CardText>
                  <Badge color="light"> เวลาเริ่มต้นการทำงาน : </Badge>{" "}
                  {this.state.stations.start_time}
                </CardText>
                <CardText>
                  <Badge color="light"> เวลาสิ้นสุดการทำงาน : </Badge>{" "}
                  {this.state.stations.end_time}
                </CardText>
                <CardText>
                  <Badge color="light"> ตรวจทุกๆ : </Badge>{" "}
                  {this.state.stations.check_every_h} {" ชม."}{" "}
                  {this.state.stations.check_every_m} {" นาที "}
                </CardText>
              </CardBody>
            </Card>

            <br></br>
            <Row style={{ justifyContent: "space-evenly" }}>
              <Button color="danger" onClick={this.toggleDelete}>
                {" "}
                ลบสถานี <BsFillTrashFill />
              </Button>{" "}
              <Button color="warning" onClick={this.toggleEdit}>
                {" "}
                แก้ไข <BsScrewdriver />
              </Button>
            </Row>
            <br></br>
            <Row style={{ justifyContent: "space-evenly" }}>
              <Button
                style={{ width: "80%" }}
                color="primary"
                onClick={this.toggleControl}
              >
                ควบคุม
              </Button>{" "}
            </Row>
            <br></br>
            <Row style={{ justifyContent: "space-evenly" }}>
              <Button
                style={{ width: "80%" }}
                color="primary"
                onClick={this.aiPred}
              >
                ทำนายคุณภาพน้ำด้วยระบบปัญญาประดิษฐ์
              </Button>{" "}
            </Row>
          </Col>
          <Col md={9} style={{ backgroundColor: "whitesmoke" }}>
            {curent_value ? (
              <Row >
                <Row style={{ width: "-webkit-fill-available" ,marginTop: "12px" }}>

                <Col className="col-md-3">
                  <Card className="shadow bg-white rounded-lg border-0" style={{textAlign: "-webkit-center"}}>
                    <Dashstatus
                      dash_name={"Ammonia"}
                      value={curent_value.ammonia}
                      activate={station_info.salSensorStatus}
                    ></Dashstatus>
                    <GaugeChartdetail2 dash_type={"Ammonia"} value={curent_value.ammonia} />
                    <Button color="warning" onClick={this.toggleEdit}>
                      {" "}
                      แก้ไข <BsScrewdriver />
                    </Button>
                  </Card>
                </Col>

                <Col className="col-md-3" >
                  <Card className="shadow bg-white rounded-lg border-0 " style={{textAlign: "-webkit-center"}}>
                    <Dashstatus
                      dash_name={"Temperature"}
                      value={curent_value.temperature}
                      activate={station_info.tempSensorStatus}
                    >
                      {" "}
                    </Dashstatus>
                   <GaugeChartdetail2
                      dash_type={"Temperature"}
                      value={curent_value.temperature}
                    /> 
                    <Button color="warning" onClick={this.toggleEdit}>
                      {" "}
                      แก้ไข <BsScrewdriver />
                    </Button>
                  </Card>
                </Col>
                <Col className="col-md-3">
                  <Card className="shadow bg-white rounded-lg border-0" style={{textAlign: "-webkit-center"}}>
                    <Dashstatus
                      dash_name={"pH"}
                      value={curent_value.ph}
                      activate={station_info.phSensorStatus}
                    ></Dashstatus>
                    <GaugeChartdetail2 dash_type={"pH"} value={curent_value.ph} />
                    <Button color="warning" onClick={this.toggleEdit}>
                      {" "}
                      แก้ไข <BsScrewdriver />
                    </Button>
                  </Card>
                </Col>

                <Col className="col-md-3">
                  <Card className="shadow bg-white rounded-lg border-0" style={{textAlign: "-webkit-center"}}>
                    <Dashstatus
                      dash_name={"DO"}
                      value={curent_value.do}
                      activate={station_info.doSensorStatus}
                    ></Dashstatus>
                    <GaugeChartdetail2 dash_type={"DO"} value={curent_value.do} /> 
                    
                    <Button color="warning" onClick={this.toggleEdit}>
                      {" "}
                      แก้ไข <BsScrewdriver />
                    </Button>
                  </Card>
                  </Col>
              </Row>
              <Row  style={{ width: "-webkit-fill-available",marginTop: "12px" }}>
              <Col className="col-md-3">
                <Card className="shadow bg-white rounded-lg border-0" style={{textAlign: "-webkit-center"}}>
                    <Dashstatus
                      dash_name={"EC"}
                      value={curent_value.ec}
                      activate={station_info.ecSensorStatus}
                    ></Dashstatus>
                    <GaugeChartdetail2 dash_type={"EC"} value={curent_value.ec} /> 
                    
                    <Button color="warning" onClick={this.toggleEdit}>
                      {" "}
                      แก้ไข <BsScrewdriver />
                    </Button>
                  </Card>
              </Col>
              <Col className="col-md-3">
                <Card className="shadow bg-white rounded-lg border-0" style={{textAlign: "-webkit-center"}}>
                  <Dashstatus
                    dash_name={"TDS"}
                    value={curent_value.tds}
                    activate={station_info.tdsSensorStatus}
                  ></Dashstatus>
                 <GaugeChartdetail2 dash_type={"TDS"} value={curent_value.tds} />
                  
                  <Button color="warning" onClick={this.toggleEdit}>
                    {" "}
                    แก้ไข <BsScrewdriver />
                  </Button>
                </Card>
              </Col>
              <Col className="col-md-3">
                <Card className="shadow bg-white rounded-lg border-0" style={{textAlign: "-webkit-center"}}>
                  <Dashstatus
                    dash_name={"Salinity"}
                    value={curent_value.salinity}
                    activate={station_info.salSensorStatus}
                  ></Dashstatus>
                    <GaugeChartdetail2 dash_type={"Salinity"} value={curent_value.salinity} />
                  
                  <Button color="warning" onClick={this.toggleEdit}>
                    {" "}
                    แก้ไข <BsScrewdriver />
                  </Button>
                </Card>
              </Col>
              <Col className="col-md-3">
                  <Card className="shadow bg-white rounded-lg border-0" style={{textAlign: "-webkit-center"}}>
                    <Dashstatus
                      dash_name={"Turbidity"}
                      value={curent_value.turbidity}
                      activate={station_info.turbiditySensorStatus}
                    ></Dashstatus>
                      <GaugeChartdetail2 dash_type={"Turbidity"} value={curent_value.turbidity} />
                    
                    <Button color="warning" onClick={this.toggleEdit}>
                      {" "}
                      แก้ไข <BsScrewdriver />
                    </Button>
                  </Card>
                </Col>
              {/* <Col className="col-md-3">
                  <Card className="shadow bg-white rounded-lg border-0" style={{textAlign: "-webkit-center"}}>
                    <Dashstatus
                      dash_name={"Ammonia"}
                      value={curent_value.ammonia}
                      activate={station_info.salSensorStatus}
                    ></Dashstatus>
                    <GaugeChartdetail2 dash_type={"Ammonia"} value={curent_value.ammonia} />
                    <Button color="warning" onClick={this.toggleEdit}>
                      {" "}
                      แก้ไข <BsScrewdriver />
                    </Button>
                  </Card>
                </Col> */}
                </Row>
              </Row>
              ////////////////////////////////////////////////////////////////////////////////////////////////
            ) : (
              <Row>
                <Dashstatus dash_name={"Temperature"} value={0}>
                  {" "}
                </Dashstatus>
                <Dashstatus dash_name={"pH"} value={0}></Dashstatus>
                <Dashstatus dash_name={"Turbidity"} value={0}></Dashstatus>
                <Dashstatus dash_name={"DO"} value={0}></Dashstatus>
                <Dashstatus dash_name={"EC"} value={0}></Dashstatus>
                <Dashstatus dash_name={"TDS"} value={0}></Dashstatus>
                <Dashstatus dash_name={"Salinity"} value={0}></Dashstatus>
                <Dashstatus dash_name={"Ammonia"} value={0}></Dashstatus>
              </Row>
            )}


        
            <br></br>
            <br></br>

            <Card>
              <div ref={this.myInput}>
                <h2>Temperature 'C</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={this.state.current_width}
                  height={300}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={true}
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                  }
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "blue" },
                    }}
                    data={this.state.temp_list}
                    // y={this.state.temp_list.y}
                    // labels={({ datum }) => datum.y}
                    // containerComponent={
                    //   <VictoryVoronoiContainer
                    //     labels={({ datum }) => datum.x, datum.y}
                    //   />
                    // }
                  />

                  <VictoryAxis
                    dependentAxis
                    fixLabelOverlap={true}
                    standalone={false}
                  />
                  <VictoryAxis fixLabelOverlap={true} standalone={false} />
                </VictoryChart>

                {/* <VictoryChart domainPadding={{ y: 10 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${round(datum.x, 2)}, ${round(datum.y, 2)}`}
                />
              }
            >
              <VictoryLine
                y={(datum) => Math.sin(2 * Math.PI * datum.x)}
              />
            </VictoryChart> */}
              </div>
            </Card>

            <br></br>
            {/* xxxxxxxxxxxxpH_listxxxxxxxxxxx */}
            <Card>
              <div ref={this.myInput}>
                <h2>pH</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={this.state.current_width}
                  height={300}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={false}
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                  }
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "blue" },
                    }}
                    data={this.state.ph_list}
                  />
                  <VictoryAxis
                    dependentAxis
                    fixLabelOverlap={true}
                    standalone={false}
                  />
                  <VictoryAxis fixLabelOverlap={true} standalone={false} />
                </VictoryChart>
              </div>
            </Card>

            <br></br>
            {/* xxxxxxxxxxxturb_listxxxxxxxxxxxx */}
            <Card>
              <div ref={this.myInput}>
                <h2>Turbidity NTU</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={this.state.current_width}
                  height={300}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={false}
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                  }
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "blue" },
                    }}
                    data={this.state.turb_list}
                  />
                  <VictoryAxis
                    dependentAxis
                    fixLabelOverlap={true}
                    standalone={false}
                  />
                  <VictoryAxis fixLabelOverlap={true} standalone={false} />
                </VictoryChart>
              </div>
            </Card>

            <br></br>
            {/* xxxxxxxxxxxxdo_listxxxxxxxxxxx */}
            <Card>
              <div ref={this.myInput}>
                <h2>DO mg/L</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={this.state.current_width}
                  height={300}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={false}
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                  }
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "blue" },
                    }}
                    data={this.state.do_list}
                  />
                  <VictoryAxis
                    dependentAxis
                    fixLabelOverlap={true}
                    standalone={false}
                  />
                  <VictoryAxis fixLabelOverlap={true} standalone={false} />
                </VictoryChart>
              </div>
            </Card>

            <br></br>
            {/* xxxxxxxxxxxxec_listxxxxxxxxxxx */}
            <Card>
              <div ref={this.myInput}>
                <h2>EC us/cm</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={this.state.current_width}
                  height={300}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={false}
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                  }
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "blue" },
                    }}
                    data={this.state.ec_list}
                  />
                  <VictoryAxis
                    dependentAxis
                    fixLabelOverlap={true}
                    standalone={false}
                  />
                  <VictoryAxis fixLabelOverlap={true} standalone={false} />
                </VictoryChart>
              </div>
            </Card>
            <br></br>
            {/* xxxxxxxxxxxxtds_listxxxxxxxxxxx */}
            <Card>
              <div ref={this.myInput}>
                <h2>TDS PPM</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={this.state.current_width}
                  height={300}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={false}
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                  }
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "blue" },
                    }}
                    data={this.state.tds_list}
                  />
                  <VictoryAxis
                    dependentAxis
                    fixLabelOverlap={true}
                    standalone={false}
                  />
                  <VictoryAxis fixLabelOverlap={true} standalone={false} />
                </VictoryChart>
              </div>
            </Card>

            <br></br>
            {/* xxxxxxxxxxxsalinity_listxxxxxxxxxxxx */}
            <Card>
              <div ref={this.myInput}>
                <h2>Salinity PPT</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={this.state.current_width}
                  height={300}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={false}
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                  }
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "blue" },
                    }}
                    data={this.state.salinity_list}
                  />
                  <VictoryAxis
                    dependentAxis
                    fixLabelOverlap={true}
                    standalone={false}
                  />
                  <VictoryAxis fixLabelOverlap={true} standalone={false} />
                </VictoryChart>
              </div>
            </Card>

            <br></br>
            {/* xxxxxxxxxxxsalinity_listxxxxxxxxxxxx */}
            <Card>
              <div ref={this.myInput}>
                <h2>Ammonia mg/L</h2>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={this.state.current_width}
                  height={300}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      responsive={false}
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                  }
                >
                  <VictoryLine
                    style={{
                      data: { stroke: "blue" },
                    }}
                    data={this.state.ammonia_list}
                  />
                  <VictoryAxis
                    dependentAxis
                    fixLabelOverlap={true}
                    standalone={false}
                  />
                  <VictoryAxis fixLabelOverlap={true} standalone={false} />
                </VictoryChart>
              </div>
            </Card>

            <br></br>
            <br></br>
          </Col>
        </Row>

        <EditItemModal
          isOpen={this.state.isEditModalOpen}
          toggle={this.toggleEdit}
          station={this.state.stations}
          setLocation={this.props.setLocation}
        />
        <DeleteModal
          isOpen={this.state.isDeleteModalOpen}
          toggle={this.toggleDelete}
          station={this.state.stations}
          refresh={this.props.refresh}
        />

        <ControlModal
          isOpen={this.state.isControlModalOpen}
          toggle={this.toggleControl}
          station={this.state.stations}
          refresh={this.props.refresh}
        />

        <AiModal
          isOpen={this.state.isAiModalOpen}
          toggle={this.toggleAi}
          pred={this.state.pred}
          refresh={this.props.refresh}
        />
      </Container>
    );
  }
}

export default Dashboard_detail;
