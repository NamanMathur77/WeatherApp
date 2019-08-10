import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Alert, View,Keyboard, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import {Form, Item,Label,Button, Input, Card, CardItem, Content} from 'native-base';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      empty: true,
      input: undefined,
      input_cont: undefined,
      temperature: undefined,
      min_temp: undefined,
      max_temp: undefined,
      city: undefined,
      wind: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
    };
  }

  getCityInfo=async ()=>{
    if(
      this.state.input !==undefined &&
      this.state.input_cont !== undefined
    ){
    const target = this.state.input;
    const count= this.state.input_cont;
    const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${target},$(count)&units=metric&APPID=9f7b8a03fb95fa0d0d402cf8f7ff42f4`)
    const response = await api_call.json();
    console.log(response);
    this.setState({
      empty:false,
      temperature: response.main.temp,
      min_temp: response.main.temp_min,
      max_temp: response.main.temp_max,
      city: response.name,
      country: response.sys.country,
      humidity: response.main.humidity,
      wind: response.wind.speed,
      description: response.weather[0].description,
    })
  }
  else{
    Alert.alert("All fields are required !!!");
  }
  };
  render(){
    if(this.state.empty==true){
      return (
        <TouchableWithoutFeedback
        onPress={()=>{
          Keyboard.dismiss()
        }}>
        <ImageBackground
        source={{uri: 'https://raw.githubusercontent.com/amandeepmittal/weather-cards/master/assets/showers.jpeg'}} 
        style={styles.container}>
          <Form>
            <Item floatingLabel style={{marginTop: 40}}>
            <Label style={{color: "#FFFFFF", fontSize: 20}}>City</Label>
              <Input
              style={{marginTop:20 }}
  
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  underlineColorAndroid="transparent" 
                  onChangeText={ input => this.setState({input})}></Input>
            </Item>
            <Item floatingLabel style={{marginTop: 40}}>
            <Label style={{color:"#FFFFFF", fontSize: 20}}>Country</Label>
              <Input
              style={{ marginTop: 20}}
  
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  underlineColorAndroid="transparent" 
                  onChangeText={ input_cont => this.setState({input_cont})}></Input>
            </Item>
            <Button rounded
            
            style={styles.button}
            onPress={ ()=>{
              this.getCityInfo();

              Keyboard.dismiss();
            }}><Text style={{fontSize: 20, textAlign: "center"}}>Find the weather</Text></Button>
          </Form>
          </ImageBackground>
          </TouchableWithoutFeedback>
      );
    }
    return (
      <TouchableWithoutFeedback
      onPress={()=>{
        Keyboard.dismiss()
      }}>
      <ImageBackground
      source={{uri: 'https://raw.githubusercontent.com/amandeepmittal/weather-cards/master/assets/showers.jpeg'}} 
      style={styles.container}>
        <Form>
          <Item floatingLabel style={{marginTop: 40}}>
          <Label style={{color: "#FFFFFF", fontSize: 20}}>City</Label>
            <Input
            style={{marginTop:20 }}

                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                underlineColorAndroid="transparent" 
                onChangeText={ input => this.setState({input})}></Input>
          </Item>
          <Item floatingLabel style={{marginTop: 40}}>
          <Label style={{color: "#FFFFFF", fontSize: 20}}>Country</Label>
            <Input
            style={{ marginTop: 20}}

                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                underlineColorAndroid="transparent" 
                onChangeText={ input_cont => this.setState({input_cont})}></Input>
          </Item>
          <Button rounded
          
          style={styles.button}
          onPress={ ()=>{
            this.getCityInfo();
            Keyboard.dismiss();
          }}><Text style={{fontSize: 20, textAlign: "center"}}>Find the weather</Text></Button>
        </Form>
        <Content>
        <Card style={styles.cardStyle}>
          <CardItem header style={{borderTopLeftRadius: 10, borderTopEndRadius: 10}}>
          <Text style={styles.cityText}>
            {this.state.city}
          </Text>
          </CardItem>
          <Text style={styles.desc}>{this.state.description}</Text>
          <CardItem style={styles.temp}>
            <Text style={{fontSize: 45}}>{this.state.temperature}°</Text>
            </CardItem>
            <CardItem style={{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:15}}>{this.state.min_temp}° - </Text>
            <Text style={{fontSize:15}}>{this.state.max_temp}°</Text>
          </CardItem>
          <CardItem style={{flexDirection:"column",textAlign:"right"}}>
            <Text>Humidity Percentage - {this.state.humidity}</Text>
            <Text>Wind Speed - {this.state.wind} mps</Text>
          </CardItem>
        </Card>
        </Content>
        </ImageBackground>
        </TouchableWithoutFeedback>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: "#fff",
    resizeMode: 'cover',
  },
  input_style: {
    marginTop: 100,
    marginRight: 25,
    marginLeft: 25,
    borderColor: "transparent",
  },
  placeholderStyle:{
    color:"#FFFFFF",
    backgroundColor:"#666666",
    borderColor: "transparent",
  },
  button:{
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "#5DF4E9",
    alignItems: 'center',
    justifyContent: 'center'
  },
  cityText:{
    fontSize: 30,
    fontWeight: "bold"
  },
  desc:{
    fontSize: 20,
    marginLeft: 10
  },
  cardStyle:{
    borderRadius: 10,
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15
  },
  temp:{
    alignItems: 'center',
    justifyContent: "center",
  }
});
