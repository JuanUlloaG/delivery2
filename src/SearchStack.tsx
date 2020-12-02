import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SearchParamList, SearchNavProps } from './types/SearchParamaList';
import { Center } from './components/Center';
import { Text } from 'react-native';
import { itemRoutes } from './ItemRoutes';

interface SearchStackProps {

}

const Stack = createStackNavigator<SearchParamList>()

function Search({ navigation, route }: SearchNavProps<'Search'>) {
    return (
        <Center>
            <Text>Hey this is my Searcdsdsh</Text>
        </Center>
    )
}

export const SearchStack: React.FC<SearchStackProps> = ({}) => {
        return (
             <Stack.Navigator initialRouteName='Search'>
                 <Stack.Screen name="Search" component={Search} />
                 {itemRoutes(Stack)}
             </Stack.Navigator>   
        );
}