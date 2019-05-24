import { ImagePicker, Permissions } from 'expo';
import React from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, View, ScrollView, TextInput, FlatList } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ExpoLinksView } from '@expo/samples';
import * as firebase from 'firebase';
import {Constants} from 'expo';


const firebaseConfig = {
  apiKey: "AIzaSyBjH8S3Ek6H1vzDI7qJjOT-fAazGDH6PtE",
  authDomain: "donategp-myiium.firebaseapp.com",
  databaseURL: "https://donategp-myiium.firebaseio.com",
  projectId: "donategp-myiium",
  storageBucket: "donategp-myiium.appspot.com",
  messagingSenderId: "803612925860",
  appId: "1:803612925860:web:ed243f3f96ab5c66"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default class App extends React.Component {
    state = {
        image: null,
        uploading: false,
    };

    uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }

  constructor(props) {
    super(props)

    this.state = {
      message: '',
      receipt: []
    }

    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("receipt")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));
          this.setState({
            messages: initMessages
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("receipt")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            messages: [data, ...prevState.messages]
          }))
        }
      })

  }

  addItem () {
    if (!this.state.message) return;

    const newMessage = firebase.database().ref()
                          .child("receipt")
                          .push();
    newMessage.set(this.state.message, () => this.setState({message: ''}))
  }


    render() {

      let gateDropDown = [{
      value: 'Maybank (Internet Banking)',
    }, {
      value: 'CIMB (Internet Banking)',
    }, {
      value: 'Credit Card / Master Card',
    },{
    value: 'PayPal',
    }
  ];

        let {
            image
        } = this.state;

        return (
            <View style={styles.container}>

                <ScrollView style={styles.scrollView} contentContainerStyle={{alignContent: 'undefined', alignItems: 'stretch', alignSelf: 'stretch'}}>
       
                <Text style={{marginTop:70,alignSelf:'center', fontSize:15 }}>Reload using</Text>
        
                 <Dropdown style={{width:200, marginTop:10}}
      
                   data={ gateDropDown}
                  />
               <Text style={{marginTop:30,alignSelf:'center', fontSize:15 }}>Amount                   (RM)</Text>
               <TextInput  style={{ marginTop:10 ,width:200, alignSelf:'center',                      borderBottomWidth:1, borderBottomColor:'grey'}} onChangeText={                         (user_id_input) =>
               this.setState({user_id_input})} placeholder='RM 0.00'/>
               <Button onPress={this._pickImage} title="Image from gallery" />
               <Button onPress={this._takePhoto} title="Image from camera" />
               <Button style={{color: '#2E86C1', marginTop: 30, padding: 10}} onPress=                {this.loginAttempt} title='Reload'/>

                {this._maybeRenderImage()}
                {this._maybeRenderUploadingOverlay()}

                <View style={styles.msgBox}>
            <TextInput placeholder='Transaction'
              value={this.state.message}
              onChangeText={(text) => this.setState({message: text})}
              style={styles.txtInput}/>
            <Button title='Upload Receipt' onPress={this.addItem}/>
          </View>
          <FlatList data={this.state.messages}
            renderItem={
              ({item}) => 
              <View style={styles.listItemContainer}>
                <Text style={styles.listItem}>
                  {item}
                </Text>
              </View>
            }
            />
              </ScrollView>
    
              </View>
        
        );
        
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let {
            image
        } = this.state;

        if (!image) {
            return;
        }

        return (
            <View style={styles.maybeRenderContainer}>
                <View style={styles.maybeRenderImageContainer}>
                    <Image source={{ uri: image }} style={styles.maybeRenderImage} />
                </View>

                <Text style={styles.maybeRenderImageText}>
                    {image}
                </Text>
            </View>
        );
    };

    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            const pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true
            });


            // This displays the image directly from device data 
            // 
            // this.setState({
            //     image: pickerResult.uri
            // }); 


            // This uploads the image and then displays it via it's URL
            // 
            this._handleImagePicked(pickerResult);
        }
    };

    _pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
            });


            // This displays the image directly from device data
            // 
            // this.setState({
            //     image: pickerResult.uri
            // });


            // This uploads the image and then displays it via it's URL
            // 
            this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri);
                uploadResult = await uploadResponse.json();

                this.setState({
                    image: uploadResult.location
                });
            }
        } catch (e) {
            console.log({ uploadResponse });
            console.log({ uploadResult });
            console.log({ e });
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };
}

async function uploadImageAsync(uri) {
    let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //     apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //     apiUrl = `http://localhost:3000/upload`
    // }

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        marginTop: Constants.statusBarHeight
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'space-between',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
    },
    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 250,
        width: 250,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
     msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff'
  },
  txtInput: {
    flex: 1
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 1,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10
  }
});