import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type SearchParamList = {
    Search: undefined;
    Buscar: undefined;
    Detalle: {
        name: string
    };
    Detail: {
        name: string
    };
    Edit: {
        name: string,
        submit?: React.MutableRefObject<() => void>
    };
}

export type FetchSearchSuccess = {
    type: 'FETCH_SEARCH_SUCCESS';
    data: { data: {}, message: string };
}

export type FetchSearchFail = {
    type: 'FETCHING_SEARCH_FAIL';
    data: { data: {}, message: string };
}

export type FetchSearch = {
    type: 'FETCHING_SEARCH';
}


export type SearchNavProps<T extends keyof SearchParamList> = {
    navigation: StackNavigationProp<SearchParamList, T>;
    route: RouteProp<SearchParamList, T>;
}