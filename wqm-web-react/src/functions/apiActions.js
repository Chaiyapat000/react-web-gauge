import React from "react";
import axios from "axios";
import { server_link } from "./server_link"


// -------------------------- SENSOR Endpoints

export const ai = (station_id) => {
  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = {
    userId: user_id,
    stationId: station_id
  };

  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/ai_prediction";
  return axios.post(url, data, options)
  .then((responseJson) => {
    
    console.log("RESPONSE ==== : ", responseJson);  
    if (responseJson.status == 200) {
      return responseJson.data;
    } else {
      return responseJson.data;
    }

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};

export const measureNow = (station_id) => {
  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = {
    userId: user_id,
    stationId: station_id
  };

  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/measure_now";
  return axios.post(url, data, options)
  .then((responseJson) => {
    
    console.log("RESPONSE ==== : ", responseJson);  
    if (responseJson.status == 200) {
      return true;
    } else {
      return false;
    }

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};

export const fetchStationInfo = () => {
  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = {
    userId: user_id
  };

  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/fetch_stationinfo";
  return axios.post(url, data, options)
  .then((responseJson) => {
    
    //console.log("RESPONSE ==== : ", responseJson);  
    return  responseJson.data.stationinfo;

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};

export const fetchStationInfoById = (station_id) => {
  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = {
    userId: user_id,
    stationId: station_id
  };

  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/fetch_stationinfo_station_id";
  return axios.post(url, data, options)
  .then((responseJson) => {
    
    console.log("RESPONSE ==== : ", responseJson);  
    return  responseJson.data;

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};

export const fetchMeasuredSensor = (station_id) => {
  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = {
    userId: user_id,
    stationId: station_id
  };

  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/fetch_measured_sensor";
  return axios.post(url, data, options)
  .then((responseJson) => {
    
    //console.log("RESPONSE ====44 : ", responseJson);  
    return  responseJson.data;

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};

export const addNewStationInfo = (body) => {

  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = body
  body['userId'] = parseInt(user_id, 10)
  console.log('111111111111111111')
  console.log(body)


  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/add_stationinfo";
  return axios.post(url, body, options)
  .then((responseJson) => {
    
    //console.log("RESPONSE ====44 : ", responseJson);  
    return  responseJson.data;

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};

export const getStationHistory = (body) => {
  return axios
    .post("http://35.187.250.242:1880/getStationHistory", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.status == 200) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};



export const deleteStation = (station_id) => {
  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = {
    userId: user_id,
    stationId: station_id
  };

  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/del_stationinfo";
  return axios.post(url, data, options)
  .then((responseJson) => {
    
    console.log("RESPONSE ====44 : ", responseJson.status);  
    if (responseJson.status == 200){
      return  true;
    }
    else{
      return  false;
    }
      
  

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};

// export const addNewStationInfo = (body) => {
//   return axios
//     .post("http://35.187.250.242:1880/addNewStationInfo", body, {
//       headers: {
//         authorization: localStorage.getItem("token"),
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       console.log(res.data);
//       if (res.data.status == "success") {
//         return true;
//       } else {
//         return false;
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       return false;
//     });
// };


export const EditStationInfo = (body) => {

  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = body
  body['userId'] = parseInt(user_id, 10)
  console.log('111111111111111111')
  console.log(body)


  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/edit_stationinfo";
  return axios.post(url, body, options)
  .then((responseJson) => {
    
    //console.log("RESPONSE ====44 : ", responseJson);  
    return  responseJson.data;

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};


export const ControlStation = (body) => {

  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  const data = body
  body['userId'] = parseInt(user_id, 10)
  console.log('111111111111111111')
  console.log(body)


  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  };
  
  var url = "/set_station_control";
  return axios.post(url, body, options)
  .then((responseJson) => {
    
    console.log("RESPONSE ====44 : ", responseJson);  
    return  responseJson.data;

  })
  .catch((err) => {
    console.log("ERROR: ====", err);
  })
};


// export const EditStationInfo = (body) => {
//   return axios
//     .post("http://35.187.250.242:1880/editStation", body, {
//       headers: {
//         authorization: localStorage.getItem("token"),
//       },
//     })
//     .then((res) => {
//       console.log(res.data);
//       if (res.data.status == "success") {
//         return true;
//       } else {
//         return false;
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       return false;
//     });
// };

export const fetchAllStationInfo = (body) => {
  console.log("HEY");
  console.log(body);
  return axios
    .post("http://35.187.250.242:1880/fetchStationInfo", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data.status);
      if (res.data.status == "fail") {
        return false;
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      return false;
    });
};

// export const authenticate = () => {
//   return axios
//     .get("http://35.187.250.242:1880/auth", {
//       headers: {
//         authorization: localStorage.getItem("token"),
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       if (res.data.status == "authorization complete") {
//         return res.data.user_data;
//       } else {
//         return false;
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       return false;
//     });
// };

// -------------------------- AUTH Endpoints

export const authenticate = () => {
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")
    const data = {
      userId: user_id
    };

    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
    };
    
    var url = "/fetch_stationinfo";
    return axios.post(url, data, options)
    .then((responseJson) => {
      
      console.log("RESPONSE ==== : ", responseJson);  
      return  responseJson.data;

    })
    .catch((err) => {
      console.log("ERROR: ====", err);
    })
};



export const login = (body) => {
  console.log(body.email)
  console.log(body.password)
  var bodyFormData = new FormData();
  bodyFormData.append('username', body.email);
  bodyFormData.append('password', body.password);

  return axios({
    method: "post",
    url: "/login",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => {
      console.log(res.status);
      if (res.status == 200) {
        console.log(res.data);
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user_id", String(res.data.user_id));
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const register = (body) => {
  return axios
    .post("/register", body)
    .then((res) => {
      console.log('res=====',res);
      if (res) {
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const stationSetTime = (body) => {
  return axios
    .post("http://35.187.250.242:1880/stationSetTime", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const editUser = (body) => {
  return axios
    .post("http://35.187.250.242:1880/editUser", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const fetchUser = () => {
  return axios
    .get("http://35.187.250.242:1880/fetchUser", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = (userId) => {
  return axios
    .post(
      "http://35.187.250.242:1880/deleteUser",
      {
        userId: userId,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const stationTime = (body) => {
  return axios
    .post(
      "http://35.187.250.242:1880/stationTime",
      body,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        return res.data.stationTime;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const getStationStatus = (stationId) => {
  return axios
    .post(
      "http://35.187.250.242:1880/getStationStatus",
      {
        stationId: stationId,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return res.data.stationStatus;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
