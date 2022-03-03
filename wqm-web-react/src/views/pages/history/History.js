import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Table } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Label, Button, ButtonGroup, Badge, Card, CardBody } from 'reactstrap';
import { DatePicker } from 'react-widgets'
import momentLocalizer from "react-widgets-moment";
import Moment from 'moment';
import "react-widgets/dist/css/react-widgets.css";

import "../../../assets/css/history.css"
import { IoIosArrowDropdown } from "react-icons/io"
import { Chart } from 'react-charts'
import LoadingScreenOverlay from "../../elements/LoadingScreenOverlay";
import { fetchStationInfo,fetchMeasuredSensor, getStationHistory } from '../../../functions/apiActions'

import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { VictoryVoronoiContainer,VictoryLine,VictoryBrushContainer,VictoryTheme,VictoryAxis,VictoryBar,VictoryChart, VictoryZoomContainer,VictoryScatter} from 'victory';


Moment.locale("th");
momentLocalizer();


const MONTHS = {
  th: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],
};
class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      stations: [],
      station: {},
      measured_data: [],
      selectedIndex: 0,
      selected: "ph",
      showResult: false,
      showNoResult: false,
      minDate: new Date(),
      maxDate: new Date(),
      details: [],
      from: undefined,
      to: undefined,
      avaliable_start_date:'',
      avaliable_end_date:'',
      current_width: 0,
    }
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.myInput = React.createRef()
    // this.state = this.getInitialState();
  }

  static defaultProps = {
    numberOfMonths: 2,
  };

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }



  refreshDashboard = () => {
    fetchStationInfo().then(fetchedStations => {
      console.log(fetchedStations)
      this.setState({stations:fetchedStations})
    })
  }

  get_station_measure_data = () =>{
    console.log('this.state.station********************',this.state)
    if(this.state.selectedIndex != -1){
      fetchMeasuredSensor(this.state.station.stationId).then(res => {
        console.log('res********************',res)
        if(res.length != 0){
          this.setState({ measured_data:res,
            avaliable_start_date:res[0].datetime,
            avaliable_end_date:res[res.length-1].datetime
          })
        }
        else{
          this.setState({ measured_data:res,
            avaliable_start_date:'',
            avaliable_end_date:''
          })
        }
  
        // this.creatDataList()
      })
    }
    else{
      this.setState({ measured_data:[],
        avaliable_start_date:'',
        avaliable_end_date:''
      })
    }
    this.forceUpdate()
  }

  // get_station_measure_data = () =>{

  //     console.log('get_station_measure_data*************',this.state.station)

    
  // }

  componentDidMount() {
    this.refreshDashboard()
    this.setState({current_width:this.myInput.current.offsetWidth})
  }
 
  _handleSearchHistory(){

  }



  render() {

    console.log('this.prop--->',this.props)

    if (this.state.loading) {
      return (
        <LoadingScreenOverlay color="light" />
      )
    } else if (this.state.loading == null) {
      return (
        <Row>
        <Col className="text-center">
        <Card className="m-3 border-0 bg-light rounded-lg">
        <CardBody>
        <div>ไม่สามารถดูประวัติการใช้งานได้ กรุณา <a href="/">สร้างอุปกรณ์</a> ก่อน</div>
        </CardBody>
        </Card>
        </Col>
        </Row>
      )
    }


    console.log("this.state.stations -> ",this.state.stations)
    console.log("this.state.selectedIndex -> ",this.state.selectedIndex)
    console.log("this.state.station -> ",this.state.station)
    
    if(this.state.measured_data.length != 0){
      console.log("this.state.measured_data[0].datetime --> ",new Date(this.state.measured_data[0].datetime))
    }

    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    var tmp_temp = []
    var tmp_ph   = []
    var tmp_turb = []
    var tmp_do   = []
    var tmp_ec   = []
    var tmp_tds   = []
    var tmp_date = []
    var tmp_index = []
    var tmp_salinity = []

    if(this.state.avaliable_end_date != ''){
      var month_y = new Date(this.state.avaliable_end_date).getFullYear()
      var month_m = new Date(this.state.avaliable_end_date).getMonth()
    }
    else{
      var month_y = new Date().getFullYear()
      var month_m = new Date().getMonth()
    }

    return (
      <Container>
        <Row>
          <Col>
          <h2 className="mt-4 mb-5">ประวัติการใช้งาน</h2>
          <Card className="m-3 border-0 bg-light rounded-lg">
            <CardBody>
            <Label for="stationSelect" className="label">กรุณาเลือกสถานี</Label>
            <Input type="select" name="select" id="stationSelect" className="mx-1 shadow-sm border-0" onChange={e => this.setState({selectedIndex: e.target.value, station: this.state.stations[e.target.value]},this.get_station_measure_data)}>
              <option key={-1} value={-1}>{'เลือก'}</option>
              {
                
                this.state.stations.map((station, index) => {
                  // console.log(station);
                  return (
                    <option key={index} value={index}>{station.stationName}</option>
                  )
                })
              }
            </Input>
            <br></br>
            <h6>ประวัติที่มี ตั้งแต่ : {this.state.avaliable_start_date}{" - "}{this.state.avaliable_end_date}</h6>

              <Label className="mt-4">กรุณาเลือกวัน/เดือน/ปี</Label>

            <Row style={{justifyContent: 'center'}}>
              <div className="RangeExample">
                <p>
                {!from && !to && 'โปรดเลือกวันเริ่มต้น'}
                {from && !to && 'โปรดเลือกวันสิ้นสุด'}
                {from &&
                  to &&
                  `จาก ${from.toLocaleDateString('ko-KR')} ถึง
                      ${to.toLocaleDateString('ko-KR')}`}{' '}
                {from && to && (
                  <button className="link" onClick={this.handleResetClick}>
                    Reset
                  </button>
                )}
                </p>
              {/* {console.log('this.state.avaliable_start_date-----**** ')}
              {console.log(new Date(this.state.avaliable_start_date))}
              {console.log(new Date(2018, 8))} */}
              
              {/* {console.log('******************',new Date(this.state.avaliable_start_date).getFullYear())}
              {console.log('******************',new Date(this.state.avaliable_start_date).getMonth())} */}
              <DayPicker
                className="Selectable"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}


                // fromMonth={new Date(this.state.avaliable_start_date)}
                // toMonth={new Date(this.state.avaliable_end_date)}

                
                months={MONTHS['th']}
                month={new Date(month_y,month_m)}
                fromMonth={new Date(this.state.avaliable_start_date)}
                toMonth={new Date(this.state.avaliable_end_date)}
                fixedWeeks

                // month={new Date(2018, 8)}
                // fromMonth={new Date(2018, 8)}
                // toMonth={new Date(2018, 11)}
                // fixedWeeks
              />


              <Helmet>
                <style>{`
                    .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                      background-color: #f0f8ff !important;
                      color: #4a90e2;
                    }
                    .Selectable .DayPicker-Day {
                      border-radius: 0 !important;
                    }
                    .Selectable .DayPicker-Day--start {
                      border-top-left-radius: 50% !important;
                      border-bottom-left-radius: 50% !important;
                    }
                    .Selectable .DayPicker-Day--end {
                      border-top-right-radius: 50% !important;
                      border-bottom-right-radius: 50% !important;
                    }
                  `}</style>
              </Helmet>
              </div>
              </Row>         
            </CardBody>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col>
              
              {console.log(modifiers)}
              {this.state.measured_data.map((data, index) => {
                  // {console.log("this.state.measured_data +++-> ",data)}
                  if (new Date(data.datetime) > modifiers.start && new Date(data.datetime) < modifiers.end) {
                    // console.log('in between',new Date(data.datetime));
                    tmp_temp.push({x:data.datetime,y:data.temperature})
                    tmp_ph.push({x:data.datetime,y:data.ph})
                    tmp_turb.push({x:data.datetime,y:data.turbidity})
                    tmp_do.push({x:data.datetime,y:data.do})
                    tmp_ec.push({x:data.datetime,y:data.ec})
                    tmp_tds.push({x:data.datetime,y:data.tds})
                    tmp_salinity.push({x:data.datetime,y:data.salinity})
                    tmp_date.push({x:data.datetime,y:data.datetime})
                    tmp_index.push(data.datetime.slice(9,-3))
                  } else {
                    // console.log('outside',typeof(new Date(data.datetime)),typeof(modifiers.start));
                  }
              })
              }
              {/* {console.log('tmp_ph------+++ ',tmp_ph)} */}

              
          <Card>
          <div ref={this.myInput}>
          <h2>Temperature 'C</h2>
            <VictoryChart
              theme={VictoryTheme.material}
              width={this.state.current_width}
              height={300}
              scale={{x: "time"}}
              // containerComponent={
              //   <VictoryZoomContainer responsive={true}
              //     zoomDimension="x"
              //     zoomDomain={this.state.zoomDomain}
              //     onZoomDomainChange={this.handleZoom.bind(this)}
              //   />
                
                
              // }
            >
              <VictoryLine
                style={{
                  data: {stroke: "blue"}
                }}
                data={tmp_temp}
              />
  
            <VictoryAxis dependentAxis fixLabelOverlap={true} standalone={false}/>
            <VictoryAxis  fixLabelOverlap={true} standalone={false}/>
            </VictoryChart>
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
              scale={{x: "time"}}
              // containerComponent={
              //   <VictoryZoomContainer responsive={false}
              //     zoomDimension="x"
              //     zoomDomain={this.state.zoomDomain}
              //     onZoomDomainChange={this.handleZoom.bind(this)}
              //   />
              // }
            >
              <VictoryLine
                style={{
                  data: {stroke: "blue"}
                }}
                data={tmp_ph}
              />
            <VictoryAxis dependentAxis fixLabelOverlap={true} standalone={false}/>
            <VictoryAxis  fixLabelOverlap={true} standalone={false}/>
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
              scale={{x: "time"}}
              // containerComponent={
              //   <VictoryZoomContainer responsive={false}
              //     zoomDimension="x"
              //     zoomDomain={this.state.zoomDomain}
              //     onZoomDomainChange={this.handleZoom.bind(this)}
              //   />
              // }
            >
              <VictoryLine
                style={{
                  data: {stroke: "blue"}
                }}
                data={tmp_turb}
              />
            <VictoryAxis dependentAxis fixLabelOverlap={true} standalone={false}/>
            <VictoryAxis  fixLabelOverlap={true} standalone={false}/>
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
              scale={{x: "time"}}
              // containerComponent={
              //   <VictoryZoomContainer responsive={false}
              //     zoomDimension="x"
              //     zoomDomain={this.state.zoomDomain}
              //     onZoomDomainChange={this.handleZoom.bind(this)}
              //   />
              // }
            >
              <VictoryLine
                style={{
                  data: {stroke: "blue"}
                }}
                data={tmp_do}
              />
            <VictoryAxis dependentAxis fixLabelOverlap={true} standalone={false}/>
            <VictoryAxis  fixLabelOverlap={true} standalone={false}/>
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
              scale={{x: "time"}}
              // containerComponent={
              //   <VictoryZoomContainer responsive={false}
              //     zoomDimension="x"
              //     zoomDomain={this.state.zoomDomain}
              //     onZoomDomainChange={this.handleZoom.bind(this)}
              //   />
              // }
            >
              <VictoryLine
                style={{
                  data: {stroke: "blue"}
                }}
                data={tmp_ec}
              />
            <VictoryAxis dependentAxis fixLabelOverlap={true} standalone={false}/>
            <VictoryAxis  fixLabelOverlap={true} standalone={false}/>
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
              scale={{x: "time"}}
              // containerComponent={
              //   <VictoryZoomContainer responsive={false}
              //     zoomDimension="x"
              //     zoomDomain={this.state.zoomDomain}
              //     onZoomDomainChange={this.handleZoom.bind(this)}
              //   />
              // }
            >
              <VictoryLine
                style={{
                  data: {stroke: "blue"}
                }}
                data={tmp_tds}
              />
            <VictoryAxis dependentAxis fixLabelOverlap={true} standalone={false}/>
            <VictoryAxis  fixLabelOverlap={true} standalone={false}/>
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
              scale={{x: "time"}}
              // containerComponent={
              //   <VictoryZoomContainer responsive={false}
              //     zoomDimension="x"
              //     zoomDomain={this.state.zoomDomain}
              //     onZoomDomainChange={this.handleZoom.bind(this)}
              //   />
              // }
            >
              <VictoryLine
                style={{
                  data: {stroke: "blue"}
                }}
                data={tmp_salinity}
              />
            <VictoryAxis dependentAxis fixLabelOverlap={true} standalone={false}/>
            <VictoryAxis  fixLabelOverlap={true} standalone={false}/>
            </VictoryChart>
          </div>
          </Card>
          </Col>
        </Row>
        <br>
        </br>
        <br>
        </br>


        </Container>
    );
  }
}

export default History;
