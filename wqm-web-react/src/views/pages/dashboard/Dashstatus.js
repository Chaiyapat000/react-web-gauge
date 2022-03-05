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
  Tooltip,
} from "reactstrap";
import { FaBeer } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Badge } from "reactstrap";
import EditItemModal from "./modals/EditItemModal";
import DeleteModal from "./modals/DeleteModal";
import ViewItemModal from "./modals/ViewItemModal";
import { history } from "../../../history";
import GaugeChartdetail2 from "./GaugeChartdetail2";

class Dashstatus extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  go_dashboard_detail = () => {
    history.push("/dashboard_detail");
  };

  render() {
    //console.log("11111111111111111111");
    //console.log(this.props);
    return (
      
        <Card className="" color="light">
          <CardBody>
            <CardText>
              <Badge color="warning"> {this.props.dash_name} </Badge>{" "}
              {this.props.activate == 1 ? (
                <Badge color="success"> ใช้บำบัด </Badge>
              ) : (
                <Badge color="secondary"> ใช้บำบัด </Badge>
              )}
            </CardText>
            <CardText style={{ textAlign: "center" }}>
              {" "}
              {this.props.value}
            </CardText>
            {/*<GaugeChartdetail2  dash_type={this.props.dash_name} value={this.props.value}/>*/}
          </CardBody>
        </Card>
      
    );
  }
}

export default Dashstatus;
