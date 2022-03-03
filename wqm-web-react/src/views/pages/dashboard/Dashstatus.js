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

class Dashstatus extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  go_dashboard_detail = () => {
    history.push("/dashboard_detail")
  }



  render() {
    console.log('11111111111111111111')
    console.log(this.props)
    return (
      <div className="col-6 col-sm-6 col-lg-3 p-0">
        <Card className="m-2 shadow bg-white rounded-lg border-0" color="light">
          <CardBody>
            <CardText><Badge color="warning"> {this.props.dash_name} </Badge> {" "} {this.props.activate == 1 ? <Badge color="success"> แจ้งเตือน </Badge> : <Badge color="secondary"> แจ้งเตือน </Badge> }</CardText>
            <CardText style={{textAlign: 'center'}}> {this.props.value}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Dashstatus;
