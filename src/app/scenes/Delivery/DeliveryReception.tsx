import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux'
import { Center } from '../../components/Center';
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import fonts from '../../assets/Fonts';
import IconChange from "react-native-vector-icons/AntDesign";
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomButtonList } from '../../components/CustomButtonList';
import { CustomButton } from '../../components/CustomButton';
import { RFValue } from "react-native-responsive-fontsize";
import { updateBagReceivedAction, updateBagActionFinish } from '../../actions/HomeListBagAction'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomInput } from '../../components/TextInput';
import { RNCamera } from "react-native-camera";
import { TextInput } from 'react-native-gesture-handler';
import { RNNotificationBanner } from 'react-native-notification-banner';
import Icons from 'react-native-vector-icons/FontAwesome'
Icons.loadFont('AntDesign.ttf')
let copy = <Icons name="closecircleo" size={24} color="white" family={"AntDesign"} />;

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
    updateBagReceived: (id: string, comment: string, received: string) => {},
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

class DeliveryReception extends React.Component<Props, State> {

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
    }

    componentDidMount() {
    }

    loadItems(index: number) {

    }


    // add intems to bag 
    finishAction = () => {
    }

    addProductPicked(index: number) {

    }

    removeProductPicked(index: number) {

    }

    toggleModal() {
        this.props.route.params.updatePerson(this.state.person)
        this.props.route.params.updateComment(this.state.comment)
        this.props.route.params.finishAction()

    }

    validatePickedItems() {

    }

    dissmissModal() {
    }

    handleTourch(value: boolean) {
    }

    onChangeBagNumber = (text: string) => {
    }

    captureBagNumber() {
    }

    disableCamera() {
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
    }

    updateOrder() {

    }

    finish() {
        this.props.route.params.finish()
        this.props.navigation.push("AppTab", {
            screen: 'Entrega',
        })

    }

    validate() {
    }


    render() {

        if (this.props.bags.error) RNNotificationBanner.Show({
            title: "Error", subTitle: this.props.bags.message, withIcon: true, icon: copy, tintColor: colors.highLightRed, onHide: () => {
                this.props.route.params.finish()
            }
        })
        if (this.props.bags.success) RNNotificationBanner.Show({
            title: "Mensaje", subTitle: this.props.bags.message, withIcon: true, icon: copy, tintColor: colors.lightGreen, onHide: () => {
                this.props.route.params.finish()
                this.props.navigation.navigate('HomeAddres')
            }
        })


        this.props.navigation.setOptions({
            headerTitle: "Entregar",
            headerTitleStyle: {
                textAlign: 'center',
                flexGrow: 1,
                marginRight: 50,
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
        });

        return (
            <Center>
                <View style={styles.bodyContainer}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.modalSectionBody}>
                            <View style={[styles.modalSectionBodyTitle]}>
                                <Text style={styles.modalSectionBodyTitleText}>Datos de entrega</Text>
                            </View>
                            <View style={{ flex: 3, alignItems: 'center' }}>
                                <View style={styles.personContainer}>
                                    <TextInput onChangeText={(text) => { this.updatePerson(text) }} placeholder="Nombre " value={this.state.person} style={styles.textComment} />
                                </View>
                                <View style={styles.commentContainer} >
                                    <TextInput placeholder="Comentario" onChangeText={(text) => { this.updateComment(text) }} value={this.state.comment} multiline={true} style={styles.textComment} />
                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {/* {
                                    this.props.bags.error &&
                                    <>
                                        <Text style={styles.resumeBodyInfoText}>Ha ocurrido un error al finalizar el proceso</Text>
                                        <Text style={styles.resumeBodyInfoText}>{this.props.bags.message}</Text>
                                    </>
                                }
                                {
                                    this.props.bags.success &&
                                    <Text style={styles.resumeBodyInfoText}>{this.props.bags.message}</Text>
                                } */}
                                {/* {
                                    (!this.props.bags.success && !this.props.bags.error) &&
                                    <Text style={styles.resumeBodyInfoText}>{"¿Desea confirmar la recepción del pedido?"}</Text>
                                } */}
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {
                                    !this.props.bags.success ?
                                        (this.state.person !== "" && this.state.comment !== "") &&
                                        <CustomButton onPress={() => !this.props.bags.isFetching && this.toggleModal()} size={"l"}>
                                            <Text style={styles.buttonText}>Finalizar Entrega</Text>
                                        </CustomButton> :
                                        null
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Center>
        );
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
        fontFamily: fonts.primaryFontTitle
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
        alignItems: 'flex-start',
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

    updateBagReceived: (id: string, comment: string, received: string) => dispatch(updateBagReceivedAction(id, comment, received)),
    updateBagFinish: () => dispatch(updateBagActionFinish()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryReception)
