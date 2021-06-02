import React, { Component } from 'react'
import * as ImagePicker from "react-native-image-picker"
import ImgToBase64 from 'react-native-image-base64';
import {AsyncStorage} from 'react-native';


const ContextApi=React.createContext()

const api="https://api-mobileandroid.herokuapp.com/"

class Context extends Component {

    state={
        password:'',
        email:'',
        name:'',
        image:'',
        tags:'',
        message:'',
        title:'',
        currentuser:[],
        imagepost:'',
        isregister:true,
        issingin:false,
        loading:false,
        posts:[],
        getcomment:[],
        idcomment:''
    }

    
    collect =async()=>{
        const posts=await fetch(api+'posts/getposts',{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
                }
        })
        response=await posts.json()
        this.setState({
            posts:response
        })
    }
    componentDidMount=async()=>{
   const user = await AsyncStorage.getItem('profile')
    if(user){
        this.setState({
            currentuser:[JSON.parse(user)],
            issingin:true
        })
    }
    this.collect()
    }
    event=()=>{
    this.setState({
        isregister:!this.state.isregister
        })
    }
    register=async()=>{
        this.setState({
            loading:true
            })
       await fetch(api+'users/signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: this.state.password,
                email: this.state.email,
                firstname:this.state.name.split('')[0],
                lastname:this.state.name.split('')[1],
                image:this.state.image,
                confirmpassword:this.state.password,
                imageUrl:this.state.image
            })
          })
        this.setState({
            email:'',
            password:'',
            name:'',
            image:'',
            isregister:true,
            loading:false
            })
    }
    login=async()=>{
        this.setState({
            loading:true
        })
        try {
            const data= await fetch(api+'users/signin', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                    },
                body: JSON.stringify({
                    password: this.state.password,
                    email: this.state.email,
                     })
                 })
        const response=await data.json()
        if (data.status==400){
            alert("Invalid mdp or email try again")
            this.setState({
                email:'',
                password:'',
                image:'',
                loading:false
                })
        }else{
            this.setState({
                currentuser:[response],
                email:'',
                password:'',
                image:'',
                issingin:true,
                loading:false
                })
        await AsyncStorage.setItem('profile',JSON.stringify(response))
        }
        } catch (error) {
            alert("Invalid connection try again")
        }
    
    }
    setemail=(text)=>{
        this.setState({
            email:text
        })
    }
    setpassword=(text)=>{
        this.setState({
            password:text
        })
    }
    setname=(text)=>{
        this.setState({
            name:text
        })
    }
    settitle=(text)=>{
        this.setState({
            title:text
        })
    }
    settags=(text)=>{
        this.setState({
            tags:text
        })
    }
    setmessage=(text)=>{
        this.setState({
            message:text
        })
    }
    handleimage=()=>{
        const Option={}
         ImagePicker.launchImageLibrary(Option,response=>{
            ImgToBase64.getBase64String(response.uri)
            .then(base64String => this.setState({image:"data:image/jpeg;base64,"+base64String}))
            .catch(() => alert("Please select an image"));
        })
    }
    handleimagepost=()=>{
        const Option={}
         ImagePicker.launchImageLibrary(Option,response=>{
            ImgToBase64.getBase64String(response.uri)
            .then(base64String => this.setState({imagepost:"data:image/jpeg;base64,"+base64String}))
            .catch(() => alert("Please select an image"));
        })
    }
    logout=async()=>{
      await AsyncStorage.clear()
      this.setState({
       issingin:false
      })
    }
    clear=()=>{
        this.setState({
            tags:'',
            message:'',
            title:'',
            imagepost:''

        })
    }
    post=async(navigation)=>{
        const user=JSON.parse(await AsyncStorage.getItem('profile'))
        try {
            const data= await fetch(api+'posts/createdpost',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                    },
                body: JSON.stringify({
                    creator:user?.result._id ,
                    title:this.state.title,
                    message:this.state.message,
                    tags:[this.state.tags],
                    selectedfile:this.state.imagepost,
                    name:user?.result.name
                     })
                 })
        if (data.status==400){
            alert("error try again")
        }else{
            this.collect()
            navigation.navigate('Home')
        }
        } catch (error) {
            alert("Invalid connection try again")
        }
    }
    comment=async (id,navigation,value=true)=>{
        this.setState({
            getcomment:[],
            loading:true,
            idcomment:id
        })
        if (value){
            navigation.navigate('Comment')
        }
       
        try {
            const data= await fetch(api+'comment/getcomment/'+id,{
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                    }
                 })
            const response= await data.json()
        if (data.status==400){
            alert("error try again")
        }else{
            this.setState({
                getcomment:response,
                loading:false
            })
          
        }
        } catch (error) {
            alert("Invalid connection try again")
        }
    }
    remove=async(id)=>{
        try {
            const data= await fetch(api+'posts/delete/'+id,{
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                    }
                })
      
                if (data.status==400){
                    alert("error try again")
                }else{
                    this.collect()
                }
       
        } catch (error) {
            alert("Invalid connection try again")
        }
    }
    like=async(id)=>{
        
    try {
        const data= await fetch(api+'posts/likepost/'+id,{
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
                },
            body: JSON.stringify({
               userid:this.state.currentuser[0].result._id
                 })
             })
    if (data.status==400){
        alert("error try again")
    }else{
        this.collect()
    }
    } catch (error) {
        alert("Invalid connection try again")
    }
    }
    postcomment=async(navigation)=>{

        this.setState({
            getcomment:[],
            loading:true
        })
        try {
                 const data= await fetch(api+'comment/postcomment', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({
                        comment:this.state.message,
                        idphoto:this.state.idcomment,
                        iduser:this.state.currentuser[0].result._id
                         })
                     })
               
        if (data.status==400){
            alert("error try again")
        }else{
            this.setState({
                loading:false
            },()=> this.comment(this.state.idcomment,navigation,value=false))
           
        }
        } catch (error) {
            alert("Invalid connection try again")
        }
    }

    render() {
        return (
            <ContextApi.Provider value={{...this.state,login:this.login,register:this.register,setpassword:this.setpassword,
                setname:this.setname,setemail:this.setemail,handleimage:this.handleimage,logout:this.logout,
                setmessage: this.setmessage,postcomment:this.postcomment,like:this.like,remove:this.remove,comment:this.comment,event:this.event,settitle:this.settitle,post:this.post,settags:this.settags,clear:this.clear,handleimagepost:this.handleimagepost}}>
                {this.props.children}
            </ContextApi.Provider>
        )
    }
}

const Consumer=ContextApi.Consumer

export  {Context,Consumer}
