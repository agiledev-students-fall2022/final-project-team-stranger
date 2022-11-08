import axios from "axios"; 

const sendPostRequest = async (url, data) =>{
    const result = await axios.post(url, data);
    return result; 
  }

const sendGetRequest = async (url) => {
    const result = await axios.get(url, data);
    return result; 
}

export {
    sendPostRequest, sendGetRequest
}