import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';

class TipCalculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      bill: '',
      percentage: '',
      people: '',
      dataIsValid: false,
      errorMsg: '',
      totalView: '',
      totalPerPersonView: '',
    };
  };

  validateBill = (num) => {
    var re = /^[0-9]+([,.][0-9]+)?$/g;
    return re.test(num);
  }

  validateInteger = (num) => {
    var re = /^\d+$/;
    return re.test(num);
  }

  onSubmit = () => {
    if (!(this.validateBill(this.state.bill) && this.validateBill(this.state.percentage) && this.validateInteger(this.state.people))) {
      this.setState({dataIsValid: false});
      this.setState({errorMsg: 'oops! 😳 something went wrong! '});
    } else {
      this.setState({dataIsValid: true});
      var totalAmt = Number(this.state.bill * (1 + this.state.percentage / 100)).toFixed(2);
      var perPersonAmt = Number((this.state.bill * (1 + this.state.percentage / 100 ) / this.state.people).toFixed(2));
      this.setState({totalView: "Total is $" + totalAmt});
      this.setState({totalPerPersonView: "$" + perPersonAmt + " each"});
    }
  };


  render() {

    return (
      <View style={{paddingTop: 125}}>

      <TextInput
        style={styles.input}
        placeholder="total bill"
        returnKeyType={'done'}
        onChangeText={(num) => this.setState({bill: num})}
      />


        <TextInput
          style={styles.input}
          placeholder="% tip"
          keyboardType="number-pad"
          onChangeText={(num) => this.setState({percentage: num})}
        />

        <TextInput
          style={styles.input}
          placeholder="# of people"
          keyboardType="number-pad"
          onChangeText={(num) => this.setState({people: num})}
        />

        <TouchableHighlight onPress={this.onSubmit} style={styles.touchable} underlayColor={'lightcyan'}>
          <Text style={styles.output}>calculate 🤓</Text>
        </TouchableHighlight>


        <Text style={styles.eachView}>
          {this.state.dataIsValid? this.state.totalPerPersonView : ''}
        </Text>

        <Text style={styles.outputSmall}>
          {this.state.dataIsValid? this.state.totalView : this.state.errorMsg }
        </Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    padding: 5,
    height: 60,
    fontSize: 40,
    color: 'salmon',
    fontWeight: '600',
  },
  output: {
    textAlign: 'center',
    color: 'palevioletred',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
  },
  outputSmall: {
    textAlign: 'center',
    color: 'plum',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
  },
  eachView: {
    textAlign: 'center',
    color: 'slateblue',
    fontSize: 55,
    fontWeight: '800',
    padding: 10,
  },
  touchable: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('native', () => TipCalculator);
