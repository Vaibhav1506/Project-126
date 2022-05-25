import * as React from 'react';
import {Button, View, Platform, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class Image_Picker extends React.Component{
state = {
    image: null,
}

getPermission = async() => {
    if(Platform.OS !== "web"){
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(status !== "granted"){
            Alert.alert("Please give permission to your camera")
        }
    }
}

componentDidMount(){
    this.getPermission()
}

pickImage = async() => {
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        if(!result.cancelled){
            this.setState({
                image: result.data
            })
        console.log(result.uri)
        this.uploadImage(result.uri)
            }    
        }
    catch(e){
        console.log(e)
    }    
}

uploadImage = async(uri) => {
    const data = new FormData()
    let fileName = uri.split("/")[uri.split("/").length - 1]
    let type  = `Image/${uri.split(".")}[uri.split("/").length - 1]`
    const filesToUpload = {
        uri: uri,
        name: fileName,
        type: type,
    }
}

render(){

    let {image} = this.state

    return(
    <View style = {{alignItems : "center"}}>

    <Button title = "Pick your Image here"
    onPress = {this.pickImage}
    />

    </View>
    )
}
}