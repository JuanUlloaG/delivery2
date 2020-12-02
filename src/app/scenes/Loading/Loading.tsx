import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Center } from '../../components/Center'
import { FlatList, Button, Platform, View, Text, Dimensions, ActivityIndicator } from 'react-native'
import faker from "faker";
import { getHomeItems } from '../../actions/HomeListAction'

let { width, height } = Dimensions.get('window')


interface LoadingProps {
    auth: object,
    home: { isFetching: boolean, data: [any] },
}

interface State {

}

class Loading extends React.Component<LoadingProps, State> {

    componentDidMount() {

    }

    render() {
        return (
            <View style={{ width: width, height: height, backgroundColor:'white', position: 'absolute', justifyContent:'center', alignItems:'center' }}>
                <ActivityIndicator size='large' color="#0000ff" />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home
})


export default connect(mapStateToProps)(Loading)
