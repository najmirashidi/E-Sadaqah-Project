import React from 'react';
import { ScrollView, StyleSheet ,Platform, Text, Button, TextInput, View, Image} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
//import * as firebase from 'firebase';
//import AppNavigator from './navigation/AppNavigator';
//import {RkButton} from 'react-native-ui-kitten';

export default class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          user_id_sys : ['tu1','tu2','tu3'],
          user_id : ["hakim","adam","faisal"],
          user_name : ["hakim hassan", "adam zulk", "faisal farhan"],
          user_pw : ["0000","1111","2222"],
          arrayLength : 0,
          myCount : 0,
          //user_id : "hakim",
          //user_name : "hakim hassan",
          //user_pw : "0000",
          user_id_input : null,
          user_name_input : null,
          user_pw_input : null,

          user_access : false,
      };
  }



  static navigationOptions = {
    //Setting the header of the screen
    title: 'First Page',
  };

  loginAttempt = () => {const { navigate } = this.props.navigation;
   /* 
    this.state.user_id.map(){
        this.state.myCount++;
    }
    this.setState({arrayLength : Number(this.state.myCount)});
    
    this.setState({arrayLength: })
*/
    for(i=0; i<this.state.user_id.length; i++){
        if(this.state.user_id_input == this.state.user_id[i] 
            && this.state.user_pw_input == this.state.user_pw[i]){
                
                this.setState({user_access : Boolean(true)});
                this.setState({user_id_sys : String(this.state.user_id_sys[i])});
                /*navigate('HomeScreen', {
                  JSON_ListView_Clicked_Item: this.state.user_id_sys[i],
                })*/
                this.props.navigation.navigate('HomeScreen', {
                  user_id_sys: this.state.user_id_sys });

                break;
            }
        else{
            this.setState({user_access : Boolean(false)});
        }
        }}
    /* 
    for(i=0; i<this.state.arrayLength && (this.user_access = true); i++){
    this.setState({
        user_access:
        Boolean(
            this.state.user_id_input == this.state.user_id[i] 
            && this.state.user_pw_input == this.state.user_pw[i]
            )
    },
    () => {});
    }};
   
////////////////////////////
  loginAttempt (){
    if(this.state.user_id_input == this.state.user_id 
        && this.state.user_pw_input == this.state.user_pw){
            this.setState({user_access:Boolean(true)})
      }
    else{
    }
  }
  /////////////////
  */
  /*
  {
    if(this.state.user_id_input == this.state.user_id 
      && this.state.user_pw_input == this.state.user_pw){
          
    };
  this.setState({ 
      user_access: 
      Boolean(this.state.user_id_input == this.state.user_id && this.state.user_pw_input == this.state.user_pw)
  },
  //this.setState({user_access: Boolean()},
  () => {user_access = true;});
  };
/////////////////////////
Const firebaseConfig = {
  apiKey: "<YOUR-API-KEY>",
  authDomain: "<YOUR-AUTH-DOMAIN>",
  databaseURL: "<YOUR-DATABASE-URL>",
  storageBucket: "<YOUR-STORAGE-BUCKET>"
};
firebase.initializeApp(firebaseConfig);
*/


  render() {
    
    return (
      
      <ScrollView style={styles.container}>
        <Text></Text><Text></Text><Text></Text>
        
        <Image
              source={
                __DEV__
                  ? require('../assets/images/s-logo.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          
          
        <TextInput  style={{ marginTop:100 ,width:200, alignSelf:'center', borderBottomWidth:1, borderBottomColor:'grey'}} onChangeText={(user_id_input) =>
            this.setState({user_id_input})} placeholder='Email/Username'/>
            <Text>  </Text>
            <TextInput  style={{width:200, alignSelf:'center', borderBottomWidth:1, borderBottomColor:'grey'}} onChangeText={(user_pw_input) =>
            this.setState({user_pw_input})} placeholder='Insert your pw'/>
            <Text>  </Text>
            <View Style={{width:"50%"}} ><Button style={{color: '#2E86C1', marginTop: 10, padding: 10}} onPress={this.loginAttempt} title='Login'/></View>
            <Text style={{alignSelf:'center', marginTop:10}} >Don't have account yet?</Text>
            <Text style={{color:'#2E86C1',alignSelf:'center'}}  >Sign Up</Text>
            <Text style={{alignSelf:'center', marginTop:30}} >Sign up / Login faster</Text>
            <View style={{alignSelf:'center', flexDirection:'row'}}>
            <Image source={require('../assets/images/fb-logo.png')} style={{width:50,height:50}}  />
            <Image source={require('../assets/images/google-logo.png')} style={{width:50,height:50}}  />
            </View>
 
            
           <Text style={{fontStyle:'italic', fontSize:10, alignSelf:'center', marginBottom:100  }}>User acccess : {this.state.user_access.toString()}</Text>
            
      </ScrollView>
      /*
                 <Text></Text><Text></Text>
                 <Text style={{fontWeight:'bold', fontSize:20}}>User_id_sys : {this.state.user_id_sys}</Text>
            <Text style={{fontWeight:'bold', fontSize:20}}>array length : {this.state.user_id.length}</Text>
            <Text style={{fontWeight:'bold', fontSize:20}}>array length : {this.state.arrayLength}</Text>
            <Text style={{fontWeight:'bold', fontSize:20}}>User IDios : {this.state.user_id}</Text>
            <Text style={{fontWeight:'bold', fontSize:20}}>User ID Input : {this.state.user_id_input}</Text>
            <Text style={{fontWeight:'bold', fontSize:20}}>User PW : {this.state.user_pw}</Text>
            <Text style={{fontWeight:'bold', fontSize:20}}>User PW Input : {this.state.user_pw_input}</Text>
      */
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexBasis:'column',
    //backgroundColor: 'powderblue',
    alignContent:'center',
    
   // alignItems:'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    flex:1,
    width: 100,
    height: 100,
    //resizeMode: 'contain',
    marginTop: 3,
    //marginLeft:130,
    //marginLeft: -10,
    alignSelf:'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent:'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
/*
import React from 'react';
import { StyleSheet,Alert, Text, View, Button, TextInput, Image, URL } from 'react-native';
export default class App extends React.Component {
    constructor(){
      super();
      this.state = {
      carPrice: 0,
      carDP: 0,
      loanPeriod:0,
      loanInterest:0,
      
      monthlyPayment:0
      };
    }
      calculateMP = () => {
        this.setState({monthlyPayment: 
          Number( 
            ((this.state.carPrice-this.state.carDP)
            +((this.state.loanInterest/100)
            *(this.state.carPrice-this.state.carDP)
            *this.state.loanPeriod))
            /(this.state.loanPeriod*12) )
            .toFixed(1)},
        () => {
          
});
        };
    
    render() {
      return (
        
    
  
       <View style={{
         flex:2000, 
         flexDirection: 'column', 
         alignItems: "center", 
         justifyContent: 'center', 
         backgroundColor:'#FFF0F5' ,
         marginLeft:70,
         marginRight:70,
         marginTop:100,
         marginBottom:100
         }}>
      
        
       <Text style={{fontSize:30, fontWeight:"bold", color:'#800000', alignItems:'center'}}>Car Loan Calculator</Text>
       <Text></Text><Text></Text><Text></Text><Text></Text>
      <Text style={{ alignContent:'center'}}> </Text>
      <TextInput  onChangeText={(carPrice) =>
      this.setState({carPrice})} placeholder='       Insert car price (RM)       '/>
      <Text></Text><Text></Text>
      <TextInput onChangeText={(carDP) => 
      this.setState({carDP})} placeholder='       Insert deposit (RM)         '/>
      <Text></Text><Text></Text>
      <TextInput onChangeText={(loanPeriod) => this.setState({loanPeriod})} placeholder='   Insert loan period (Year)   '/>
      <Text></Text><Text></Text>
      <TextInput onChangeText={(loanInterest) => 
      this.setState({loanInterest})} placeholder='   Insert loan interest (%)   '/>
      <Text></Text><Text></Text>
     
      <Button color="#841584" onPress={this.calculateMP} title='Calculate'/>
      <Text></Text><Text></Text>
      <Text style={{fontWeight:'bold', fontSize:20}}>Monthly Payment: RM {this.state.monthlyPayment}</Text>
      </View>
      
      );
      }
      }
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/