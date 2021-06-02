import React from 'react'
import { View } from 'react-native'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {Consumer} from '../context'
import { useNavigation } from '@react-navigation/native';

export default function Posts({posts}) {
    const navigation = useNavigation();

    return (
        <Consumer>
            {value=>{
                const {like,remove,comment,currentuser}=value
                const existinglike=posts.likecount.filter(res=>res==currentuser[0].result._id).length
                return(
                    <>
                    <Card>
                                             <CardImage 
                                             source={{uri:posts.selectedfile}} 
                                             title={posts.title}
                                             />
                                             <CardTitle
                                             subtitle={posts.message}
         
                                             />
                                             <CardContent text={posts.tags} />
                                             <CardAction 
                                             separator={true} 
                                             inColumn={false}>
                                             <View style={{paddingLeft:0}}>
                                             <CardButton
                                                 onPress={()=>like(posts._id)}
                                                 title={existinglike!=0?"Dislike":"Like"}
                                                 color="#FEB557"
                                             />
                                             </View>
                                             <View style={{paddingLeft:(currentuser[0].result._id!=posts.creator)?220:60}}>
                                             <CardButton
                                                 onPress={() => comment(posts._id,navigation)}
                                                 title="Comment"
                                                 color="#FEB557"
                                                 
                                             />
                                             </View>
                                             <View style={{paddingLeft:70}}>
                                            {currentuser[0].result._id==posts.creator &&(
                                                <CardButton
                                                 onPress={() => remove(posts._id)}
                                                 title="Delete"
                                                 color="#FEB557"
                                                 
                                             />)}
                                             </View>
                                             </CardAction>
                      </Card>
                      </>
                )
            }}
        </Consumer>
       
    )
}
