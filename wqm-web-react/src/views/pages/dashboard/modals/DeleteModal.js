import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { deleteStation } from '../../../../functions/apiActions'
import {history} from '../../../../history'
class DeleteModal extends React.Component {

  _handleDeleteStation(e,param){
    
    e.preventDefault();
    // console.log('******************')
    // console.log('Sorting by: ' + param)
    const station_id = param
    deleteStation(station_id).then(success => {
      if (success) {
        this.props.toggle()
        history.push("/")
      } else {
        this.props.toggle()
        alert('ลบไม่สำเร็จ')
      }
    })

  }
  render() {
    // console.log(this.props.station)
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader>ลบอุปกรณ์</ModalHeader>
        <ModalBody className="d-flex flex-column d-flex">
          คุณแน่ใจที่ต้องการจะลบอุปกรณ์ ID หรือไม่? เนื่องจากข้อมูลจะหายไปอย่างถาวร
        </ModalBody>
        <ModalFooter className="border-0 ">
          <Button className="del border-0 rounded-pill" color="danger" onClick={(e)=>this._handleDeleteStation(e,this.props.station.stationId)}>
            ลบ
          </Button>
          <Button className="border-0 rounded-pill" color="secondary" onClick={this.props.toggle}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteModal;
