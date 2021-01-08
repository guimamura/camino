import axios from 'axios'

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData(data) {
    return {
        type: RECEIVE_DATA,
        payload: data
    }
}

export const getDevices = () => (dispatch) => 
    axios
        .get(`http://localhost:8888/devices`)
        .then((response) => {
            dispatch(receiveData(response.data))
            return response.data
        })