import React, { useState, useRef, useEffect } from "react"
import { TouchableOpacity, Text, Button } from "react-native"
import { HomeNavProps, HomeParamList } from "./types/HomeParamaList";
import { Center } from "./components/Center";
import { TypedNavigator, StackNavigationState } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import { SearchParamList } from "./types/SearchParamaList";

function Detail({ navigation, route }: HomeNavProps<'Edit'>) {
    if (route) {
        return (
            <Center>
                <Text>detail for: {route.params.name} </Text>
                <Button title="Edit" onPress={() => {
                    navigation.navigate("Edit", {
                        name: route.params.name
                    })
                }} />
            </Center>
        )
    } else {
        return (<Center></Center>)
    }

}

function Edit({ navigation, route }: HomeNavProps<'Edit'>) {
    if (route) {
        const [formState, setformState] = useState()
        const submit = useRef(() => { });

        submit.current = () => {
            // api call whit edit state
            // apiCall(formState)
            navigation.goBack()
        }

        useEffect(() => {
            navigation.setParams({ submit })
        }, [])


        return (
            <Center>
                <Text>Edit for: {route.params.name} </Text>
            </Center>
        )
    } else {
        return (
            <Center>
                <Text></Text>
            </Center>
        )
    }


}


export const itemRoutes = (
    Stack:
        TypedNavigator<HomeParamList | SearchParamList, StackNavigationState, StackNavigationOptions, StackNavigationEventMap, any>) => {
    return (
        <>
            <Stack.Screen name='Detail' component={Detail} options={({ route }) => ({ headerTitle: route ? route.params.name : "" })} />
            <Stack.Screen name='Edit' component={Edit} options={
                ({ route }) => (
                    {
                        headerTitle: route ? route.params.name : "",
                        headerRight: () => (
                            <TouchableOpacity onPress={() => { route.params.submit?.current() }}>
                                <Text>Done</Text>
                            </TouchableOpacity>
                        )
                    }
                )} />
        </>
    )
}