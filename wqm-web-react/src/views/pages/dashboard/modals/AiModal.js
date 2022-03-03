import React, { useState } from "react";
import { Table,Badge, Button,Card, Modal, ModalHeader, ModalBody, ModalFooter, Row } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { deleteStation } from '../../../../functions/apiActions'
import {history} from '../../../../history'

const pass_style = {justifyContent:'space-evenly',textAlign: 'center',fontSize: 11,height: 46,width: 70,padding: 2,backgroundColor: '#28A745'}
const fail_style = {justifyContent:'space-evenly',textAlign: 'center',fontSize: 11,height: 46,width: 70,padding: 2,backgroundColor: '#DC3545'}
const null_style = {justifyContent:'space-evenly',textAlign: 'center',fontSize: 11,height: 46,width: 70,padding: 2,backgroundColor: 'white'}



class AiModal extends React.Component {

  constructor() {
    super();
    this.state = {
      in0 : '1', in1 : '2', in2 : '3',in3 : '4',in4 : '5',in5 : '6',in6 : '7',
      in7 : '8',in8 : '9', in9 : '10', in10 : '11',in11 : '12',in12 : '13',in13 :'14',
      inqa0 : 1 , inqa1 : 1 , inqa2 : 1 ,inqa3 : 1 ,inqa4 : 1 ,inqa5 : 1 ,inqa6 : 1,
      inqa7 : 1 ,inqa8 : 1 , inqa9 : 1 , inqa10 : 1 ,inqa11 : 1 ,inqa12 : 1 ,inqa13 :1,
      tableHead: ['Temp C', 'pH', 'Turbidity NTU', 'DO mg/L','EC us/cm','TDS PPM','Salinity PPT'],
      tableDataFish: 
        ['23-38','6.5-9', '5-10','>= 3','150-300', '< 400', '< 7'],
      tableDataAgri: 
        ['23-38','5.5-7.0', '5-10','> 5','< 3000', '< 640', '< 2']
      ,
      tableDataAnimal: 
        ['23-38','6.8-7.5', '5-10','> 5','> 8', '< 1000', '< 5']
      ,
      pred0 : '1', pred1 : '2', pred2 : '3',pred3 : '4',pred4 : '5',pred5 : '6',pred6 : '7',
      predqa0 : 1 , predqa1 : 1 , predqa2 : 1 ,predqa3 : 1 ,predqa4 : 1 ,predqa5 : 1 ,predqa6 : 1,  
    }
  }
  render() {
    console.log('---->>>',this.props.pred)
    const input_pred = this.props.pred.input_pred
    const output_pred = this.props.pred.output_pred
    
    if(input_pred){
      console.log('this.props.pred ->>>',input_pred.in0.datetime)
    }
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader>ทำนายคุณภาพน้ำด้วยระบบปัญญาประดิษฐ์</ModalHeader>
        <ModalBody className="d-flex flex-column d-flex">
          <Row style={{justifyContent:'center'}}><h3>คุณภาพน้ำ 14 วันล่าสุด</h3></Row>
          {input_pred ? 
          <Row style={{justifyContent:'space-evenly',marginBottom: 1}}>
            <Card style={input_pred.in0.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in0.datetime}
            </Card>
            <Card style={input_pred.in1.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in1.datetime}
            </Card>
            <Card style={input_pred.in2.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in2.datetime}
            </Card>
            <Card style={input_pred.in3.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in3.datetime}
            </Card>
            <Card style={input_pred.in4.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in4.datetime}
            </Card>
            <Card style={input_pred.in5.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in5.datetime}
            </Card>
            <Card style={input_pred.in6.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in6.datetime}
            </Card>
          </Row>
          :
          <Row style={{justifyContent:'space-evenly',marginBottom: 1}}>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {1}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {2}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {3}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {4}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {5}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {6}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {7}
            </Card>
          </Row>
          }
          {input_pred ? 
          <Row style={{justifyContent:'space-evenly',marginBottom: 1}}>
            <Card style={input_pred.in7.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in7.datetime}
            </Card>
            <Card style={input_pred.in8.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in8.datetime}
            </Card>
            <Card style={input_pred.in9.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in9.datetime}
            </Card>
            <Card style={input_pred.in10.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in10.datetime}
            </Card>
            <Card style={input_pred.in11.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in11.datetime}
            </Card>
            <Card style={input_pred.in12.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in12.datetime}
            </Card>
            <Card style={input_pred.in13.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {input_pred.in13.datetime}
            </Card>
          </Row>
          :
          <Row style={{justifyContent:'space-evenly',marginBottom: 1}}>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {8}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {9}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {10}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {11}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {12}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {13}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {14}
            </Card>
          </Row>
          }
          <br></br>
          <Row style={{justifyContent:'center'}}><h3>ผลการทำนายคุณภาพน้ำในอีก 7 วันข้างหน้า</h3></Row>
          
          {output_pred ? 

          <Row style={{justifyContent:'space-evenly',marginBottom: 1}}>
            <Card style={output_pred.pred0.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {output_pred.pred0.datetime}
            </Card>
            <Card style={output_pred.pred1.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {output_pred.pred1.datetime}
            </Card>
            <Card style={output_pred.pred2.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {output_pred.pred2.datetime}
            </Card>
            <Card style={output_pred.pred3.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {output_pred.pred3.datetime}
            </Card>
            <Card style={output_pred.pred4.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {output_pred.pred4.datetime}
            </Card>
            <Card style={output_pred.pred5.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {output_pred.pred5.datetime}
            </Card>
            <Card style={output_pred.pred6.qa == 1 ? pass_style : fail_style} className="m-0 shadow rounded-lg border-0">
              {output_pred.pred6.datetime}
            </Card>
          </Row>
          :
          <Row style={{justifyContent:'space-evenly',marginBottom: 1}}>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {1}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {2}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {3}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {4}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {5}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {6}
            </Card>
            <Card style={null_style} className="m-0 shadow rounded-lg border-0">
              {7}
            </Card>
          </Row>
          }
          <br></br>
          <Row style={{justifyContent:'flex-end'}}>
            <Badge color="success">ผ่านเกณฑ์</Badge> {' '}
            <Badge color="danger">ไม่ผ่านเกณฑ์</Badge>
          </Row>

          <br></br>
          <Row>
      {/* tableHead: ['Temp C', 'pH', 'Turbidity NTU', 'DO mg/L','EC us/cm','TDS PPM','Salinity PPT'],
      tableDataFish: [
        ['23-38','6.5-9', '5-10','>= 3','150-300', '< 400', '< 7']
      ],
      tableDataAgri: [
        ['23-38','5.5-7.0', '5-10','> 5','< 3000', '< 640', '< 2']
      ],
      tableDataAnimal: [
        ['23-38','6.8-7.5', '5-10','> 5','> 8', '< 1000', '< 5']
      ], */}
 
          
          <h6>เพื่อการเกษตร</h6>
          <Table striped style={{fontSize:11}}>
            <thead>
              <tr>
                <th>{this.state.tableHead[0]}</th>
                <th>{this.state.tableHead[1]}</th>
                <th>{this.state.tableHead[2]}</th>
                <th>{this.state.tableHead[3]}</th>
                <th>{this.state.tableHead[4]}</th>
                <th>{this.state.tableHead[5]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.tableDataAgri[0]}</td>
                <td>{this.state.tableDataAgri[1]}</td>
                <td>{this.state.tableDataAgri[2]}</td>
                <td>{this.state.tableDataAgri[3]}</td>
                <td>{this.state.tableDataAgri[4]}</td>
                <td>{this.state.tableDataAgri[5]}</td>
              </tr>
            </tbody>
          </Table>
          </Row>
          
          <br></br>
          <Row>
          <h6>การเลี้ยงสัตว์บก</h6>
          <Table striped style={{fontSize:11}}>
            <thead>
              <tr>
                <th>{this.state.tableHead[0]}</th>
                <th>{this.state.tableHead[1]}</th>
                <th>{this.state.tableHead[2]}</th>
                <th>{this.state.tableHead[3]}</th>
                <th>{this.state.tableHead[4]}</th>
                <th>{this.state.tableHead[5]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.tableDataAnimal[0]}</td>
                <td>{this.state.tableDataAnimal[1]}</td>
                <td>{this.state.tableDataAnimal[2]}</td>
                <td>{this.state.tableDataAnimal[3]}</td>
                <td>{this.state.tableDataAnimal[4]}</td>
                <td>{this.state.tableDataAnimal[5]}</td>
              </tr>
            </tbody>
          </Table>
          </Row>

          <br></br>
          <Row>
          <h6>เลี้ยงสัตว์น้ำจืด</h6>
          <Table striped style={{fontSize:11}}>
            <thead>
              <tr>
                <th>{this.state.tableHead[0]}</th>
                <th>{this.state.tableHead[1]}</th>
                <th>{this.state.tableHead[2]}</th>
                <th>{this.state.tableHead[3]}</th>
                <th>{this.state.tableHead[4]}</th>
                <th>{this.state.tableHead[5]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.tableDataFish[0]}</td>
                <td>{this.state.tableDataFish[1]}</td>
                <td>{this.state.tableDataFish[2]}</td>
                <td>{this.state.tableDataFish[3]}</td>
                <td>{this.state.tableDataFish[4]}</td>
                <td>{this.state.tableDataFish[5]}</td>
              </tr>
            </tbody>
          </Table>
          </Row>
          
          

        </ModalBody>
        <ModalFooter className="border-0 ">
          <Button className="border-0 rounded-pill" color="secondary" onClick={this.props.toggle}>
            กลับ
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AiModal;

