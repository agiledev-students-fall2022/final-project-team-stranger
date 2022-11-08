import axios from "axios"; 

async function sendRequest(url, data) {
    const result = await axios.post(url, data);
    console.log(result); 
  }

export default sendRequest; 