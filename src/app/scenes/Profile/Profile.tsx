
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/Feather";
import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { State as StateAuth } from "../../reducers/AuthReducer";
import { FlatList, View, Text, StyleSheet, Switch } from 'react-native'
import { logOutUser, updateState, AuthClearState } from '../../actions/AuthActions'
import Loading from '../Loading/Loading'
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NavigationProp } from "@react-navigation/native";
import { CustomButton } from '../../components/CustomButton';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { RNNotificationBanner } from 'react-native-notification-banner';
import Icons from 'react-native-vector-icons/FontAwesome'
Icons.loadFont('AntDesign.ttf')
let copy = <Icons name="closecircleo" size={24} color="white" family={"AntDesign"} />;



interface ProfileProps {
    navigation: NavigationProp<any, any>,
    auth: StateAuth,
    home: { isFetching: boolean, data: [any] },
    shop: { data: [], isFetching: boolean, error: boolean },
    setStateAction: (state: boolean) => {},
    logOut: () => {},
    clearStateAction: () => {}
}

interface State {
    isEnabled: boolean
}

class Profile extends React.Component<ProfileProps, State> {

    constructor(props: ProfileProps) {
        super(props)
        this.state = {
            isEnabled: false
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    getData = () => {
        let data = this.props.home.data ? this.props.home.data : []
        return data
    }

    logOut = () => {
        this.props.logOut()
    };


    toggleSwitch = (state: boolean) => {
        this.props.setStateAction(!state)
    };


    render() {

        if (this.props.auth.error) RNNotificationBanner.Show({
            title: "Error", subTitle: "Error al actualizar el estado", withIcon: true, icon: copy, tintColor: colors.highLightRed, onHide: () => {
                console.log("aqui5");
                this.props.clearStateAction()
            }
        })
        if (this.props.auth.success) RNNotificationBanner.Show({
            title: "Mensaje", subTitle: "Estado actualizado correctamente", withIcon: true, icon: copy, tintColor: colors.lightGreen, onHide: () => {
                this.props.clearStateAction()
            }
        })


        const isfetch = this.props.home.isFetching
        if (Object.keys(this.props.auth).length > 0) {
            let { name, state, profile, company, shop } = this.props.auth
            return (
                <Center>
                    <View style={styles.containerInfo}>
                        <View style={styles.containerConfigHeader}>
                            <View style={styles.containerConfigHeaderView}>
                                <Text style={styles.containerInfoText}>Información Personal</Text>
                            </View>
                        </View>
                        <View style={styles.containerInfoNames}>
                            <Text style={styles.containerInfoText}>{name}</Text>
                            <Text style={[styles.containerInfoText, { fontFamily: fonts.primaryFont }]}>{profile.description}</Text>
                            <Text style={[styles.containerInfoText, { fontFamily: fonts.primaryFont }]}>{company.name + " - Local " + shop.description}</Text>
                        </View>
                        <View style={styles.containerInfoEstado}>
                            <Text style={styles.containerInfoText}>Estado: </Text>
                            <Text style={styles.containerInfoTextRol}>{state ? "Activo" : "Inactivo"}</Text>
                            <Text style={[styles.containerIcon, { backgroundColor: state ? '#85D000' : colors.mediumRed }]}></Text>
                        </View>
                    </View>
                    <View style={styles.containerConfig}>
                        <View style={styles.containerConfigHeader}>
                            <View style={styles.containerConfigHeaderView}>
                                <Text style={styles.containerInfoText}>Configuraciones</Text>
                            </View>
                        </View>
                        <View style={styles.containerConfigItemContent}>
                            <View style={styles.containerConfigItemContentAction}>
                                <Text style={styles.containeractionIntemText}>Cambiar Estado</Text>
                                <Text style={styles.containeractionIntemTextSub}>De Activo a Inactivo</Text>
                            </View>
                            <View style={styles.containerConfigItemContentButton}>
                                <Switch
                                    trackColor={{ false: "#767577", true: colors.lightGreen2 }}
                                    thumbColor={state ? "#85D000" : "#f4f3f4"}
                                    ios_backgroundColor="#85D000"
                                    onValueChange={() => this.toggleSwitch(state)}
                                    value={state}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerSesion}>
                        <View style={styles.containerSesionItem}>
                            <View style={styles.containerSesionItemAction}>
                                <Text style={styles.containeractionIntemText}>Cerrar Sesión</Text>
                            </View>
                            <View style={styles.containerSesionItemButton}>
                                <TouchableOpacity onPress={() => { this.logOut() }}>
                                    <Icon name="log-out" color={colors.black2} size={RFValue(28)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Center >
            );
        }
        return (
            <Center>
                <Text>No hay data para mostrar 👨🏾‍💻</Text>
            </Center>
        )

    }

}

const styles = StyleSheet.create({
    containerInfo: {
        // flex: 2,
        width: wp(100),
        justifyContent: 'center',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        height: hp(28)
    },
    containerInfoNames: {
        flex: 2,
        justifyContent: "flex-end",
        marginLeft: Size(111)
    },
    containerInfoText: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(18)
    },
    containeractionIntemText: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(17)
    },
    containeractionIntemTextSub: {
        fontFamily: fonts.primaryFont,
        fontSize: RFValue(14)
    },
    containerInfoTextRol: {
        fontFamily: fonts.primaryFont,
        fontSize: RFValue(18)
    },
    containerInfoEstado: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: Size(111)
    },
    containerConfig: {
        flex: 2,
        width: wp(100),
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1
    },
    containerConfigHeader: {
        flex: 1,
        justifyContent: 'center'
    },
    containerConfigHeaderView: {
        flex: 1,
        marginLeft: Size(40),
        justifyContent: 'center'
    },
    containerConfigItemContent: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        flexDirection: 'row'
    },
    containerConfigItemContentAction: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: Size(111)
    },
    containerConfigItemContentButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: Size(111)
    },
    containerSesion: {
        flex: 3,
        width: wp(100)
    },
    containerSesionItem: {
        flex: 1,
        flexDirection: 'row',
        marginTop: Size(45)
    },
    containerSesionItemAction: {
        flex: 1,
        marginLeft: Size(111)
    },
    containerSesionItemButton: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: Size(111)
    },
    containerIcon: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginTop: 5,
        marginLeft: 10,
        shadowColor: "#676767",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3,
    }
})

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    shop: state.shop,
})

const mapDispatchToProps = (dispatch: any) => ({

    setStateAction: (state: boolean) => dispatch(updateState(state)),
    logOut: () => dispatch(logOutUser()),
    clearStateAction: () => dispatch(AuthClearState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

