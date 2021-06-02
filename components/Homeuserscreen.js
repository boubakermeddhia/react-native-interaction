import React from 'react'
import Posts from './posts'
import {Consumer} from '../context'
import  {ScrollView,SafeAreaView, View} from 'react-native'
export default function Homeuserscreen() {
    return (
        <Consumer>
            { value=>{
                    const {posts}=value
                    return(
                        <>
                        <SafeAreaView>
                         <ScrollView >
                             <View style={{height:15}}/>
                        {posts.map(res=>{
                            return ( <Posts key={res._id} posts={res}/>)
                        })}
                        </ScrollView>
                        </SafeAreaView>
                      </>
                    )
                          
            }
            }
        </Consumer>
    )
}



