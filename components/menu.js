import React from 'react'
import 'react-native-gesture-handler';
import {Consumer} from '../context'
import Interface from './Interface'
import Drawers from './drawer'
import Comment from './comment'
import { createStackNavigator } from '@react-navigation/stack';
const Stack=createStackNavigator()

export default  Menu=()=> {
   
            return (
        <Consumer>
                {value=>{
            const {issingin}=value
            return(
                <>
                     { issingin &&
                               ( 
                               <>
                               <Stack.Navigator initialRouteName="Home"
                                            screenOptions={{
                                                headerTintColor: 'white',
                                                headerStyle: { backgroundColor: 'tomato' },
                                                 }}>
                                            <Stack.Screen name="Interaction" component={Drawers} />
                                            <Stack.Screen name="Comment" component={Comment} />
                                </Stack.Navigator>
                                </>
                                )
                     }
                      { !issingin &&
                               ( 
                                   <Interface/>
                                )
                     }

                </>
                    )
                }}
        </Consumer>
    )
}

