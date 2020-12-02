import React from 'react'
import { Center } from '../../components/Center';
import { Text } from 'react-native';

interface EditProps {

}

export const Edit: React.FC<EditProps> = ({ }) => {
    return (
        <Center>
            <Text>Edit Screen</Text>
        </Center>
    );
}