import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { getDevices } from '../../actions/index'
import { connect } from 'react-redux'
import { Card, CardContent, Switch } from '@material-ui/core';

const DeviceTitle = styled.h2`
    font-size: 1rem;
`

const DeviceInfo = styled.span`
    display: block;
`

const DeviceList = (props) => {
    const [deviceList, setDeviceList] = useState({data: []});

    useEffect(() => {
        async function getDevicesAPI() {
            await props
                .getDevices()
                .then((response) => {
                    setDeviceList(response)
                })
        }
        getDevicesAPI()
    }, [])

    const formatCurrency = (value) => value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    const formatTimestamp = (value) => new Intl.DateTimeFormat('pt-br', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(value)
    

    return (
        <Grid container spacing={2}>
            {deviceList.data.map(device => (
                <Grid item xs={3}>
                    <Card key={device.unit}>
                        <CardContent>
                            <DeviceTitle>{device.name}</DeviceTitle>
                            <DeviceInfo>unit: {device.unit}</DeviceInfo>
                            <DeviceInfo>date: {formatTimestamp(device.timestamp)}</DeviceInfo>
                            <DeviceInfo>value: {formatCurrency(device.value)}</DeviceInfo>
                            <Switch
                                checked={device.active}
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    reducer: state.appReducer
})

const mapDispatchToProps = { getDevices }

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)