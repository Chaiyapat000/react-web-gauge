import React, { useState } from "react";
import { FormGroup,Card,Button, Modal, ModalHeader, ModalBody, ModalFooter ,Toast,ToastHeader,ToastBody} from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col, Label } from 'reactstrap';

import InputRange from "react-input-range";
import {history} from '../../../../history'
import "../../../../assets/css/dash.css"
import {ControlStation,measureNow} from '../../../../functions/apiActions'
import TimePicker from 'react-time-picker';

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 0.5
      }}
  />
);

const  hourlist = [];
for (var i=0;i<=24;i++) {
    hourlist[i] = {
       label: ""+i+"",
       value: i
    };
}

const  minutelist = [];
for (var i=0;i<=11;i++) {
        minutelist[i] = {
            label: ""+i*5+"",
            value: i*5
    }
}


class ControlModal extends React.Component {
  constructor() {
    super();
    this.state = {
      loading:false,
    }
  }

  componentDidMount() {
  }

  _handleControlStation = () => {
    console.log('777777777777')
    console.log(this.props.station)
    ControlStation(this.props.station).then(success => {
      if (success) {
        // clear field
        this.props.toggle();
        alert("บันทึกการควบคุมสำเร็จ")
      } else {
        alert("ควบคุมไม่สำเร็จ")
      }
    })
  }
  _handleToggle = () => {
    // clear
    this.props.toggle();
  }

  _handleOnChecked = (value) => {

    // this.setState({is_active : !this.props.station.is_active})
    this.props.station.is_active = !this.props.station.is_active
    console.log('7777777777777777 ',this.props.station.is_active);
    this.forceUpdate();
  };

    _handleOnChecked_2 = (value) => {

    // this.setState({is_active : !this.props.station.is_active})
    this.props.station.is_auto_water_treatment = !this.props.station.is_auto_water_treatment
    console.log('7777777777777777 ',this.props.station.is_auto_water_treatment);
    this.forceUpdate();
  };

  // this.props.station.start_time
  // start_time:'00:00',
  // end_time:'23:59'

  onChangeStartTime = (value) =>{
    
    this.props.station.start_time = value + ':00'
    console.log('onChangeStartTime *****  ',this.props.station.start_time)
    // this.forceUpdate();
  }
  onChangeEndTime = (value) =>{
    
    this.props.station.end_time = value + ':00'
    console.log('onChangeEndTime *****  ',this.props.station.end_time)
    // this.forceUpdate();
  }

  
  onChangeEveryH = (value) =>{
    
    console.log('onChangeEveryH *****  ',value)
    this.props.station.check_every_h = value
    this.forceUpdate();
  }

  onChangeEveryM = (value) =>{
    
    console.log('onChangeEveryH *****  ',value)
    this.props.station.check_every_m = value
    this.forceUpdate();
  }

  onChangeEveryMtreatment = (value) =>{
    
    console.log('onChangeEveryMtreatment *****  ',value)
    this.props.station.water_treatment_min_replete = value
    this.forceUpdate();
  }
  

  measureNow = () =>{
    measureNow(this.props.station.stationId).then(success => {
      if (success) {
        // clear field
        this.props.toggle();
        alert("เริ่มการทดสอบคุณภาพน้ำ ใช้เวลาประมาณ 2 นาที")
      } else {
        alert("เริ่มการทดสอบคุณภาพน้ำไม่สำเร็จ")
      }
    })
  }


  render() {
    if (this.state.loading) {
      return <></>;
    }

    console.log('render-control')
    console.log(this.props.station)


    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this._handleToggle}
        className={this.props.className}
      >
        <ModalHeader>แก้ไขอุปกรณ์</ModalHeader>
        <ModalBody className="d-flex flex-column d-flex">
        
        <Col xs="12">
          <Row>
            <Input
              addon
              value="is_activate"
              type="checkbox"
              aria-label="Checkbox for following text input"
              checked={this.props.station.is_active}
              onChange={(e) => this._handleOnChecked(e.target)}
            />
            <Label className="ml-2 mt-0"><h5>เปิดการทำงานสถานี</h5></Label>
          </Row>
          <Row>
            <Input
              addon
              value="is_activate"
              type="checkbox"
              aria-label="Checkbox for following text input"
              checked={this.props.station.is_auto_water_treatment}
              onChange={(e) => this._handleOnChecked_2(e.target)}
            />
            
              <Label className="ml-2 mt-0"><h5>เปิดบำบัดน้ำอัตโนมัติ</h5></Label>  
          </Row>
          <Row>
              <Col xs="3" >
                <h5>ตรวจทุกๆ</h5>
              </Col>
              </Row>
              <Row>
              <Col xs="3" >
                <h5></h5>
              </Col>

              <Col xs="3" >
                <FormGroup>
                  <Input 
                    type="select"
                    value={this.props.station.water_treatment_min_replete}
                    onChange={(e) => this.onChangeEveryMtreatment(e.target.value)}
                  >
                    {
                      minutelist.map((minute, index) => {
                        // console.log(minute)
                        return(
                          <option value={minute.value}>{minute.label}</option>
                        )
                      })
                    }
                  </Input>
                </FormGroup>  
              </Col>
              <Col xs="2" >
                <h5>นาที.</h5>
              </Col>

          </Row>
          <ColoredLine color="red" />
          <Row>
              <Col xs="6" >
                <p><h5>เวลาเริ่มต้นการทำงาน</h5></p>
              </Col>
              <Col xs="6" >
                <TimePicker
                    onChange={(value) => this.onChangeStartTime(value)}
                    value={this.props.station.start_time}
                    locale="th-th"
                />
              </Col>
          </Row>

          <Row>
              <Col xs="6" >
                <p><h5>เวลาสิ้นสุดการทำงาน</h5></p>
              </Col>
              <Col xs="6" >
                <TimePicker
                    onChange={(value) => this.onChangeEndTime(value)}
                    value={this.props.station.end_time}
                    locale="th-th"
                />
              </Col>
          </Row>

          <ColoredLine color="red" />


          <Row>
              <Col xs="3" >
                <h5>ตรวจทุกๆ</h5>
              </Col>
              <Col xs="3" >
                <FormGroup>
                  <Input 
                    type="select"
                    value={this.props.station.check_every_h}
                    onChange={(e) => this.onChangeEveryH(e.target.value)}
                  >
                    {
                      hourlist.map((hour, index) => {
                        // console.log(hour)
                        return(
                          <option value={hour.value}>{hour.label}</option>
                        )
                      })
                    }
                  </Input>
                </FormGroup>  
              </Col>
              <Col xs="2" >
                <h5>ชม.</h5>
              </Col>

              </Row>
              <Row>
              <Col xs="3" >
                <h5></h5>
              </Col>

              <Col xs="3" >
                <FormGroup>
                  <Input 
                    type="select"
                    value={this.props.station.check_every_m}
                    onChange={(e) => this.onChangeEveryM(e.target.value)}
                  >
                    {
                      minutelist.map((minute, index) => {
                        // console.log(minute)
                        return(
                          <option value={minute.value}>{minute.label}</option>
                        )
                      })
                    }
                  </Input>
                </FormGroup>  
              </Col>
              <Col xs="2" >
                <h5>นาที.</h5>
              </Col>

          </Row>
          <ColoredLine color="red" />
          <Row>
            <Col xs="12">
            <Button style={{width:'50%'}} color="success"  onClick={this.measureNow}>
              <h5>ตรวจทันที</h5>
            </Button>
            </Col>
          </Row>
  
        </Col>

        


        </ModalBody>
        <ModalFooter className="border-0">
          <Button className="border-0 rounded-pill" onClick={this._handleControlStation}>
            บันทึก
          </Button>
          <Button
            className="border-0 cancel rounded-pill"
            onClick={this._handleToggle}
          >
            กลับ
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ControlModal;
