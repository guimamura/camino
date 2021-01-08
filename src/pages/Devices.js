import React from 'react'
import styled from 'styled-components'
import DeviceList from '../components/DeviceList/DeviceList'

const DevicesContainer = styled.div``

const Devices = () => {
    return (
    <DevicesContainer>
       <DeviceList />
    </DevicesContainer>
    );
}

export default Devices