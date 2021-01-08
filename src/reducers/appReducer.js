const app = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_DATA':
            return action.payload
        default:
            return state
    }
}

export default app