import axios from "axios"; 

// Send Back Results 
const makePostRequest = async (url, data) =>{
    try {
        const result = await axios.post(url, data);
        return result; 
    } catch {
        return { 
            "status" : 500, 
            "data" : undefined
        }
    }
    
  }

const makeGetRequest = async (url) => {
    try {
        const result = await axios.get(url);
        return result; 
    } catch {
        return { 
            "status" : 500, 
            "data": undefined
        }
    }
    
}

export {
    makePostRequest, makeGetRequest
}