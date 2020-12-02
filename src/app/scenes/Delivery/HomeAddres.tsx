import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialIcons";
import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { getHomeItems } from '../../actions/HomeListAction'
import { getHomeBagItemsForDelivery, updateBagAction, updateBagActionFinish } from '../../actions/HomeListBagAction'
import Loading from '../Loading/Loading'
import IconCustom from "../../assets/Icon";
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";
import IconChange from "react-native-vector-icons/AntDesign";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CustomButton } from '../../components/CustomButton';





interface HomeAddresProps {
    navigation: any,
    auth: object,
    bags: { isFetching: boolean, data: [any], success: boolean, error: boolean, message: string },
    home: { isFetching: boolean, data: [any] },
    fetchDataBagsReady: () => {}
}

interface State {

}

class Home extends React.Component<HomeAddresProps, State> {

    componentDidMount() {
        // this.props.fetchData()
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.fetchDataBagsReady()
        });

    }

    getData = () => {
        let data = this.props.bags.data ? this.props.bags.data : []
        return data
    }

    navigate(id: string) {
        this.props.navigation.navigate('DetailAddres', { ordernumber: id });
    }

    handleRefresh = () => {
        this.props.fetchDataBagsReady()
    };

    render() {
        const isfetch = this.props.bags.isFetching
        return (
            <Center>
                <View style={styles.header}>

                    <View style={styles.headerSectionButton}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={styles.headerSectionTitleText}>Ordernar</Text>
                            </View>
                            <View style={styles.headerSectionButtonContainer}>
                                <Icon name='swap-vert' size={RFValue(21)} color={colors.darkBlue} />
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={[styles.headerSectionTitleText, { marginLeft: Size(80), marginTop: 10 }]}>Selecciona pedido</Text>
                    {
                        // !this.props.home.isFetching &&
                        <FlatList
                            style={[styles.bodyList, { marginTop: 10 }]}
                            data={this.getData()}
                            extraData={this.props}
                            refreshing={isfetch}
                            onRefresh={() => this.handleRefresh()}
                            // ListHeaderComponent={() => {
                            //     return ()
                            // }}
                            ListEmptyComponent={() => {
                                return (
                                    <Center>
                                        {
                                            isfetch ?
                                                <Text style={{ fontFamily: fonts.primaryFont, marginTop: 20, fontSize: RFValue(18) }}>Consultando ordenes</Text> :
                                                <Text style={{ fontFamily: fonts.primaryFont, marginTop: 20, fontSize: RFValue(18) }}>No hay ordenes para mostrar</Text>
                                        }
                                    </Center>
                                )
                            }

                            }
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
                                                <View style={{ width: 55, height: 55, borderRadius: 55 / 2, backgroundColor: colors.mediumYellow, justifyContent: 'center', alignItems: 'center' }}>
                                                    <IconCustom name={"lunch"} size={RFValue(25)} color={colors.white} />
                                                </View>
                                            </View>
                                            <View style={{
                                                flex: 3,
                                                justifyContent: 'center', alignItems: 'flex-start'
                                            }} >
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                    <Text style={styles.bodyListContainerSectionInfoContainerTitle}>{"Nº de Pedido "}</Text>
                                                    <Text style={[styles.bodyListContainerSectionInfoContainerTitle, { fontSize: item.orderNumber.orderNumber > 7 ? RFValue(16) : RFValue(16) }]}>{item.orderNumber.orderNumber}</Text>
                                                </View>
                                                <CountDown date={item.startPickingDate} />
                                                <Text style={{
                                                    fontSize: RFValue(16),
                                                    fontFamily: fonts.primaryFont,
                                                    color: colors.black2
                                                }}>{item.orderNumber.client.address}</Text>
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
                    }
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50
    },
    headerSectionTitleText: {
        fontSize: RFValue(17),
        fontFamily: fonts.primaryFont
    },
    bodyDirectionText: {
        fontSize: RFValue(19),
        fontFamily: fonts.primaryFont
    },
    headerSectionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerSectionButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ultraLightBlue,
        width: Size(84),
        height: Size(66),
        marginTop: 10,
        marginRight: 20,
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
        fontFamily: fonts.primaryFontTitle
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
        justifyContent: 'center'
    }
})

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    bags: state.bags
})

const mapDispatchToProps = (dispatch: any) => ({

    fetchDataBagsReady: () => dispatch(getHomeBagItemsForDelivery())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)


 // <Button title={item.name} onPress={() => {
                                //     this.props.navigation.navigate('Detail', { name: item.name })
                                // }
                                // } />