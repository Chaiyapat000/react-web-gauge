import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Button,
  Progress,
  Tooltip
} from "reactstrap";
import { FaBeer } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";
import { Badge } from "reactstrap";
import EditItemModal from "./modals/EditItemModal";
import DeleteModal from "./modals/DeleteModal";
import ViewItemModal from "./modals/ViewItemModal";
import { history } from '../../../history'

class DashItem extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      isViewItemModalOpen: false,
    }
  }

  toggleEdit = () => {
    this.state.isEditModalOpen
      ? this.setState({ isEditModalOpen: false })
      : this.setState({ isEditModalOpen: true });
  };
  toggleDelete = () => {
    this.state.isDeleteModalOpen
      ? this.setState({ isDeleteModalOpen: false })
      : this.setState({ isDeleteModalOpen: true });
  };
  toggleView = () => {
    this.state.isViewItemModalOpen
      ? this.setState({ isViewItemModalOpen: false })
      : this.setState({ isViewItemModalOpen: true });
  };
  go_dashboard_detail = (station_id) => {
    console.log("***************88*******************");
    console.log(station_id)
    history.push("/dashboard_detail",{ station_id:station_id})
  }



  render() {
    
    console.log(this.props.station);
    // console.log(this.props.key);
    console.log("**********************************");
    console.log(this.props.id);
    console.log("**********************************");
    console.log(history)
    return (
      <div className="col-12 col-sm-6 col-lg-4 p-0">
        <Card className="p-0 mx-4 my-2 shadow bg-white rounded-lg border-0" color="light">
          <CardHeader className="text-left border-0">
            { this.props.station.is_active == true ? 'พร้อมใช้งาน':'ปิดการใช้งาน' }
            <Badge className="float-right head">{ this.props.station.stationType }</Badge>
          </CardHeader>
          <CardBody>
            <CardText className="font-weight-bold">รายละเอียด</CardText>
            <CardText><Badge color="warning"> ชื่อสถานี : </Badge> {this.props.station.stationName}</CardText>
            <CardText><Badge color="warning"> เวลาเริ่มทำงาน : </Badge> {this.props.station.start_time}</CardText>
            <CardText><Badge color="warning"> เวลาสิ้นสุดการทำงาน : </Badge> {this.props.station.end_time}</CardText>
            <CardText><Badge color="warning"> เช็คทุกๆ : </Badge> {this.props.station.check_every_h} ชั่วโมง {this.props.station.check_every_m} นาที</CardText>
          </CardBody>
          <CardFooter className="text-center border-0">
            <Button className="mx-2 rounded-pill border-0"  onClick={this.go_dashboard_detail.bind(this,this.props.id)}>
              <IoIosSearch />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default DashItem;
