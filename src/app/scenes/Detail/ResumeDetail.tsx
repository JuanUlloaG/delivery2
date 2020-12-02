import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
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
import { CustomButton } from '../../components/CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomInput } from '../../components/TextInput';
var { width, height } = Dimensions.get('window');
import { RNCamera } from "react-native-camera";
const HEIGHT_MODAL = Dimensions.get('window').height * 0.78;
type Animation = any | Animated.Value;
import { RNNotificationBanner } from 'react-native-notification-banner';
import Icons from 'react-native-vector-icons/FontAwesome'
Icons.loadFont('AntDesign.ttf')
let copy = <Icons name="closecircleo" size={24} color="white" family={"AntDesign"} />;


import { State as AuthState } from "../../reducers/AuthReducer";

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
    bagContainer: Array<any>,
    orderNumber: string
}

class Detail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            orderNumber: "",
            bagContainer: []
        }
    }

    componentDidMount() {
        if (this.props.route.params.bagContainer) {
            this.setState({ bagContainer: this.props.route.params.bagContainer, orderNumber: this.props.route.params.orderNumber })
        }
    }

    finishPacking = () => {
        this.props.route.params.finishPacking()
    }

    finishProcess() {
        this.props.restart()
        this.props.route.params.updateBagSend()
        let to
        (this.props.auth.profile.key == "2") ? to = "Pickear" : "Recepción"
        this.props.navigation.push("AppTab", {
            screen: to,
        })
    }

    alert() {
        Alert.alert(
            "Confirmación",
            "¿ Desea confirmar envio de bultos ?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.finishPacking() }
            ],
            { cancelable: false }
        );
    }


    render() {

        if (this.props.detail.error) RNNotificationBanner.Show({
            title: "Error", subTitle: this.props.detail.message, withIcon: true, icon: copy, tintColor: colors.highLightRed, onHide: () => {
                console.log("aqui4");
            }
        })
        if (this.props.detail.success) RNNotificationBanner.Show({
            title: "Mensaje", subTitle: this.props.detail.message, withIcon: true, icon: copy, tintColor: colors.lightGreen, onHide: () => {
                this.finishProcess()
            }
        })

        this.props.navigation.setOptions({
            headerTitle: "Resumen",
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
                !this.props.detail.success &&
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: Size(45) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <IconChange name='left' size={24} color={colors.white} />
                    </View>
                </TouchableOpacity>
            ),
        });

        return (
            <Center>
                <View style={styles.headerContainer}>
                    {
                        <View style={styles.resumeHeaderInfo}>
                            <Text style={styles.headerContainerTitleText}>El Pedido Nº {this.state.orderNumber} tiene {this.state.bagContainer.length} Bulto(s): </Text>
                        </View>
                    }
                </View>
                <View style={styles.bodyContainer}>
                    <ScrollView contentContainerStyle={[styles.bodyContainerScrollView]}>
                        {

                            <View style={styles.resumeBody}>
                                <View style={styles.resumeBodyInfo}>
                                    {
                                        this.state.bagContainer.map((bag, index) => {
                                            return (
                                                <View key={index} style={{ width: wp(60), height: hp(6), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.grayHeader, marginTop: 10, borderRadius: 10 }}>
                                                    <Text key={index} style={styles.resumeBodyInfoText}>Nº {bag.bagNumber} </Text>
                                                    <IconBar name="check-circle" color={colors.darkGreen} size={RFValue(30)} />
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        }
                    </ScrollView>
                    {/* <View style={styles.resumeBodyInfoIcon}>
                                                <IconBar name="checkbox-marked-circle-outline" color={colors.darkGreen} size={RFValue(190)} />
                                            </View> */}

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, marginTop: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                            {
                                this.props.detail.error &&
                                <>
                                    <Text style={styles.resumeBodyInfoText}>Ha ocurrido un error al finalizar el proceso</Text>
                                    <Text style={styles.resumeBodyInfoText}>{this.props.detail.message}</Text>
                                </>
                            }
                            {/* {
                                this.props.detail.success &&
                                <Text style={styles.resumeBodyInfoText}>{this.props.detail.message}</Text>
                            } */}
                            {/* {
                                (!this.props.detail.success && !this.props.detail.error) &&
                                <Text style={styles.resumeBodyInfoText}>{"¿Desea confirmar envío de pedido?"}</Text>
                            } */}

                        </View>
                        {
                            // this.props.detail.success ?
                            //     <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                            //         <CustomButton onPress={() => this.finishProcess()} size={"m"} >
                            //             <Text style={{
                            //                 fontFamily: fonts.buttonFont,
                            //                 fontSize: RFValue(Size(56)),
                            //                 color: "#333333"
                            //             }}>Ir a pedidos</Text>
                            //         </CustomButton>
                            //     </View> :
                            !this.props.detail.success &&
                            <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <CustomButton onPress={() => !this.props.detail.isFetching && this.alert()} size={"m"} >
                                    <Text style={{
                                        fontFamily: fonts.primaryFontTitle,
                                        fontSize: RFValue(Size(56)),
                                        color: colors.white
                                    }}>Confirmar</Text>
                                </CustomButton>
                            </View>
                            // <CustomButtonList onPress={() => this.finishProcess()} title="Ir a pedidos" disable={false} size={"XL"} /> :
                            // <CustomButtonList onPress={() => this.finishPacking()} title="Aceptar" disable={false} size={"XL"} />

                        }
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    </View>


                </View>
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
        fontSize: RFValue(17),
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
        fontFamily: fonts.primaryFontTitle
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
        fontSize: RFValue(19)
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail)