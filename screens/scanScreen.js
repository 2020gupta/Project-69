import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions'
export default class scanScreen extends React.Component{
constructor(){
    super()
    this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'
    }
      
}
getcameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions:status==='granted',
        buttonState:'clicked',
        scanned:false
    })
    }
    handleBarCodeScanned=async({type,data})=>{
        const {buttonState}=this.state
        if(buttonState==="BookId"){
            this.setState({
                scanned:true,
                scannedBookId:data,
                buttonState:'normal'
            })
        }
    }
render(){
const hasCameraPermissions=this.state.hasCameraPermissions
const scanned=this.state.scanned
const buttonState=this.state.buttonState
if(buttonState==="clicked"&&hasCameraPermissions){
return(
    <BarCodeScanner
    onBarCodeScanned={scanned?undefine:this.handleBarCodeScanned}
    style={StyleSheet.absoluteFillObject}/>
)
}
    return(
        <View style={styles.container}>
            <Text style={styles.displayText}>
                {hasCameraPermissions===true?this.state.scannedData:"request Camera Permission"}
            </Text>
            <TouchableOpacity
            onPress={this.getcameraPermissions}
            style={styles.scanButton}
            title="Bar Code Scanner">
<Text style={styles.buttonText}>scan qr code</Text>
            </TouchableOpacity>
        </View>
    )
}
}