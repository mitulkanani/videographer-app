import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Text, RadioGroup, Radio, Button } from 'react-native-ui-kitten'

import Header from '../helper/Header';

class index extends Component {

    state = {
        title: '',
        selectedIndex: '',
        monthly: '',
        quartly: '',
        yearly: '',
        amount: ''
    }

    componentDidMount = () => {
        const title = this.props.navigation.getParam('title');
        this.setState({ title });

        if (title === 'Bronze') {
            this.setState({ monthly: '59.99$ Monthly', quartly: '149.99$ 6 Month ', yearly: '249.99$ Yearly' });
        } else if (title === 'Silver') {
            this.setState({ monthly: '89.99$ Monthly', quartly: '239.99$ 6 Month', yearly: '349.99$ Yearly' });
        } else if (title === 'Gold') {
            this.setState({ monthly: '119.99$ Monthly', quartly: '449.99$ 6 Month', yearly: '799.99$ Yearly' });
        } else {
            this.setState({ monthly: '139.99$ Monthly', quartly: '599.99$ 6 Month', yearly: '999.99$ Yearly' });
        }
    }

    onGroupSelectionChange = (selectedIndex) => {
        const { title } = this.state;
        this.setState({ selectedIndex });

        if (selectedIndex === 0) {
            if (title === 'Bronze') {
                this.setState({ amount: 59.99, selectedPlan: 'Monthly' });
            } else if (title === 'Silver') {
                this.setState({ amount: 89.99, selectedPlan: 'Monthly' });
            } else if (title === 'Gold') {
                this.setState({ amount: 119.99, selectedPlan: 'Monthly' });
            } else {
                this.setState({ amount: 139.99, selectedPlan: 'Monthly' });
            }
        } else if (selectedIndex === 1) {
            if (title === 'Bronze') {
                this.setState({ amount: 149.99, selectedPlan: '6 Month' });
            } else if (title === 'Silver') {
                this.setState({ amount: 239.99, selectedPlan: '6 Month' });
            } else if (title === 'Gold') {
                this.setState({ amount: 449.99, selectedPlan: '6 Month' });
            } else {
                this.setState({ amount: 599.99, selectedPlan: '6 Month' });
            }
        } else if (selectedIndex === 2) {
            if (title === 'Bronze') {
                this.setState({ amount: 249.99, selectedPlan: 'Yearly' });
            } else if (title === 'Silver') {
                this.setState({ amount: 349.99, selectedPlan: 'Yearly' });
            } else if (title === 'Gold') {
                this.setState({ amount: 799.99, selectedPlan: 'Yearly' });
            } else {
                this.setState({ amount: 999.99, selectedPlan: 'Yearly' });
            }
        } 
      };

      onSubscribe = () => {
          const { amount } = this.state;
          if (!!amount) {

          } else {
              Alert.alert('Please select plan first')
          }
      }

    renderCard = () => {
        const { monthly, quartly, yearly } = this.state;
        return (
            <View style={styles.card}>
                <Text style={styles.text}>Please select subscription plan</Text>
                <RadioGroup
                    selectedIndex={this.state.selectedIndex}
                    onChange={this.onGroupSelectionChange}>
                    <Radio text={monthly} style={styles.radio} />
                    <Radio text={quartly} style={styles.radio} />
                    <Radio text={yearly} style={styles.radio} />
                </RadioGroup>
            </View>
        )
    }

    render() {
        const { title} = this.state;
        return (
            <View style={{ flex: 1 }}>
               <Header title={`${title} Plan`} navigation={this.props.navigation} hide={true} />
                <View style={styles.container}>
                    {this.renderCard()}
                    <Button 
                        onPress={this.onSubscribe}
                        style={{ marginTop: 20 }}
                    >Subscribe
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        flex: 1,
        padding: 20
    },
    card: {
        padding: 20,
        backgroundColor: '#FFF'
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    },
    radio: {
        margin: 10
    }
})

export default index;
