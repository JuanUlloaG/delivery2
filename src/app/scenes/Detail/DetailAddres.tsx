import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, PermissionsAndroid, Alert } from 'react-native';
import { connect } from 'react-redux'
import { Center } from '../../components/Center';
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import fonts from '../../assets/Fonts';
import IconBag from "../../assets/Icon";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StateDelivery } from "../../reducers/DeliveryReducer";
import IconChange from "react-native-vector-icons/AntDesign";
import { CustomButton } from '../../components/CustomButton';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { width, height } = Dimensions.get('window');
const HEIGHT_MODAL = Dimensions.get('window').height * 0.78;
type Animation = any | Animated.Value;
import MapView, { Marker, PROVIDER_GOOGLE, MapViewProps, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { updateStateAction, clearStateRequest } from '../../actions/DeliveryActions';
import { RNNotificationBanner } from 'react-native-notification-banner';
import Icons from 'react-native-vector-icons/FontAwesome'
Icons.loadFont('AntDesign.ttf')
let copy = <Icons name="closecircleo" size={24} color="white" family={"AntDesign"} />;


const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / hp(35)
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

interface Props {
    navigation: any,
    auth: object,
    route: any,
    delivery: StateDelivery,
    bags: { isFetching: boolean, data: [any], success: boolean, error: boolean, message: string },
    home: { isFetching: boolean, data: [any] },
    mapView: any,
    updateState: (id: string, state: {}) => {},
    restart: () => {},
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
    order: object,
    markers: Array<any>,
    region: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
    },
    region2: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
    },
    coords: [{
        latitude: number,
        longitude: number,
    }]
}

class DetailAddres extends React.Component<Props, State> {

    private mapView: MapView
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
            markers: [],
            resume: false,
            order: {},
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            region2: {
                latitude: -33.4614786,
                longitude: -70.6514591,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            coords: [{
                latitude: 0,
                longitude: 0
            }],
        }
        this.getPosition()
    }

    filterData() {
        let result = this.props.bags.data.filter((row) => {
            return row._id === this.props.route.params.ordernumber
        })
        if (result.length) return result[0]
        return {}
    }

    async getPosition() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Acces to location",
                    message:
                        "Cool Photo App needs access to your location " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition((info) => {
                    var initialRegion = {
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                    let markers = [...this.state.markers]

                    let position = { "color": "red", "coordinate": { "latitude": info.coords.latitude, "longitude": info.coords.longitude }, "key": markers.length + 1 }
                    markers.push(position)
                    this.setState({ region: initialRegion, markers })
                });
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }


    decode = function (t: any, e: any) { for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) { a = null, h = 0, i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]) } return d = d.map(function (t) { return { latitude: t[0], longitude: t[1] } }) }

    componentDidMount() {
        const order = this.filterData()
        let markers = [...this.state.markers]

        let { lat, long } = order.orderNumber.client
        let position = { "color": "red", "coordinate": { "latitude": parseFloat(lat), "longitude": parseFloat(long) }, "key": markers.length + 1 }
        markers.push(position)
        this.setState({ order: order, markers })
        this.getPosition()
        // const mode = 'driving'; // 'walking';
        // const origin = '-33.4614786, ';
        // const destination = 'coords or address';
        // const APIKEY = 'AIzaSyBCVpGQaaEZFKNjk5OeqCaCSWLxWalHFjs';
        // const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=metro+Toesca&destination=metro+rondizzoni&key=' + APIKEY
        // // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

        // fetch(url)
        //     .then(response => response.json())
        //     .then(responseJson => {
        //         if (responseJson.routes.length) {
        //             console.log(responseJson.routes);
        //             this.setState({
        //                 coords: this.decode(responseJson.routes[0].overview_polyline.points) // definition below
        //             });
        //         }
        //     }).catch(e => { console.warn(e) });
    }

    goToDetail() {
        const order = this.filterData()
        this.props.navigation.navigate('Delivery', { order })
    }

    toggleModal() {

    }

    dissmissModal() {

    }

    productQuantity() {
        const order = this.filterData();
        let count = 0;
        order.bags.map((bag: any) => {
            count = count + bag.products.length
        })

        return count
    }

    onRegionChange(region: any) {
        this.setState({ region });
    }

    showMap() {
        const order = this.filterData()
        this.props.navigation.navigate('DetailMap', { order })
    }

    updateOrderState(state: string) {
        const order = this.filterData()
        this.props.updateState(order.orderNumber._id, state)

    }

    async goToInitialLocation() {
        await this.getPosition()
        let initialRegion = Object.assign({}, this.state.region);
        initialRegion["latitudeDelta"] = 0.04;
        initialRegion["longitudeDelta"] = 0.04;
        this.mapView.animateToRegion(initialRegion, 2000);
    }

    alertNoPeople() {
        Alert.alert(
            "Confirmación",
            "¿ Desea notificar la ausencia de moradores ?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.updateOrderState("7") }
            ],
            { cancelable: false }
        );
    }

    alertReject() {
        Alert.alert(
            "Confirmación",
            "¿ Desea notificar el rechazo de la orden ?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.updateOrderState("6") }
            ],
            { cancelable: false }
        );
    }


    render() {

        if (this.props.delivery.error) RNNotificationBanner.Show({
            title: "Error", subTitle: this.props.delivery.message, withIcon: true, icon: copy, tintColor: colors.highLightRed, onHide: () => {
                console.log("aqui3");
                this.props.restart()
            }
        })
        if (this.props.delivery.success) RNNotificationBanner.Show({
            title: "Mensaje", subTitle: this.props.delivery.message, withIcon: true, icon: copy, tintColor: colors.lightGreen, onHide: () => {
                this.props.restart()
                this.props.navigation.navigate('HomeAddres')
            }
        })


        // const order = this.filterData()
        const order = this.filterData()
        if (Object.keys(order).length) {
            this.props.navigation.setOptions({
                headerTitle: "Pedido Nº " + order.orderNumber.orderNumber,
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    marginRight: 50,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(65),
                },
            });

            const animatedStyle = {
                height: this.state.animationValue
            }

            return (
                <Center>
                    <View style={{ flex: 4 }}>
                        <View style={{ width: wp(100), flex: 1 }}>
                            <View style={{ flex: 1, margin: 15, shadowColor: "#676767" }}>
                                <MapView
                                    ref={(ref: MapView) => { this.mapView = ref }}
                                    provider={PROVIDER_GOOGLE}
                                    followsUserLocation={true}
                                    zoomEnabled={true}
                                    showsUserLocation={true}
                                    initialRegion={this.state.region}
                                    onMapReady={this.goToInitialLocation.bind(this)}
                                    style={[StyleSheet.absoluteFillObject]}>
                                    {this.state.markers.map(marker => (
                                        <Marker
                                            key={marker.key}
                                            coordinate={marker.coordinate}
                                            pinColor={marker.color}
                                        />
                                    ))}
                                </MapView>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', width: wp(100) }}>
                            <TouchableOpacity onPress={() => this.showMap()} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>Ver mapa</Text>
                                <Icon name="location-on" color={colors.darkYellow} size={Size(89)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 2, width: wp(100) }}>
                        <View style={{ flex: 1, marginLeft: 20, justifyContent: 'flex-start' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.bodyContainerScrollViewContainerInfoSectionText, { fontWeight: 'bold' }]}>Cliente: </Text>
                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>{order.orderNumber.client.name} </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.bodyContainerScrollViewContainerInfoSectionText, { fontWeight: 'bold' }]}>Dirección: </Text>
                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>{order.orderNumber.client.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.bodyContainerScrollViewContainerInfoSectionText, { fontWeight: 'bold' }]}>Tercero que recibe: </Text>
                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>{order.orderNumber.client.third}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.bodyContainerScrollViewContainerInfoSectionText, { fontWeight: 'bold' }]}>Comentarios: </Text>
                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>{order.orderNumber.client.comment}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, width: wp(100) }}>
                        <View style={styles.bodyContainerScrollViewContainerButtonsSection}>
                            <View style={styles.bodyContainerScrollViewContainerButtonsSectionButton}>
                                <TouchableOpacity onPress={() => { this.alertNoPeople() }}>
                                    <IconChange name="deleteusergroup" color={colors.lightgray} size={Size(80)} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyContainerScrollViewContainerButtonsSectionButton}>
                                <TouchableOpacity onPress={() => { this.alertReject() }}>
                                    <IconBag name="bag" color={colors.lightgray} size={Size(80)} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyContainerScrollViewContainerButtonsSectionButton}>
                                <TouchableOpacity onPress={() => { null }}>
                                    <Icon name="phone" color={colors.lightgray} size={Size(80)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            <View style={styles.resumeHeaderInfo}>
                                <CustomButton onPress={() => this.goToDetail()} size={"m"}>
                                    <Text style={{
                                        fontFamily: fonts.primaryFontTitle,
                                        fontSize: RFValue(Size(56)),
                                        color: colors.white
                                    }}>Entregar Bultos</Text>
                                </CustomButton>
                                <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext} />
                            </View>
                        }
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
    bodyContainerScrollViewContainerInfoSectionText: {
        fontSize: RFValue(16),
        fontFamily: fonts.primaryFont
    },
    resumeBodyInfoText: {
        fontFamily: fonts.primaryFont,
        fontSize: RFValue(21)
    },
    resumeHeaderInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35
    },
    bodyContainerScrollViewContainerButtonsSectionButtonNext: {
        flex: 1,
        marginTop: 30,
        marginBottom: 20
    },
    bodyContainerScrollViewContainerButtonsSection: {
        flex: 1,
        flexDirection: 'row',
        // width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: Size(50)
    },
    bodyContainerScrollViewContainerButtonsSectionButton: {
        alignItems: "center",
        justifyContent: 'center',
        width: wp(14),
        height: hp(6),
        borderRadius: Size(15),
        marginLeft: 10,
        marginRight: 6,
        backgroundColor: colors.lightgrayDisabled,
        shadowColor: "#676767",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3,
    },
});

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    bags: state.bags,
    delivery: state.delivery,
})

const mapDispatchToProps = (dispatch: any) => ({

    updateState: (id: string, state: string) => dispatch(updateStateAction(id, state)),
    restart: () => dispatch(clearStateRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailAddres)


