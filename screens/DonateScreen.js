import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput , Button, Alert} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBjH8S3Ek6H1vzDI7qJjOT-fAazGDH6PtE",
  authDomain: "donategp-myiium.firebaseapp.com",
  databaseURL: "https://donategp-myiium.firebaseio.com",
  projectId: "donategp-myiium",
  storageBucket: "donategp-myiium.appspot.com",
  messagingSenderId: "803612925860",
  appId: "1:803612925860:web:ed243f3f96ab5c66"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Donate',
  };

  constructor(props) {
    super(props)
    this.state = {
      DonateValue: '',
      DonateValue: [],
      selectCatDropdown: {},
      selectRcpDropDown: {},
    }
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("DonateValue")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initDonateValue = [];
          Object
            .keys(data)
            .forEach(DonateValue => initDonateValue.push(data[DonateValue]));
          this.setState({
            DonateValue: initDonateValue
          })
        }
      });

      firebase
      .database()
      .ref()
      .child("DonateValue")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            DonateValue: [data, ...prevState.DonateValue]
          }))
        }
      })
  }

  addItem () {
    if (!this.state.DonateValue) return;

    const newDonateValue = firebase.database().ref()
                          .child("DonateValue")
                          .push();
    newDonateValue.set(this.state.DonateValue, () => this.setState({DonateValue: ''}))
  }

  handleChange1 = (selectCatDropDown) => {
    this.setState({selectCatDropDown});
  };

  handleChange2 = (selectCatDropDown) => {
    this.setState({selectRcpDropDown: selectCatDropDown})
  }
 
  GetValueFunction = () =>{
    const { DonateValue }  = this.state ;
    Alert.alert("You have received reward points:", DonateValue)
  }

  loginAttempt(){
   
  }
      
  render() {
    let catDropDown = [{
      value: 'Local', label: 'Local'
    }, {
      value: 'International', label: 'International'
    }, /*{
      value: 'Individuals & family',
    },{
    value: 'Startup',
    }*/
    ];

  let rcpDropDown = [{
    value: 'Aman Palestin', label: 'Aman Palestin', link: 'Local'
  }, {
    value: 'Muslim Voluntary Malaysia', label: 'Muslim Voluntary Malaysia', link: 'Local'
  }, {
    value: 'UN', label: 'UN', link: 'International'
  },
  ];

  const filteredData = rcpDropDown.filter(rcpDropDown => rcpDropDown.link === this.state.selectCatDropdown.value);

    return (
      <ScrollView style={styles.container}>
        <Text style={{marginTop:70,alignSelf:'center', fontSize:15 }}>Recipient Category</Text>
        <Dropdown style={{width:200, marginTop:10}}
          value={this.state.selectCatDropdown.value}
          onChange={this.handleChange1}
          data={ catDropDown}
        />  

        <Text style={{marginTop:40,alignSelf:'center', fontSize:15 }}>Recipient Name</Text>
        <Dropdown style={{width:200, marginTop:10}}
          value={this.state.selectRcpDropDown.value}
          onChange={this.handleChange2}
          options={ filteredData}
        />
        
        <Text style={{marginTop:30,alignSelf:'center', fontSize:15 }}>Amount (RM)</Text>
        <TextInput  style={{ marginTop:10 ,width:200, alignSelf:'center', borderBottomWidth:1, borderBottomColor:'grey'}} 
            onChangeText={DonateValue => this.setState({DonateValue})} 
            placeholder='RM 0.00'/>
        <Button style={{color: '#2E86C1', marginTop: 30, padding: 10}} 
          onPress={() => {this.GetValueFunction(); this.addItem();}} 
          title='Donate'/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});