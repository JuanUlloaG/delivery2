import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialIcons";
import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet, Animated, ScrollView, Dimensions, Keyboard } from 'react-native';
import { getHomeBagItems, updateBagAction, updateBagActionFinish } from '../../actions/HomeListBagAction'
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from '../Loading/Loading'
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/TextInput';
import { RNCamera } from 'react-native-camera';
import { RNNotificationBanner } from 'react-native-notification-banner';
import Icons from 'react-native-vector-icons/FontAwesome'
Icons.loadFont('AntDesign.ttf')
let copy = <Icons name="closecircleo" size={24} color="white" family={"AntDesign"} />;


var { width, height } = Dimensions.get('window');
const HEIGHT_MODAL = Dimensions.get('window').height * 0.78;
type Animation = any | Animated.Value;

let focus = false

interface Props {
    navigation: any,
    auth: object,
    bags: { isFetching: boolean, data: [any], success: boolean, error: boolean, message: string },
    route: any,
    shop: any,
    detail: any,
    search: any,
    delivery: any,
    home: { isFetching: boolean, data: [any] },
    updateBag: (id: string, orderId: string) => {},
    updateBagFinish: () => {},
    fetchDataBags: () => {}
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

class HomeDelivery extends React.Component<Props, State> {

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
        this.props.fetchDataBags()

    }


    filterData(bagNumber: string) {
        const result = this.props.bags.data.filter((obj) => {
            return obj.bags.some((bag: any) => bag.bagNumber === bagNumber)
        })
        if (result.length) {
            result.map((bag) => {
                bag.bags.map((row: any) => {
                    row['check'] = false
                    if (bagNumber == row.bagNumber) row.check = true

                    return row

                })
            })
            this.setState({ order: result[0] })
            return result[0]
        } else {
            this.setState({ order: {} })
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

    toggleModal() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 1,
                useNativeDriver: false,
                duration: 300
            }),
            Animated.spring(this.state.animationValue, {
                toValue: HEIGHT_MODAL,
                velocity: 7,
                tension: 2,
                friction: 8,
                useNativeDriver: false
            })
        ]).start(() => {
        });
    }

    validatePickedItems() {
        let pickedProductArray = [...this.state.pickedProductArray]
        let picked = true
        pickedProductArray.map((product) => {
            if (product.picked === false) picked = false
        })
        return picked
    }

    dissmissModal() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0,
                delay: 10,
                useNativeDriver: false,
                duration: 50
            }),
            Animated.spring(this.state.animationValue, {
                toValue: 0,
                velocity: 6,
                tension: 2,
                friction: 8,
                useNativeDriver: false
            })
        ]).start(() => {
        });
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
        const order = Object.assign({}, this.state.order)
        let empty = false
        if (!Object.keys(order).length) {
            let bags = [...this.state.bags]
            bags.push(text)
            if (text.length > 3 && Object.keys(order).length == 0) empty = true
            this.setState({ bagNumber: text, bags, order: this.filterData(text), empty })
        } else {
            order.bags.map((row: any) => {
                if (text == row.bagNumber) row.check = true
                return row
            })
            let bags = [...this.state.bags]
            bags.push(text)
            this.setState({ bagNumber: text, bags, order })
        }
    }

    onBarCodeRead = (e: any) => {
        const order = Object.assign({}, this.state.order)
        let empty = false
        if (!Object.keys(order).length) {
            let bags = [...this.state.bags]
            bags.push(e.data)
            if (Object.keys(order).length == 0) empty = true
            this.setState({ bagNumber: e.data, bags, order: this.filterData(e.data), torchOn: false, empty })
        } else {
            order.bags.map((row: any) => {
                if (e.data == row.bagNumber) row.check = true
                return row
            })
            let bags = [...this.state.bags]
            bags.push(e.data)
            this.setState({ bagNumber: e.data, bags, order })
        }
    }

    validateBag(text: string) {

    }

    clearBagNumber() {
        this.setState({ bagNumber: "" })
    }

    updateOrder() {
        this.props.updateBag(this.state.order._id, this.state.order.orderNumber._id)
    }

    finishClear() {

        this.props.updateBagFinish()
        this.setState({ bagNumber: "", order: {} })
        this.props.fetchDataBags()
        this.setState({ order: {} })
        // this.props.navigation.goBack()
    }

    Validate(bagNumber: string) {
        if (this.state.bags.includes(bagNumber)) {
            this.find = true
            Keyboard.dismiss()
            return true
        }
        return false
    }

    focusLose() {
        if (this.find) {
            this.setState({ bagNumber: "" })
            this.find = false
        }
    }

    validateItems() {
        const order = Object.assign({}, this.state.order)
        let flag = true
        order.bags.map((row) => {
            if (!row.check) flag = false
        })
        return flag
    }

    clearAll() {
        this.setState({ bagNumber: "", order: {} })
    }



    render() {

        this.props.navigation.setOptions({
            headerTitle: "Recepcionar",
            headerTitleStyle: {
                textAlign: 'center',
                flexGrow: 1,
                marginLeft: 55,
                alignSelf: 'center',
                color: colors.white,
                fontFamily: fonts.primaryFontTitle,
                fontSize: Size(65),
            },

            headerRight: () => (
                <TouchableOpacity onPress={() => this.clearAll()} style={{ marginRight: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.headerContainerTitleText, { color: colors.white, fontSize: RFValue(17) }]}>Limpiar</Text>
                    </View>
                </TouchableOpacity>
            )
        });

        if (this.props.bags.error && this.props.navigation.isFo) RNNotificationBanner.Show({
            title: "Error", subTitle: this.props.bags.message, withIcon: true, icon: copy, tintColor: colors.highLightRed, onHide: () => {

            }
        })
        if (this.props.bags.success) RNNotificationBanner.Show({
            title: "Mensaje", subTitle: this.props.bags.message, withIcon: true, icon: copy, tintColor: colors.lightGreen, onHide: () => {
                this.finishClear()
            }
        })

        const order = this.state.order

        return (
            <Center>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, width: wp(100) }}>
                        <View style={{ flex: 2, backgroundColor: colors.grayHeader }}>
                            <View style={styles.modalSectionBodyTitle}>
                                <Text style={styles.modalSectionBodyTitleText}>Digita o escanea el bulto</Text>
                            </View>
                            <View style={[styles.modalSectionBodyInput, { justifyContent: 'center', flexDirection: 'row' }]}>
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
                    </View>
                    <View style={styles.modalSectionBodyTitle}>
                        {
                            (Object.keys(order).length > 0) ?
                                <Text style={styles.modalSectionBodyTitleText2}>Lista de todos los bultos asociados </Text> :
                                this.state.bagNumber !== "" ?
                                    <Text style={styles.modalSectionBodyTitleText2}>No se encontraron bultos para ese número</Text> :
                                    null
                        }

                    </View>
                    <View style={{ flex: 5 }}>
                        <View>
                            {
                                (Object.keys(order).length > 0) &&
                                <View style={styles.resumeBody}>
                                    <View style={styles.resumeBodyInfo}>
                                        {
                                            order.bags.map((bag: any, index: number) => {
                                                return (
                                                    <View key={index} style={{ width: wp(60), height: hp(6), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.grayHeader, marginTop: 10, borderRadius: 10 }}>
                                                        <Text key={index} style={[styles.resumeBodyInfoText, { color: colors.lightgray }]}>Nº {bag.bagNumber}</Text>
                                                        {
                                                            bag.check &&
                                                            <IconBar name="check-circle" color={colors.darkGreen} size={RFValue(30)} />
                                                        }

                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            }
                        </View>
                    </View>

                    <View style={{ flex: 2 }}>
                        <View style={styles.headerContainer}>
                            {
                                <View style={styles.resumeHeaderInfo}>
                                    <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext}>
                                        {
                                            (Object.keys(order).length > 0) && !this.props.bags.success ?
                                                this.validateItems() ?
                                                    <CustomButton onPress={() => this.updateOrder()} size={"m"}>
                                                        <Text style={{
                                                            fontFamily: fonts.primaryFontTitle,
                                                            fontSize: RFValue(Size(56)),
                                                            color: colors.white
                                                        }}>Finalizar</Text>
                                                    </CustomButton> :
                                                    <CustomButton onPress={() => this.clearBagNumber()} size={"m"}>
                                                        <Text style={{
                                                            fontFamily: fonts.primaryFontTitle,
                                                            fontSize: RFValue(Size(56)),
                                                            color: colors.white
                                                        }}>Siguiente Bulto</Text>
                                                    </CustomButton> :
                                                null
                                        }
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
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

            </Center>

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
        flex: 8,
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
        marginTop: 20
    },
    modalSectionBodyTitleText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFontTitle,
        color: colors.black2
    },
    modalSectionBodyTitleText2: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFont,
        color: colors.black2
    },
    modalSectionBodyInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontSize: RFValue(21)
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
    shop: state.shop,
    detail: state.detail,
    bags: state.bags,
    search: state.search,
    delivery: state.delivery,
})

const mapDispatchToProps = (dispatch: any) => ({

    fetchDataBags: () => dispatch(getHomeBagItems()),
    updateBag: (id: string, orderId: string) => dispatch(updateBagAction(id, orderId)),
    updateBagFinish: () => dispatch(updateBagActionFinish()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeDelivery)
