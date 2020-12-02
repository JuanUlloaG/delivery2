import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type ProfileParamList = {
    Profile: undefined;
    Perfil: undefined;
}

export type SearchNavProps<T extends keyof ProfileParamList> = {
    navigation: StackNavigationProp<ProfileParamList, T>;
    route: RouteProp<ProfileParamList, T>;
}