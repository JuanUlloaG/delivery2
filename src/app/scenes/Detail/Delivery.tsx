import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { Center } from '../../components/Center';
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import fonts from '../../assets/Fonts';
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomButtonList } from '../../components/CustomButtonList';
import { CustomButton } from '../../components/CustomButton';
import { RFValue } from "react-native-responsive-fontsize";
import { updateBagReceivedAction, updateBagActionFinish } from '../../actions/HomeListBagAction'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomInput } from '../../components/TextInput';
import { RNCamera } from "react-native-camera";
import { TextInput } from 'react-native-gesture-handler';


var { width, height } = Dimensions.get('window');
const HEIGHT_MODAL = Dimensions.get('window').height * 0.76;
type Animation = any | Animated.Value;



interface Props {
    navigation: any,
    auth: object,
    route: any,
    bags: { isFetching: boolean, data: [any], success: boolean, error: boolean, message: string },
    home: { isFetching: boolean, data: [any] },
    camera: RNCamera,
    updateBagReceived: (id: string, orderId: string, comment: string, received: string) => {},
    updateBagFinish: () => {}
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
    complete: Array<any>,
    resume: boolean,
    torchOn: boolean,
    showModal: boolean,
    person: string,
    comment: string,
    order: any,
}

class Delivery extends React.Component<Props, State> {


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
            showModal: false,
            person: "",
            comment: "",
            order: {},
            complete: []
        }

    }

    filterData() {
        if (this.props.route.params.order) return this.props.route.params.order
        return {}
    }

    componentDidMount() {
        this.props.updateBagFinish()
        try {
            let data = this.filterData()

            if (Object.keys(data).length > 0) {
                data.bags.map((bag: any) => {
                    bag['delivery'] = false
                })
                this.setState({ order: data })
            }
        } catch (error) {
        }
    }

    loadItems(index: number) {

    }

    finishAction = () => {
        // this.dissmissModal()
        const order = this.state.order
        this.props.updateBagReceived(order._id, order.orderNumber._id, this.state.comment, this.state.person)
    }

    addProductPicked(index: number) {

    }

    removeProductPicked(index: number) {

    }

    toggleModal() {
        // this.setState({ showModal: true });
        this.props.navigation.navigate('DeliveryReception', {
            finishAction: () => this.finishAction(),
            finish: () => this.finish(),
            updatePerson: (text: string) => this.updatePerson(text),
            updateComment: (text: string) => this.updateComment(text),
        });
    }

    validatePickedItems() {

    }

    dissmissModal() {
        this.setState({ showModal: false });
    }

    handleTourch(value: boolean) {
        if (value === true) {
            this.setState({ torchOn: false });
        } else {
            this.setState({ torchOn: true });
        }
    }

    onChangeBagNumber = (text: string) => {
        if (text.length > 1) {
            let bags = [...this.state.bags]
            bags.push(text)
            const order = this.state.order;
            order.bags.map((row: any) => {
                if (text == row.bagNumber) {
                    this.find = true
                    row.delivery = true
                    Keyboard.dismiss()
                }
            })
            this.setState({ bagNumber: text, bags, order: order })
        } else {
            this.setState({ bagNumber: text })
        }
    }

    captureBagNumber() {
        this.setState({ torchOn: true, bagNumber: "" })
    }

    disableCamera() {
        this.setState({ torchOn: false })
    }

    updatePerson(text: string) {
        this.setState({ person: text })
    }

    updateComment(text: string) {
        this.setState({ comment: text })
    }

    clearBagNumber() {
        this.setState({ bagNumber: "" })
    }

    onBarCodeRead = (e: any) => {
        if (e.data.length > 1) {
            let bags = [...this.state.bags]
            bags.push(e.data)
            const order = this.state.order;
            order.bags.map((row: any) => {
                if (e.data == row.bagNumber) {
                    this.find = true
                    row.delivery = true
                    this.focusLose()
                }
            })
            this.setState({ bagNumber: e.data, bags, order: order })
        } else {
            this.setState({ bagNumber: e.data })
        }


        let bags = [...this.state.bags]
        bags.push(e.data)
        this.setState({ bagNumber: e.data, bags, torchOn: false, })
    }

    updateOrder() {

    }

    finish() {
        this.props.updateBagFinish()
    }

    validate() {
        const order = this.state.order;
        let delivery = true
        order.bags.map((row: any) => {
            if (!row.delivery) delivery = false
        })
        return delivery
    }

    focusLose() {
        if (this.find) {
            this.setState({ bagNumber: "" })
            this.find = false
        }
    }


    render() {

        const order = this.state.order;
        if (Object.keys(order).length) {
            if (!this.state.showModal) {
                return (
                    <Center>
                        <View style={styles.bodyContainer}>
                            <View style={{ flex: 1, backgroundColor: colors.grayHeader }}>
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
                            <View style={{ flex: 3 }}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <View style={{ flex: 2 }}>

                                        <View style={styles.modalSectionBodyTitle}>
                                            <Text style={styles.modalSectionBodyTitleText}>Lista de todos los bultos asociados </Text>
                                        </View>
                                        <View style={{ flex: 5 }}>
                                            <ScrollView contentContainerStyle={styles.bodyContainerScrollView}>
                                                {
                                                    <View style={styles.resumeBody}>
                                                        <View style={styles.resumeBodyInfo}>
                                                            {
                                                                order.bags.map((bag: any, index: number) => {
                                                                    return (
                                                                        <View key={index} style={{ width: wp(60), height: hp(6), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.grayHeader, marginTop: 10, borderRadius: 10 }}>
                                                                            <Text key={index} style={[styles.resumeBodyInfoText, { color: this.state.bags.includes(bag.bag) ? colors.darkGreen : colors.black }]}>Nº {bag.bagNumber} </Text>
                                                                            {
                                                                                bag.delivery &&
                                                                                <IconBar name="check-circle" color={colors.darkGreen} size={RFValue(30)} />
                                                                            }

                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                }
                                            </ScrollView>
                                        </View>
                                    </View>
                                    <View style={styles.headerContainer}>
                                        <View style={styles.resumeHeaderInfo}>
                                            {
                                                (this.validate() && !this.props.bags.success) &&
                                                <CustomButton onPress={() => this.toggleModal()} size={"m"}>
                                                    <Text style={styles.buttonText}>Entregar Bultos</Text>
                                                </CustomButton>

                                            }
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </Center>
                );
            } else {
                return (
                    <Center>
                        <View style={styles.bodyContainer}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {/* <View style={[styles.modalSectionInfo]}>
                                    <TouchableOpacity onPress={() => { this.dissmissModal() }} style={styles.modalSectionInfoCancelButton}>
                                        <Text style={styles.modalSectionInfoCancelButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <View style={styles.modalSectionInfoTitle}>
                                        <Text style={styles.modalSectionInfoTitleText}>Entrega</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { this.finishAction() }} style={styles.modalSectionInfoButtonNext}>
                                        <Text style={styles.modalSectionInfoButtonNextText}>Finalizar</Text>
                                    </TouchableOpacity>
                                </View> */}
                                <View style={styles.modalSectionBody}>
                                    <View style={[styles.modalSectionBodyTitle]}>
                                        <Text style={styles.modalSectionBodyTitleText}>Quien recibe el pedido </Text>
                                    </View>
                                    <View style={{ flex: 3, alignItems: 'center' }}>
                                        <View style={styles.personContainer}>
                                            <TextInput onChangeText={(text) => { this.updatePerson(text) }} placeholder="Nombre" value={this.state.person} style={styles.textComment} />
                                        </View>
                                        <View style={styles.commentContainer} >
                                            <TextInput placeholder="Comentario" onChangeText={(text) => { this.updateComment(text) }} value={this.state.comment} multiline={true} style={styles.textComment} />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        {
                                            (this.state.person !== "" && this.state.comment !== "") &&
                                            <CustomButton onPress={() => this.toggleModal()} size={"l"}>
                                                <Text style={styles.buttonText}>Finalizar Entrega</Text>
                                            </CustomButton>
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
                                        ref={cam => this.camera = cam}
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
                    </Center>
                );
            }
        }
        return (
            <Center>
                <Text>No hay data para mostrar 👨🏾‍💻</Text>
            </Center>
        )


    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.ultraLightgray,
        alignItems: 'center'
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
        marginTop: 0
    },
    baseFlex: {
        flex: 1
    },
    modalAnimated: {
        width: width,
        height: hp(100) * 0.70,
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
        flex: 3
    },
    modalSectionBodyTitle: {
        flex: 1,
        justifyContent: 'center',
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
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20
    },
    modalSectionBodyPrinter: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resumeHeaderInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
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
    commentContainer: {
        alignItems: 'center',
        paddingStart: Size(95),
        width: wp(100) - Size(95),
        height: Size(227),
        borderRadius: Size(27),
        borderWidth: Size(1),
        borderColor: "rgba(117, 117, 117, 255)",
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: Size(66),
        flexDirection: 'row'
    },
    personContainer: {
        alignItems: 'center',
        paddingStart: Size(95),
        width: wp(100) - Size(95),
        height: Size(117),
        borderRadius: Size(27),
        borderWidth: Size(1),
        borderColor: "rgba(117, 117, 117, 255)",
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: Size(66),
        flexDirection: 'row'
    },
    textComment: {
        width: wp(100) - Size(95),
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(Size(56)),
        color: colors.white
    }

});

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    bags: state.bags
})

const mapDispatchToProps = (dispatch: any) => ({

    updateBagReceived: (id: string, orderId: string, comment: string, received: string) => dispatch(updateBagReceivedAction(id, orderId, comment, received)),
    updateBagFinish: () => dispatch(updateBagActionFinish()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Delivery)
