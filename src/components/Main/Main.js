import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Devices from '../../pages/Devices.js'

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Devices}></Route>
        </Switch>
    );
}

export default Main;