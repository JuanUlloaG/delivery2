import { Platform } from "react-native"

const fonts = {
    primaryFontTitle: Platform.OS == "android" ? 'BogleWeb-Bold' : 'system font',
    primaryFont: Platform.OS == "android" ? 'BogleWeb-Regular' : 'system font',
    buttonFont: Platform.OS == "android" ? 'AvenirNextBold' : 'system font'
}

export default fonts