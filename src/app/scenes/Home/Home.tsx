import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialIcons";
import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { getHomeItems, takeOrderAction } from '../../actions/HomeListAction'
import { State as HomeState } from "../../reducers/HomeReducer";
import Loading from '../Loading/Loading'
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import IconCustom from "../../assets/Icon";
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NavigationProp } from "@react-navigation/native";
import { CustomButton } from '../../components/CustomButton';
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import IconChange from "react-native-vector-icons/AntDesign";



interface HomeProps {
    navigation: NavigationProp<any, any>,
    auth: object,
    home: { isFetching: boolean, data: [any], canTake: boolean },
    fetchData: () => {}
    takeOrder: (id: string) => {}
}

interface State {

}

class Home extends React.Component<HomeProps, State> {

    componentDidMount() {
        this.props.fetchData()
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.fetchData()
        });

    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', () => { })
    }

    getData = () => {
        let data = this.props.home.data ? this.props.home.data : []
        return data
    }

    navigate(id: string) {
        this.props.takeOrder(id)
        this.props.navigation.navigate('Detail', {
            screen: 'Detail',
            params: { ordernumber: id, updateHome: () => this.props.fetchData(), },
        });
    }

    handleRefresh = () => {
        this.props.fetchData()
    };


    render() {
        console.log(this.props);
        const isfetch = this.props.home.isFetching
        return (
            <Center>
                <View style={styles.header}>
                    <View style={styles.headerSectionTitle}>
                        <Text style={styles.headerSectionTitleText}>Ordenar</Text>
                    </View>
                    <View style={styles.headerSectionButton}>
                        <View style={styles.headerSectionButtonContainer}>
                            <Icon name='swap-vert' size={RFValue(21)} color={colors.darkBlue} />
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={[styles.headerSectionTitleText, { marginLeft: Size(80), marginTop: 10 }]}>Selecciona pedido</Text>

                    <FlatList
                        style={[styles.bodyList, { marginTop: 10 }]}
                        data={this.getData()}
                        extraData={this.props}
                        refreshing={isfetch}
                        // ListHeaderComponent={() => {
                        //     return ()
                        // }}
                        onRefresh={() => this.handleRefresh()}
                        ListEmptyComponent={() => {
                            return (
                                <Center>
                                    <Text style={{ fontFamily: fonts.primaryFont, marginTop: 20, fontSize: RFValue(18) }}>No hay ordenes para mostrar</Text>
                                </Center>
                            )
                        }}
                        keyExtractor={(item, index) => item._id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableWithoutFeedback onPress={() => { this.navigate(item._id) }}>
                                    <View style={
                                        {
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: 'center',
                                            paddingTop: 0,
                                            // "width": wp(65),
                                            height: hp(11),
                                            flex: 1,
                                            marginHorizontal: 20,
                                            marginVertical: 5,
                                            borderRadius: 14,
                                            backgroundColor: colors.grayHeader,
                                            shadowColor: "#BCBCBC",
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.27,
                                            shadowRadius: 2.65,
                                            elevation: 3,
                                        }
                                    } >
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center', alignItems: 'center'
                                        }} >
                                            <View style={{ width: 55, height: 55, borderRadius: 55 / 2, backgroundColor: colors.lightBlue, justifyContent: 'center', alignItems: 'center' }}>
                                                <IconCustom name={"lunch"} size={RFValue(27)} color={colors.white} />
                                            </View>
                                        </View>
                                        <View style={{
                                            flex: 3,
                                            justifyContent: 'center', alignItems: 'flex-start'
                                        }} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                <Text style={styles.bodyListContainerSectionInfoContainerTitle}>{"Nº de pedido "}</Text>
                                                <Text style={[styles.bodyListContainerSectionInfoContainerTitle, { fontSize: item.orderNumber.length > 7 ? RFValue(16) : RFValue(16) }]}>{item.orderNumber}</Text>
                                            </View>
                                            <CountDown date={item.startPickingDate} />
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center', alignItems: 'center'
                                        }} >
                                            <IconChange name='right' size={24} color={colors.black2} />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }}
                    />
                </View>
            </Center>
        );
    }

}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.ultraLightgray
    },
    headerSectionTitle: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10,
    },
    headerSectionTitleText: {
        fontSize: RFValue(17),
        fontFamily: fonts.primaryFont
    },
    headerSectionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: Size(76),
        marginTop: 8,
        marginRight: Size(53)
    },
    headerSectionButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ultraLightBlue,
        width: Size(84),
        height: Size(66),
        marginTop: 18,
        borderRadius: 4,

    },
    body: {
        flex: 10
    },
    bodyList: {
        width: wp(100)
    },
    bodyListContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: wp(100),
        height: Size(234),
        borderBottomWidth: 1,
        borderBottomColor: colors.ultraLightgray
    },
    bodyListContainerSectionInfo: {
        flex: 2,
        justifyContent: 'center'
    },
    bodyListContainerSectionInfoContainer: {
        marginHorizontal: Size(94)
    },
    bodyListContainerSectionInfoContainerTitle: {
        fontSize: RFValue(16),
        fontFamily: fonts.primaryFont,
        color: colors.black2,
        fontWeight: 'bold'
    },
    bodyListContainerSectionInfoContainerDetail: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bodyListContainerSectionInfoContainerPoint: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: colors.lightYellow,
        marginRight: 5
    },
    bodyListContainerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home
})

const mapDispatchToProps = (dispatch: any) => ({

    fetchData: () => dispatch(getHomeItems()),
    takeOrder: (id: string) => dispatch(takeOrderAction(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
