import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Badge,
  Row, Col,
} from "reactstrap";

import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import "../../../../assets/css/dash.css";
import {
  fetchAllStationInfo,
  editUser,
} from "../../../../functions/apiActions";
import {history} from '../../../../history'

class ViewUserModel extends React.Component {
  constructor() {
    super();
    this.state = {
      stations: [],
      permission: "",
      isNoStation: false,
    };
  }

  componentDidMount() {
    this.refreshDashboard();
  }

  refreshDashboard = () => {
    console.log("fetching station of ", this.props.user.id);
    fetchAllStationInfo({
      userId: this.props.user.id,
    }).then((fetchedStations) => {
      console.log(fetchedStations);
      if (fetchedStations == null || fetchedStations == undefined || fetchedStations == false) {
        this.setState({isNoStation: true})
        return false
      }
      const stations = [];
      const sensorValues = fetchedStations.map((station, index) => {
        console.log(station);
        if (station.stationId != "") {
        }
      });
      // Wait for all requests, and then setState
      Promise.all(sensorValues).then(() => {
        this.setState({
          stations: stations,
          permission: this.props.user.permission
        });
      });
    });
  };

  _handleChangeRole = () => {
    // console.log(this.props.user);
    let request = {
      userId: this.props.user.id,
      email: this.props.user.email,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      permissions: this.state.permission
    }
    editUser(request).then(success => {
      if (success) {
        history.push("/usermanage")
      } else {
        alert("เปลี่ยนสิทธิ์ไม่สำเร็จ")
      }
    })
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader>รายละเอียดผู้ใช้</ModalHeader>
        <ModalBody className="d-flex flex-column">

          <InputGroup className="px-4 my-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>ไอดี</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="ไอดี" value={this.props.user.id} disabled/>
          </InputGroup>

          <InputGroup className="px-4 my-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>อีเมล</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="อีเมล" value={this.props.user.email} disabled/>
          </InputGroup>

          <InputGroup className="px-4 my-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>ชื่อ</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="ชื่อ" value={this.props.user.first_name + " " + this.props.user.last_name} disabled/>
          </InputGroup>

          <div className="px-4 my-1">

          <Row>
          <Col>
          <Input type="select" name="role" id="role" value={this.state.permission} onChange={e => this.setState({permission: e.target.value})}>
          <option value="user">user</option>
          <option value="admin">admin</option>
          </Input>
          </Col>
          <Col xs="auto">
          <Button
            className=" border-0 rounded-pill"
            onClick={this._handleChangeRole}
            className="float-right"
          >เปลี่ยนสิทธิ์</Button>
          </Col>
          </Row>
          </div>
          <div class="border-top my-3"></div>
          {
            this.state.isNoStation ?
            (
              <Row>
              <Col className="text-center">
              <Card className="m-3 border-0 bg-light rounded-lg">
              <CardBody>
              <div>ไม่พบอุปกรณ์ของผู้ใช้ดังกล่าว</div>
              </CardBody>
              </Card>
              </Col>
              </Row>
            ):
            <Label className="px-4 my-1">อุปกรณ์</Label>
          }
          {
            this.state.stations.map((station, index) => {
              return (
                <Card className="p-0 mx-4 my-2 shadow bg-white rounded-lg border-0" color="light">
                <CardBody>
                <CardText>
                 { station.station_name }
                <Badge className="float-right head">{ station.station_type == "agriculture" ? "เกษตรกร" : station.station_type == "farm" ? "ปศุสัตว์" : station.station_type == "irrigation" ? "ประมง" : "ประเภทผิดพลาด"}</Badge>
                </CardText>
                </CardBody>
                </Card>
              )
            })
          }
        </ModalBody>
        <ModalFooter className="border-0">
          <Button
            className=" border-0 rounded-pill"
            onClick={this.props.toggle}
          >
            ปิด
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ViewUserModel;
