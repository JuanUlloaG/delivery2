import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialIcons";
import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet, Animated, ScrollView, Dimensions, Keyboard } from 'react-native';
import { getOrderAction, getOrderFetch } from '../../actions/SearchAction'
import { State as UserState } from "../../reducers/AuthReducer";
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import IconChange from "react-native-vector-icons/AntDesign";
import Loading from '../Loading/Loading'
import IconCustom from "../../assets/Icon";
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/TextInput';
import { RNCamera } from 'react-native-camera';


var { width, height } = Dimensions.get('window');
const HEIGHT_MODAL = Dimensions.get('window').height * 0.78;
type Animation = any | Animated.Value;

const defaultUserState = {
    name: 'N/A',
    id: '',
    email: '',
    token: '',
    profile: { key: '', description: '' },
    shop: { key: '', description: '' },
    company: { id: "", name: "" },
    message: '',
    state: false,
    success: false,
    isFetching: false,
    error: false
}



interface Props {
    navigation: any,
    auth: object,
    search: { data: { data: { bags: [{ _id: string, bagNumber: string, products: [] }], pickerId: UserState, deliveryId: UserState } }, isFetching: false, error: false, success: false, message: "", }
    bags: { isFetching: boolean, data: [any], success: boolean, error: boolean, message: string },
    route: any,
    home: { isFetching: boolean, data: [any] },
    fetchDataOrder: (number: string) => {},
}

interface State {
    pickeditems: Array<any>,
    index: number,
    animationValue: Animation,
    opacity: Animation,
    bagNumber: string,
    bagContainer: Array<any>,
    pickedProductArray: Array<any>,
    bags: Array<any>,
    resume: boolean,
    torchOn: boolean,
    order: any,
    empty: boolean
}

class Search extends React.Component<Props, State> {

    private camera: RNCamera;
    private find: boolean = false;
    constructor(props: Props) {
        super(props)
        this.state = {
            pickeditems: [],
            index: 0,
            animationValue: new Animated.Value(0),
            opacity: new Animated.Value(0),
            bagNumber: "",
            bagContainer: [],
            pickedProductArray: [],
            resume: false,
            torchOn: false,
            bags: [],
            order: {},
            empty: false
        }
    }

    componentDidMount() {
        // this.props.fetchDataBags()
        // let data = this.filterData()
    }

    filterData(bagNumber: string) {
        const result = this.props.bags.data.filter((obj) => {
            return obj.bags.some((bag: any) => bag.bagNumber === bagNumber)
        })
        if (result.length) {
            this.setState({ order: result[0] })
            return result[0]
        }
        return {}
    }


    loadItems(index: number) {

    }


    // add intems to bag 
    nextItem = () => {

    }

    addProductPicked(index: number) {
    }

    removeProductPicked(index: number) {
    }

    handleTourch(value: boolean) {
        if (value === true) {
            this.setState({ torchOn: false });
        } else {
            this.setState({ torchOn: true });
        }
    }

    captureBagNumber() {
        this.setState({ torchOn: true, bagNumber: "" })
    }

    disableCamera() {
        this.setState({ torchOn: false })
    }

    onChangeBagNumber = (text: string) => {
        if (text.length >= 6) {
            this.props.fetchDataOrder(text)
            this.setState({ bagNumber: text })
        } else {
            this.setState({ bagNumber: text })
        }

        // let empty = false
        // if (!Object.keys(order).length) {
        //     let bags = [...this.state.bags]
        //     bags.push(text)
        //     if (text.length > 3 && Object.keys(order).length == 0) empty = true
        //     this.setState({ bagNumber: text, bags, order: this.filterData(text), empty })
        // } else {
        //     let bags = [...this.state.bags]
        //     bags.push(text)
        //     this.setState({ bagNumber: text, bags })
        // }
    }

    onBarCodeRead = (e: any) => {
        const order = this.state.order
        let empty = false
        if (!Object.keys(order).length) {
            let bags = [...this.state.bags]
            bags.push(e.data)
            if (Object.keys(order).length == 0) empty = true
            this.setState({ bagNumber: e.data, bags, order: this.filterData(e.data), torchOn: false, empty })
        } else {
            let bags = [...this.state.bags]
            bags.push(e.data)
            this.setState({ bagNumber: e.data, bags, torchOn: false })
        }
    }

    clearBagNumber() {
        this.setState({ bagNumber: "" })
    }


    finish() {

        // this.props.updateBagFinish()
        // this.setState({ bagNumber: "", order: {} })
        // this.props.fetchDataBags()
        // this.setState({ order: {} })
        // this.props.navigation.goBack()
    }

    Validate(bagNumber: string) {
        // if (this.state.bags.includes(bagNumber)) {
        //     this.find = true
        //     Keyboard.dismiss()
        //     return true
        // }
        // return false
    }

    focusLose() {
        // if (this.find) {
        //     this.setState({ bagNumber: "" })
        //     this.find = false
        // }
    }

    navigate(index: number) {
        let bag: [{ _id: string, bagNumber: string, products: [] }]
        bag = [...this.props.search.data.data.bags]
        this.props.navigation.navigate('Detalle', { bagContent: bag[index] });
    }

    render() {

        this.props.navigation.setOptions({
            headerTitle: "Consulta",
            headerTitleStyle: {
                textAlign: 'center',
                flexGrow: 1,
                marginRight: 0,
                alignSelf: 'center',
                color: colors.white,
                fontFamily: fonts.primaryFontTitle,
                fontSize: Size(65),
            }
        });

        const animatedStyle = {
            height: this.state.animationValue
        }



        let bagss: [{ _id: string, bagNumber: string, products: [] }] = []
        let picker: UserState = Object.assign({}, defaultUserState)
        let deliveryId: UserState = Object.assign({}, defaultUserState)
        let orderNumber = ""
        let orderState = { key: "", description: "" }
        const order = this.props.search.data.data
        if (Object.keys(this.props.search.data).length > 0 && Object.keys(this.props.search.data.data).length > 0) {
            bagss = [...order.bags]
            picker = Object.assign({}, this.props.search.data.data.pickerId)
            if (this.props.search.data.data.deliveryId) {
                deliveryId = Object.assign({}, this.props.search.data.data.deliveryId)
            }
            orderNumber = order.orderNumber.orderNumber
            orderState = Object.assign({}, order.orderNumber.state)

        }

        return (
            <Center>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.bodyContainer}>
                        <View style={{ flex: 1, backgroundColor: colors.grayHeader, }}>
                            <View style={styles.modalSectionBodyTitle}>
                                <Text style={styles.modalSectionBodyTitleText}>Digita o escanea el bulto</Text>
                            </View>
                            <View style={[styles.modalSectionBodyInput, { justifyContent: 'center' }]}>
                                <View style={{ flex: 4, alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <CustomInput keyType="numeric" size="m" value={this.state.bagNumber} onBlur={() => this.focusLose()} onChangeText={(text) => { this.onChangeBagNumber(text) }} placeholder="Número de bulto" type={false} editable={true} />
                                </View>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.captureBagNumber()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <IconBar name={"barcode-scan"} size={RFValue(45)} color={colors.black} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 4 }}>
                            {

                                <>
                                    <View style={{ flex: 1 }}>
                                        {
                                            this.props.search.success &&
                                                (Object.keys(this.props.search.data).length > 0 && Object.keys(this.props.search.data.data).length > 0) ?
                                                <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: Size(111), borderBottomColor: '#E0E0E0', borderBottomWidth: 1 }}>
                                                    <Text style={styles.modalSectionBodyTitleText}>Información de pedido</Text>
                                                </View> :
                                                this.state.bagNumber ?
                                                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: Size(111), borderBottomColor: '#E0E0E0', borderBottomWidth: 1 }}>
                                                        <Text style={styles.modalSectionBodyTitleText}>{this.props.search.data.message}</Text>
                                                    </View> : null
                                        }
                                    </View>


                                    <View style={{ flex: 2 }}>
                                        {
                                            this.props.search.success &&
                                            (Object.keys(this.props.search.data).length > 0 && Object.keys(this.props.search.data.data).length > 0) &&
                                            <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: Size(111), borderBottomColor: '#E0E0E0', borderBottomWidth: 1 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Nº de pedido: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{orderNumber}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Picker: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{picker.name}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Delivery: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{deliveryId.name}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Estado del pedido: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{orderState.description}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        fontWeight: 'bold',
                                                        color: colors.black2
                                                    }}>Nº de bultos: </Text>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2
                                                    }}>{bagss.length}</Text>
                                                </View>
                                            </View>
                                        }
                                    </View>


                                    <View style={{ flex: 3 }}>
                                        {
                                            this.props.search.success &&
                                            (Object.keys(this.props.search.data).length > 0 && Object.keys(this.props.search.data.data).length > 0) &&
                                            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: Size(111), marginTop: 20 }}>
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{
                                                        fontSize: RFValue(16),
                                                        fontFamily: fonts.primaryFont,
                                                        color: colors.black2,
                                                        fontWeight: 'bold'

                                                    }}>Bultos Asociados: </Text>
                                                </View>
                                                {
                                                    bagss.map((bag, index: number) => {
                                                        return (
                                                            <TouchableWithoutFeedback onPress={() => { this.navigate(index) }}>
                                                                <View style={
                                                                    {
                                                                        flexDirection: "row",
                                                                        alignItems: "center",
                                                                        justifyContent: 'center',
                                                                        paddingTop: 0,
                                                                        // "width": wp(65),
                                                                        height: hp(11),
                                                                        flex: 1,
                                                                        marginHorizontal: 4,
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
                                                                        flex: 2,
                                                                        justifyContent: 'center', alignItems: 'flex-start'
                                                                    }} >
                                                                        <Text style={{
                                                                            fontSize: RFValue(18),
                                                                            fontFamily: fonts.primaryFont,
                                                                            color: colors.black2,
                                                                            fontWeight: 'bold'
                                                                        }}>123456</Text>
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
                                                    })
                                                }
                                            </View>
                                        }
                                    </View>
                                </>
                            }
                        </View>
                        {
                            (this.state.torchOn) &&
                            <View style={{
                                width: wp(100),
                                height: hp(76),
                                flexDirection: 'column',
                                position: 'absolute',
                                zIndex: 1000,
                                backgroundColor: 'black',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <RNCamera

                                    style={{ width: wp(100), height: hp(50) }}
                                    onBarCodeRead={this.onBarCodeRead}
                                    ref={(cam: RNCamera) => { this.camera = cam }}
                                    // aspect={RNCamera.Constants}
                                    autoFocus={RNCamera.Constants.AutoFocus.on}
                                    captureAudio={false}
                                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                    }}
                                />
                                <View style={{ position: 'absolute', bottom: 0 }}>
                                    <TouchableOpacity onPress={() => this.disableCamera()} style={{
                                        flex: 1,
                                        backgroundColor: '#fff',
                                        borderRadius: 5,
                                        padding: 15,
                                        paddingHorizontal: 20,
                                        alignSelf: 'center',
                                        margin: 20,
                                    }}>
                                        <Text style={{ fontSize: 14 }}> Terminar </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </ScrollView>
            </Center >

        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.ultraLightgray
    },
    headerContainerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: Size(98)
    },
    headerContainerTitleText: {
        fontSize: RFValue(21),
        fontFamily: fonts.primaryFont
    },
    headerContainerCount: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: Size(39)
    },
    headerContainerCountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(45),
        height: hp(6),
        borderRadius: Size(16),
        backgroundColor: colors.ultraLightgray
    },
    headerContainerCountContainerText: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(19),
        color: 'rgba(51, 51, 51, 255)'
    },
    bodyContainer: {
        flex: 1,
        width: wp(100)
    },
    bodyContainerScrollView: {
        flexGrow: 1
    },
    bodyContainerScrollViewContainer: {
        flex: 1
    },
    bodyContainerScrollViewContainerInfo: {
        flex: 3,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.higLightgray,
        borderStyle: 'dashed'
    },
    bodyContainerScrollViewContainerInfoSection: {
        marginLeft: Size(98),
        marginBottom: 10
    },
    bodyContainerScrollViewContainerInfoSectionText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFont
    },
    bodyContainerScrollViewContainerPicked: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.higLightgray,
        borderStyle: 'dashed'
    },
    bodyContainerScrollViewContainerPickedSection: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5
    },
    bodyContainerScrollViewContainerPickedSectionTitle: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: Size(103)
    },
    bodyContainerScrollViewContainerPickedSectionTitleText: {

    },
    bodyContainerScrollViewContainerPickedSectionButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bodyContainerScrollViewContainerPickedSectionButtonsCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContainerScrollViewContainerPickedSectionButtonsClearCont: {
        alignItems: "center",
        justifyContent: 'center',
        width: wp(14),
        height: hp(6),
        borderRadius: Size(15),
        marginLeft: 45,
        backgroundColor: colors.lightgrayDisabled
    },
    bodyContainerScrollViewContainerPickedSectionButtonsOkCont: {
        alignItems: "center",
        justifyContent: 'center',
        width: wp(14),
        height: hp(6),
        borderRadius: Size(15),
        backgroundColor: colors.darkBlue
    },
    bodyContainerScrollViewContainerPosition: {
        flex: 1,
        height: hp(7)
    },
    bodyContainerScrollViewContainerPositionSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: Size(75)
    },
    bodyContainerScrollViewContainerPositionSectionText: {
        fontSize: RFValue(19),
        fontFamily: fonts.primaryFont,
        marginRight: 5,
        color: colors.mediumGray
    },
    bodyContainerScrollViewContainerImage: {
        flex: 4,
        paddingHorizontal: Size(64),
        height: hp(25)
    },
    bodyContainerScrollViewContainerImageText: {
        fontSize: RFValue(13),
        fontFamily: fonts.primaryFont,
        color: colors.mediumGray
    },
    bodyContainerScrollViewContainerImageContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.higLightgray,
        borderRadius: 4
    },
    bodyContainerScrollViewContainerImageContainerImage: {
        width: Size(608),
        height: Size(288)
    },
    bodyContainerScrollViewContainerButtons: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    bodyContainerScrollViewContainerButtonsSection: {
        flex: 1,
        flexDirection: 'row',
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: Size(103)
    },
    bodyContainerScrollViewContainerButtonsSectionButton: {
        alignItems: "center",
        justifyContent: 'center',
        width: wp(14),
        height: hp(6),
        borderRadius: Size(15),
        marginLeft: 10,
        marginRight: 6,
        backgroundColor: colors.ultraLightgray
    },
    bodyContainerScrollViewContainerButtonsSectionButtonNext: {
        flex: 1,
        marginTop: 30,
        marginBottom: 20
    },
    baseFlex: {
        flex: 1
    },
    modalAnimated: {
        width: width,
        height: hp(100) * 0.77,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset:
        {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 20,
    },
    modalSectionInfo: {
        flex: 1,
        borderBottomColor: colors.ultraLightgray,
        borderBottomWidth: 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        flexDirection: 'row'
    },
    modalSectionInfoCancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20
    },
    modalSectionInfoCancelButtonText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFont,
        color: colors.mediumBlack
    },
    modalSectionInfoTitle: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSectionInfoTitleText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFontTitle
    },
    modalSectionInfoButtonNext: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 20
    },
    modalSectionInfoButtonNextText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFontTitle,
        color: colors.higthLightBlue
    },
    modalSectionBody: {
        flex: 1
    },
    modalSectionBodyTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    modalSectionBodyTitleText: {
        fontSize: RFValue(17),
        fontFamily: fonts.primaryFont,
        color: colors.black2
    },
    modalSectionBodyTitleText2: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFontTitle,
        color: colors.black2
    },
    modalSectionBodyInput: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalSectionBodyScanBar: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalSectionBodyPrinter: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resumeHeaderInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resumeBody: {
        flex: 1
    },
    resumeBodyInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resumeBodyInfoText: {
        fontFamily: fonts.primaryFont,
        fontSize: RFValue(21),
        color: colors.black2
    },
    resumeBodyInfoIcon: {
        flex: 1,
        alignItems: 'center'
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraIcon: {
        margin: 5,
        height: 40,
        width: 40
    },
    bottomOverlay: {
        position: "absolute",
        width: "100%",
        flex: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
})

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    bags: state.bags,
    search: state.search
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchDataOrder: (number: string) => dispatch(getOrderAction(number))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
