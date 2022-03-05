import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col, Label } from 'reactstrap';
import Geocode from "react-geocode";
import InputRange from "react-input-range";

import WrappedMap from "./gmap/MapContainer";
import {history} from '../../../../history'
import { addNewStationInfo } from '../../../../functions/apiActions'
import "../../../../assets/css/dash.css"
import { apiKey } from '../../../../functions/googleMapConfig'



class AddItemModal extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      locationQuery: "",
      location: {
        lat: 15,
        long: 100,
      },
      station: {
        station_imei: "",
        station_name:"",
        station_type: "เกษตรกร",
      },
      sliderBounds : {
        ph: {
          min: 0.0,
          max: 14.0,
        },
        ec: {
          min: 0.0,
          max: 3000.0,
        },
        do: {
          min: 0.0,
          max: 20.0,
        },
        temperature: {
          min: 0.0,
          max: 100.0,
        },
        turbidity: {
          min: 0.0,
          max: 3000.0,
        },
        tds: {
          min: 0.0,
          max: 500.0,
        },
        salinity: {
          min: 0.0,
          max: 20.0,
        },
        ammonia: {
          min: 0.0,
          max: 32.5,
        },
      },
    };
  }

  componentDidMount() {
    console.log("cdm");
    this.setState(
      {
        location: {
          lat: 15,
          long: 100,
        },
        station: {
          station_imei: "",
          station_name:"",
          station_type: "เกษตรกร",
          values: {
            ph: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            turbidity: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            temperature: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            do: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            ec: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            tds: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            salinity: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            ammonia: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
          }
        },
        loading: false,
      },
      () => {
        this.handleGeocodeFromLatLng({
          lat: parseFloat(this.state.location.lat),
          lng: parseFloat(this.state.location.long),
        });
      }
    );
  }

  setLocation = (location) => {
    console.log("setLocation ", location.lat, location.lng);
    this.setState({
      location: {
        lat: location.lat,
        long: location.lng,
      },
    });
    this.handleGeocodeFromLatLng(location);
  };

  handleGeocodeFromLatLng = (location) => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(apiKey);

    // set response language. Defaults to english.
    Geocode.setLanguage("th");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("th");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    // Get address from latidude & longitude.
    Geocode.fromLatLng(location.lat.toString(), location.lng.toString()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
        this.setState({ locationQuery: address });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  handleGeocode = (value) => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(apiKey);

    // set response language. Defaults to english.
    Geocode.setLanguage("th");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("th");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    // Get latidude & longitude from address.
    Geocode.fromAddress(this.state.locationQuery).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const location = {
          lat: lat,
          lng: lng,
        };
        this.setLocation(location);
        this.setState({
          locationQuery: response.results[0].formatted_address,
          updatedKey: location.lat.toString(),
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  _handleToggle = () => {
    // clear
    this.setState(
      {
        loading: false,
        location: {
          lat: 15,
          long: 100,
        },
        station: {
          station_imei: "",
          station_name:"",
          station_type: "เกษตรกร",
          values: {
            ph: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            turbidity: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            temperature: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            do: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            ec: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            tds: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            salinity: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
            ammonia: {
              status: true,
              value: 0,
              threshold: {
                min: 0,
                max: 0,
              },
            },
          }
        }
      },
      () => {
        this.handleGeocodeFromLatLng({
          lat: parseFloat(this.state.location.lat),
          lng: parseFloat(this.state.location.long),
        });
      }
    );
    this.props.toggle();
  }

  _handleOnChecked = (value) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          station: {
            ...prevState.station,
            values: {
              ...prevState.station.values,
              [value]: {
                ...prevState.station.values[value],
                status: !this.state.station.values[value].status,
              },
            },
          },
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  _handleAddNewStation = () => {
    addNewStationInfo({
        latitude: this.state.location.lat.toString(),
        longtitude: this.state.location.long.toString(),
        stationName: this.state.station.station_name,
        stationType: this.state.station.station_type,
        tempSensorStatus: this.state.station.values.temperature.status,
        turbiditySensorStatus: this.state.station.values.turbidity.status,
        phSensorStatus: this.state.station.values.ph.status,
        doSensorStatus: this.state.station.values.do.status,
        ecSensorStatus: this.state.station.values.ec.status,
        tdsSensorStatus: this.state.station.values.tds.status,
        salSensorStatus: this.state.station.values.salinity.status,
        ammoniaSensorStatus: this.state.station.values.ammonia.status,
        pHMax: this.state.station.values.ph.threshold.max,
        pHMin: this.state.station.values.ph.threshold.min,
        doMax: this.state.station.values.do.threshold.max,
        doMin: this.state.station.values.do.threshold.min,
        tempMax: this.state.station.values.temperature.threshold.max,
        tempMin: this.state.station.values.temperature.threshold.min,
        turpMax: this.state.station.values.turbidity.threshold.max,
        turpMin: this.state.station.values.turbidity.threshold.min,
        ecMax: this.state.station.values.ec.threshold.max,
        ecMin: this.state.station.values.ec.threshold.min,
        TdsMax: this.state.station.values.tds.threshold.max,
        TdsMin: this.state.station.values.tds.threshold.min,
        salMax: this.state.station.values.salinity.threshold.max,
        salMin: this.state.station.values.salinity.threshold.min,
        ammoniaMax: this.state.station.values.ammonia.threshold.max,
        ammoniaMin: this.state.station.values.ammonia.threshold.min,
        check_every_h: 1,
        check_every_m: 0,
        imei_number: this.state.station.station_imei,
        is_active: true,
        station_status:'standby'
    }).then(success => {
      if (success) {
        // clear field
        history.push("/")
      } else {
        alert("เพิ่มอุปกรณ์ไม่สำเร็จ")
      }
    })
  }

  render() {
    if (this.state.loading) {
      return <></>;
    }
    console.log('99999999999999999999')
    console.log(this.state)
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this._handleToggle}
        className={this.props.className}
      >
        <ModalHeader>เพิ่มอุปกรณ์</ModalHeader>
        <ModalBody className="d-flex flex-column d-flex">
          <Input
            type="select"
            name="select"
            id="typeSelect"
            className="m-1"
            required 
            value={this.state.station.station_type}
            onChange={(e) => {
              let value = e.target.value;
              this.setState((prevState) => {
                return {
                  ...prevState,
                  station: {
                    ...prevState.station,
                    station_type: value,
                  },
                };
              });
            }}
          >
            <option value="เกษตรกร">เกษตรกร</option>
            <option value="ปศุสัตว์">ปศุสัตว์</option>
            <option value="ประมง">ประมง</option>
          </Input>

          <InputGroup className="m-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>ชื่อสถานี</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="ชื่อ" value={this.state.station.station_name} onChange={
              e => {
                let value = e.target.value
                this.setState(prevState => {
                  return {
                    ...prevState,
                    station: {
                      ...prevState.station,
                      station_name: value
                    }
                  }
                })
              }
            } />
          </InputGroup>

          <InputGroup className="m-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>IMEI Number</InputGroupText>
            </InputGroupAddon>
            <Input required placeholder="12345" value={this.state.station.station_imei} onChange={
              e => {
                let value = e.target.value
                this.setState(prevState => {
                  return {
                    ...prevState,
                    station: {
                      ...prevState.station,
                      station_imei: value
                    }
                  }
                })
              }
            } />
          </InputGroup>

          <InputGroup className="m-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>สถานที่</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="สถานที่"
              value={this.state.locationQuery}
              onChange={(e) => this.setState({ locationQuery: e.target.value })}
              onBlur={(e) => this.handleGeocode(e.target.value)}
            />
          </InputGroup>
          {
            /*
            <InputGroup className="m-1">
              <Input
                placeholder="lat"
                value={this.state.location.lat}
                disabled
              />
              <Input
                placeholder="long"
                value={this.state.location.long}
                disabled
              />
            </InputGroup>
            */
          }

          {/* Google Map*/}

          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=` + apiKey}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `220px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            location={this.state.location}
            setLocation={this.setLocation}
            key={this.state.updatedKey}
          />

          {/* Threshold Setting */}
          <Label for="stationSelect" className="my-2 text-center">
            กรุณาเลือกเซนเซอร์ที่มีอยู่บนอุปกรณ์
          </Label>

          <Row>
              <Col xs="4">
                <Input
                  addon
                  value="temperature"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={this.state.station.values.temperature.status}
                  onChange={(e) => this._handleOnChecked(e.target.value)}
                />
                <Label className="ml-2 mt-3">อุณหภูมิ</Label>
              </Col>
              <Col xs="8">
                <InputRange
                  step={0.1}
                  minValue={
                    this.state.sliderBounds.temperature.min
                  }
                  maxValue={
                    this.state.sliderBounds.temperature.max
                  }
                  onChange={(value) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        station: {
                          ...prevState.station,
                          values: {
                            ...prevState.station.values,
                            temperature: {
                              ...prevState.station.values.temperature,
                              threshold: {
                                min: parseFloat(value.min).toFixed(1),
                                max: parseFloat(value.max).toFixed(1),
                              },
                            },
                          },
                        },
                      };
                    })
                  }
                  value={this.state.station.values.temperature.threshold}
                  disabled={
                    !this.state.station.values.temperature.status
                  }
                />
              </Col>
          </Row>

          <Row>
              <Col xs="4">
                <Input
                  addon
                  value="turbidity"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={this.state.station.values.turbidity.status}
                  onChange={(e) => this._handleOnChecked(e.target.value)}
                />
                <Label className="ml-2 mt-3">ความขุ่น</Label>
              </Col>
              <Col xs="8">
                <InputRange
                  step={0.1}
                  minValue={
                    this.state.sliderBounds.turbidity.min
                  }
                  maxValue={
                    this.state.sliderBounds.turbidity.max
                  }
                  onChange={(value) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        station: {
                          ...prevState.station,
                          values: {
                            ...prevState.station.values,
                            turbidity: {
                              ...prevState.station.values.turbidity,
                              threshold: {
                                min: parseFloat(value.min).toFixed(1),
                                max: parseFloat(value.max).toFixed(1),
                              },
                            },
                          },
                        },
                      };
                    })
                  }
                  value={this.state.station.values.turbidity.threshold}
                  disabled={
                    !this.state.station.values.turbidity.status
                  }
                />
              </Col>
          </Row>

          <Row>
              <Col id="check1" xs="4">
                <Input
                  addon
                  value="ph"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={this.state.station.values.ph.status}
                  onChange={(e) => this._handleOnChecked(e.target.value)}
                />
                <Label className="ml-2 mt-3">ค่า pH</Label>
              </Col>
              <Col xs="8">
                <InputRange
                  step={0.1}
                  minValue={
                    this.state.sliderBounds.ph.min
                  }
                  maxValue={
                    this.state.sliderBounds.ph.max
                  }
                  onChange={(value) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        station: {
                          ...prevState.station,
                          values: {
                            ...prevState.station.values,
                            ph: {
                              ...prevState.station.values.ph,
                              threshold: {
                                min: parseFloat(value.min).toFixed(1),
                                max: parseFloat(value.max).toFixed(1),
                              },
                            },
                          },
                        },
                      };
                    })
                  }
                  value={this.state.station.values.ph.threshold}
                  disabled={
                    !this.state.station.values.ph.status
                  }
                />
              </Col>
          </Row>

          

          

          <Row>
              <Col xs="4">
                <Input
                  addon
                  value="do"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={this.state.station.values.do.status}
                  onChange={(e) => this._handleOnChecked(e.target.value)}
                />
                <Label className="ml-2 mt-3">ค่า DO</Label>
              </Col>
              <Col xs="8">
                <InputRange
                  step={0.1}
                  minValue={
                    this.state.sliderBounds.do.min
                  }
                  maxValue={
                    this.state.sliderBounds.do.max
                  }
                  onChange={(value) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        station: {
                          ...prevState.station,
                          values: {
                            ...prevState.station.values,
                            do: {
                              ...prevState.station.values.do,
                              threshold: {
                                min: parseFloat(value.min).toFixed(1),
                                max: parseFloat(value.max).toFixed(1),
                              },
                            },
                          },
                        },
                      };
                    })
                  }
                  value={this.state.station.values.do.threshold}
                  disabled={
                    !this.state.station.values.do.status
                  }
                />
              </Col>
          </Row>
          <Row>
              <Col id="check1" xs="4">
                <Input
                  addon
                  value="ec"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={this.state.station.values.ec.status}
                  onChange={(e) => this._handleOnChecked(e.target.value)}
                />
                <Label className="ml-2 mt-3">ค่า eC</Label>
              </Col>
              <Col xs="8">
                <InputRange
                  step={0.1}
                  minValue={
                    this.state.sliderBounds.ec.min
                  }
                  maxValue={
                    this.state.sliderBounds.ec.max
                  }
                  onChange={(value) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        station: {
                          ...prevState.station,
                          values: {
                            ...prevState.station.values,
                            ec: {
                              ...prevState.station.values.ec,
                              threshold: {
                                min: parseFloat(value.min).toFixed(1),
                                max: parseFloat(value.max).toFixed(1),
                              },
                            },
                          },
                        },
                      };
                    })
                  }
                  value={this.state.station.values.ec.threshold}
                  disabled={
                    !this.state.station.values.ec.status
                  }
                />
              </Col>
          </Row>
          <Row>
              <Col id="check1" xs="4">
                <Input
                  addon
                  value="tds"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={this.state.station.values.tds.status}
                  onChange={(e) => this._handleOnChecked(e.target.value)}
                />
                <Label className="ml-2 mt-3">ค่า Tds</Label>
              </Col>
              <Col xs="8">
                <InputRange
                  step={0.1}
                  minValue={
                    this.state.sliderBounds.tds.min
                  }
                  maxValue={
                    this.state.sliderBounds.tds.max
                  }
                  onChange={(value) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        station: {
                          ...prevState.station,
                          values: {
                            ...prevState.station.values,
                            tds: {
                              ...prevState.station.values.tds,
                              threshold: {
                                min: parseFloat(value.min).toFixed(1),
                                max: parseFloat(value.max).toFixed(1),
                              },
                            },
                          },
                        },
                      };
                    })
                  }
                  value={this.state.station.values.tds.threshold}
                  disabled={
                    !this.state.station.values.tds.status
                  }
                />
              </Col>
          </Row>

          <Row>
              <Col id="check1" xs="4">
                <Input
                  addon
                  value="salinity"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={this.state.station.values.salinity.status}
                  onChange={(e) => this._handleOnChecked(e.target.value)}
                />
                <Label className="ml-2 mt-3">ค่า Salinity</Label>
              </Col>
              <Col xs="8">
                <InputRange
                  step={0.1}
                  minValue={
                    this.state.sliderBounds.salinity.min
                  }
                  maxValue={
                    this.state.sliderBounds.salinity.max
                  }
                  onChange={(value) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        station: {
                          ...prevState.station,
                          values: {
                            ...prevState.station.values,
                            salinity: {
                              ...prevState.station.values.salinity,
                              threshold: {
                                min: parseFloat(value.min).toFixed(1),
                                max: parseFloat(value.max).toFixed(1),
                              },
                            },
                          },
                        },
                      };
                    })
                  }
                  value={this.state.station.values.salinity.threshold}
                  disabled={
                    !this.state.station.values.salinity.status
                  }
                />
              </Col>
          </Row>

          <Row>
              <Col id="check1" xs="4">
                <Input
                  addon
                  value="salinity"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={this.state.station.values.salinity.status}
                  onChange={(e) => this._handleOnChecked(e.target.value)}
                />
                <Label className="ml-2 mt-3">ค่า Salinity</Label>
              </Col>
              <Col xs="8">
                <InputRange
                  step={0.1}
                  minValue={
                    this.state.sliderBounds.ammonia.min
                  }
                  maxValue={
                    this.state.sliderBounds.ammonia.max
                  }
                  onChange={(value) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        station: {
                          ...prevState.station,
                          values: {
                            ...prevState.station.values,
                            ammonia: {
                              ...prevState.station.values.ammonia,
                              threshold: {
                                min: parseFloat(value.min).toFixed(1),
                                max: parseFloat(value.max).toFixed(1),
                              },
                            },
                          },
                        },
                      };
                    })
                  }
                  value={this.state.station.values.ammonia.threshold}
                  disabled={
                    !this.state.station.values.ammonia.status
                  }
                />
              </Col>
          </Row>

        </ModalBody>
        <ModalFooter className="border-0">
          <Button className="border-0 rounded-pill" onClick={this._handleAddNewStation}>
            เพิ่ม
          </Button>
          <Button
            className="border-0 cancel rounded-pill"
            onClick={this._handleToggle}
          >
            ยกเลิก
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddItemModal;
