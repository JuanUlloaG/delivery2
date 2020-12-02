import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { Center } from '../../components/Center';
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import fonts from '../../assets/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import IconChange from "react-native-vector-icons/AntDesign";
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import Iconprinter from "react-native-vector-icons/Feather";
import { postBagsAction, RestartAction } from '../../actions/DetailActions';
import { CustomButtonList } from '../../components/CustomButtonList';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomInput } from '../../components/TextInput';
var { width, height } = Dimensions.get('window');
import { RNCamera } from "react-native-camera";
const HEIGHT_MODAL = Dimensions.get('window').height * 0.78;
type Animation = any | Animated.Value;
import RNPrint from 'react-native-print';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';


import { State as AuthState } from "../../reducers/AuthReducer";
import { CustomButton } from '../../components/CustomButton';

interface Props {
    navigation: any,
    auth: AuthState,
    route: any,
    detail: any,
    home: { isFetching: boolean, data: [any] },
    postData: (bag: any) => {},
    restart: () => {}
}

interface State {
    pickeditems: Array<any>,
    index: number,
    animationValue: Animation,
    opacity: Animation,
    bagNumber: string,
    bagContainer: Array<any>,
    pickedProductArray: Array<any>,
    resume: boolean,
    torchOn: boolean,
    toggleModal: boolean,
    selectedPrinter: any
}

class DetailAddToBag extends React.Component<Props, State> {

    private camera: RNCamera;
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
            toggleModal: false,
            selectedPrinter: null
        }
    }

    filterData() {
        // let result = this.props.home.data.filter((row) => {
        //     return row._id === this.props.route.params.ordernumber
        // })
        // if (result.length) return result[0]
        // return {}
    }

    componentDidMount() {
        // this.loadItems(0)
        // this.selectPrinter()
    }

    selectPrinter = async () => {
        const selectedPrinter = await RNPrint.selectPrinter()
        this.setState({ selectedPrinter })
    }

    loadItems(index: number) {
        // let order = this.filterData()
        // let pickedProductArray = Array.from(Array(order.products[index].units).keys())

        // let pick = pickedProductArray.map((row) => {
        //     let item = JSON.parse(JSON.stringify(order.products[index]))
        //     item["picked"] = false
        //     item["broken"] = false
        //     item["replace"] = false
        //     item["substituted"] = false
        //     return item
        // })
        // this.setState({ pickedProductArray: pick })
    }


    // add intems to bag 
    nextItem = () => {
        // let order = this.filterData()
        // let bagContainer = [...this.state.bagContainer]
        // let bag = { bagNumber: this.state.bagNumber, products: [...this.state.pickedProductArray] }
        // bagContainer.push(bag)
        // if (this.state.index < order.products.length - 1) {
        //     this.loadItems(this.state.index + 1)
        //     this.setState({ index: this.state.index + 1, bagContainer: bagContainer })
        //     this.dissmissModal()
        // } else {
        //     this.setState({ bagContainer: bagContainer, resume: true })
        //     this.dissmissModal()
        // }


    }

    captureBagNumber() {
        this.setState({ torchOn: true })
    }

    disableCamera() {
        this.setState({ torchOn: false })
    }

    ProductPicked(index: number) {
        // let pickedProductArray = [...this.state.pickedProductArray]

        // if (pickedProductArray[index].picked) {
        //     pickedProductArray[index].picked = false
        // } else {
        //     pickedProductArray[index].picked = true
        //     if (pickedProductArray[index].broken) pickedProductArray[index].broken = false
        // }

        // this.setState({ pickedProductArray })
    }

    ProductBroken(index: number) {
        // let pickedProductArray = [...this.state.pickedProductArray]

        // if (pickedProductArray[index].broken) {
        //     pickedProductArray[index].broken = false
        // } else {
        //     pickedProductArray[index].broken = true
        //     if (pickedProductArray[index].picked) pickedProductArray[index].picked = false
        // }
        // this.setState({ pickedProductArray })
    }

    toggleModal() {
        this.setState({ toggleModal: true });
    }

    validatePickedItems() {
        // let pickedProductArray = [...this.state.pickedProductArray]
        // let picked = true
        // pickedProductArray.map((product) => {
        //     if (product.picked === false) picked = false
        // })
        // return picked
    }
    countPicked() {
        // let count = 0
        // let pickedProductArray = [...this.state.pickedProductArray]
        // pickedProductArray.map((row) => {
        //     if (row.picked) count = count + 1
        // })

        // return count
    }

    dissmissModal() {
        // this.setState({ toggleModal: false });
    }

    onChangeBagNumber = (text: string) => {
        this.setState({ bagNumber: text })
    }

    handleTourch(value: boolean) {
        // if (value === true) {
        //     this.setState({ torchOn: false });
        // } else {
        //     this.setState({ torchOn: true });
        // }
    }

    onBarCodeRead = (e: any) => {

        this.setState({ bagNumber: e.data, torchOn: false })
    }


    /*
      orderNumber: database id order
      shopId: database id order
      pickerId: database id picker user
    */
    finishPacking = () => {
        // const order = this.filterData()
        // let bag = {
        //     orderNumber: order._id,
        //     shopId: this.props.auth.shop,
        //     pickerId: this.props.auth.id,
        //     bags: [...this.state.bagContainer]
        // }
        // this.props.postData(bag)
    }

    finishProcess() {
        // this.props.restart()
        // this.props.navigation.goBack()
    }

    goBack() {
        this.setState({ bagNumber: "" })
        this.props.route.params.onGoBack(this.state.bagNumber, this.props.route.params.product)
        this.props.navigation.goBack()
    }

    focusLose() {
    }


    render() {

        // console.log(this.state.selectedPrinter);

        this.props.navigation.setOptions({
            headerTitle: "Agregar",
            headerTitleStyle: {
                textAlign: 'center',
                flexGrow: 1,
                marginRight: 0,
                alignSelf: 'center',
                color: colors.white,
                fontFamily: fonts.primaryFontTitle,
                fontSize: Size(65),
            },
            headerLeft: () => (
                // platform == "ios" &&
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: Size(45) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <IconChange name='left' size={24} color={colors.white} />
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                // platform == "ios" &&
                <TouchableOpacity onPress={() => null} style={{ marginRight: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Iconprinter name={"printer"} size={RFValue(30)} color={colors.white} />
                    </View>
                </TouchableOpacity>
            )
        });


        return (

            <Center>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.bodyContainer}>
                        <View style={{ flex: 1, backgroundColor: colors.grayHeader }}>
                            <View style={styles.modalSectionBodyTitle}>
                                <Text style={styles.modalSectionBodyTitleText}>Digita o escanea el bulto</Text>
                            </View>
                            <View style={[styles.modalSectionBodyInput, { justifyContent: 'center', flexDirection: 'row' }]}>
                                <View style={{ flex: 4, alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <CustomInput keyType={'numeric'} size="m" value={this.state.bagNumber} onBlur={() => this.focusLose()} onChangeText={(text) => { this.onChangeBagNumber(text) }} placeholder="Número de bulto" type={false} editable={true} />
                                </View>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.captureBagNumber()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <IconBar name={"barcode-scan"} size={RFValue(45)} color={colors.black} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 6 }}>
                            <View style={styles.modalSectionBodyPrinter}>
                                <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext}>
                                    <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <CustomButton onPress={() => this.goBack()} size={"m"} disable={this.state.bagNumber ? false : true} color={this.state.bagNumber ? colors.lightBlue : colors.lightgrayDisabled} >
                                            <Text style={{
                                                fontFamily: fonts.primaryFontTitle,
                                                fontSize: RFValue(Size(56)),
                                                color: this.state.bagNumber ? colors.white : "#333333"
                                            }}>Siguiente</Text>
                                        </CustomButton>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={{ flex: 1, width: wp(100) }}>
                            <View style={{ flex: 2, backgroundColor: colors.grayHeader, height: hp(15) }}>
                                <View style={styles.modalSectionBodyTitle}>
                                    <Text style={styles.modalSectionBodyTitleText}>Digita o escanea el bulto</Text>
                                </View>
                                <View style={[styles.modalSectionBodyInput, { justifyContent: 'center' }]}>
                                    <View style={{ flex: 4, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <CustomInput size="m" value={this.state.bagNumber} onBlur={() => this.focusLose()} onChangeText={(text) => { this.onChangeBagNumber(text) }} placeholder="Número de bulto" type={false} editable={true} />
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.captureBagNumber()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <IconBar name={"barcode-scan"} size={RFValue(45)} color={colors.black} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, width: wp(100) }}>
                                <View style={styles.modalSectionBodyTitle}>
                                    <Text style={styles.modalSectionBodyTitleText}>Digita o escanea el bulto</Text>
                                </View>
                                <View style={[styles.modalSectionBodyInput, { justifyContent: 'center', flexDirection: 'row' }]}>
                                    <View style={{ flex: 4, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <CustomInput size="m" value={this.state.bagNumber} onBlur={() => this.focusLose()} onChangeText={this.onChangeBagNumber.bind(this)} keyType={'numeric'} placeholder="Número de bulto" type={false} editable={true} />
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.captureBagNumber()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <IconBar name={"barcode-scan"} size={RFValue(45)} color={colors.black} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                            <View style={styles.modalSectionBodyPrinter}>
                                <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext}>
                                    <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <CustomButton onPress={() => this.goBack()} size={"m"} disable={this.state.bagNumber ? false : true} color={this.state.bagNumber ? colors.lightBlue : colors.lightgrayDisabled} >
                                            <Text style={{
                                                fontFamily: fonts.buttonFont,
                                                fontSize: RFValue(Size(56)),
                                                color: "#333333"
                                            }}>Siguiente</Text>
                                        </CustomButton>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView> */}

                {
                    (this.state.torchOn && !this.state.bagNumber) &&
                    <View style={{

                        width: wp(100),
                        height: hp(100),
                        flexDirection: 'column',
                        position: 'absolute',
                        zIndex: 1000,
                        backgroundColor: 'black',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <RNCamera
                            style={{ width: wp(100), height: hp(55), justifyContent: 'center', alignItems: 'center' }}
                            onBarCodeRead={this.onBarCodeRead}
                            ref={(cam: RNCamera) => { this.camera = cam }}
                            captureAudio={false}
                            onGoogleVisionBarcodesDetected={({ barcodes }) => { }}
                        />
                        <View style={{ position: 'absolute', flex: 1, bottom: 0, marginBottom: 120, marginLeft: 100 }}>
                            <TouchableOpacity onPress={() => this.disableCamera()} style={{
                                flex: 1,
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                padding: 15,
                                // paddingHorizontal: 20,
                                // margin: 20,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 14 }}> Volver </Text>
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
        borderStyle: 'dashed',
        paddingVertical: 10
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
        backgroundColor: colors.lightgrayDisabled
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
        flex: 6
    },
    modalSectionBodyTitle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalSectionBodyTitleText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFontTitle,
        color: colors.black2
    },
    modalSectionBodyInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSectionBodyScanBar: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    modalSectionBodyPrinter: {
        flex: 1,
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
        alignItems: 'center',
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

});

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    detail: state.detail
})

const mapDispatchToProps = (dispatch: any) => ({

    postData: (bag: any) => dispatch(postBagsAction(bag)),
    restart: () => dispatch(RestartAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailAddToBag)