import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { getDevices } from '../../actions/index'
import { connect } from 'react-redux'
import { Card, CardContent, MenuItem, Select, Switch, TextField } from '@material-ui/core';

const DeviceTitle = styled.h3``

const DeviceInfo = styled.span`
    display: block;
`

const DeviceList = (props) => {
    const [initialDeviceList, setInitialDeviceList] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [orderFilter, setOrderFilter] = useState('ascName');

    useEffect(() => {
        async function getDevicesAPI() {
            await props
                .getDevices()
                .then((response) => {
                    setDeviceList(response.data)
                    setInitialDeviceList(response.data)
                })
        }
        getDevicesAPI()
    }, [])

    const formatCurrency = (value) => value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    const formatTimestamp = (value) => new Intl.DateTimeFormat('pt-br', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(value)
    
    const handleSearchDevice = (deviceName) => {
        setDeviceList(
            initialDeviceList
                .filter(device =>
                    device.name.toLowerCase().includes(deviceName.toLowerCase().trim())
                )
        )
    }

    const filteredDevices = deviceList
        .filter(device => {
            switch (statusFilter) {
                case 'all':
                default: 
                    return device.active || !device.active

                case 'active':
                    return device.active == true

                case 'inative':
                    return device.active == false
            }
        })
        .sort((a, b) => {
            switch (orderFilter) {
                case 'ascName':
                default:
                    return a.name > b.name ? 1 : -1

                case 'descName':
                    return a.name < b.name ? 1 : -1

                case 'ascValue':
                    return a.value > b.value ? 1 : -1

                case 'descValue':
                    return a.value < b.value ? 1 : -1
            }
        })

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <TextField 
                    id="standard-basic" 
                    label="Search" 
                    onChange={(e) => handleSearchDevice(e.target.value)}    
                />
            </Grid>
            <Grid item xs={1}>
                <Select
                    value={statusFilter}
                    labelId="statusFilter-label"
                    id="statusFilter"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <MenuItem value={'all'}>all</MenuItem>
                    <MenuItem value={'active'}>active</MenuItem>
                    <MenuItem value={'inative'}>inative</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={9}>
                <Select
                    value={orderFilter}
                    labelId="orderFilter-label"
                    id="orderFilter"
                    onChange={(e) => setOrderFilter(e.target.value)}
                >
                    <MenuItem value={'ascName'}>crescente por nome</MenuItem>
                    <MenuItem value={'descName'}>decrescente por nome</MenuItem>
                    <MenuItem value={'ascValue'}>menor valor</MenuItem>
                    <MenuItem value={'descValue'}>maior valor</MenuItem>
                </Select>
            </Grid>
            {filteredDevices.length ?
                filteredDevices
                    .map(device => (
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
                    )) : <Grid item xs={12}>Nenhum dispositivo encontrado</Grid>
            }
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    reducer: state.appReducer
})

const mapDispatchToProps = { getDevices }

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)