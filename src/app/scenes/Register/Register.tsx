import React from "react"
import { AuthNavProps } from "src/types/AuthParamLIst"
import { Center } from "../../components/Center"
import { Text, Button } from "react-native"

export function Register({ navigation, route }: AuthNavProps<'Register'>) {
    return (
        <Center>
            <Text>route name: {route.name}</Text>
            <Button title="go to login" onPress={() => {
                navigation.navigate("Login")
            }} />
        </Center>
    )
}