import React, { Component } from 'react';
import PaystackButton from 'react-paystack';

    const key = "pk_test_acc6ee35adace5961264159345a72583864f123a";

    class PayWithPaystack extends Component {
    
    	state = {
       		email: this.props.tenantEmail,  // customer email
    		amount: this.props.amount //equals NGN100,
    	}
    
    	callback = (response) => {
           this.props.selectMode('paid')
            
    	}
    
    	close = () => {
    		console.log("Payment closed");
    	}
    
    	getReference = () => {
    		//you can put any unique reference implementation code here
    		let text = "";
    		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";    
    		for( let i=0; i < 15; i++ )
    			text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    		return text;
    	}
    
      render() {
        return(
          <div className = "t-md-10 t-flex t-justify-center paystack"  style = {{height:'200px'}}>           
              <PaystackButton
                style = {styles}
                text="Make Payment"
                class="payButton"
                container = {this.props}
                callback={this.callback}
                close={this.close}
                reference={this.getReference()}
                email={this.state.email}
                amount={this.state.amount * 100}
                paystackkey={key}
              />         
          </div>
        );
      }
    }
    
    export default PayWithPaystack;
const styles = {
    width: '48%',
    fontFamily:'Museo',
    fontSize: '16px',
    fontWeight: 300,
    height:'45px',
    lineHeight:'45px',
    borderColor: '#7CBF49',
    backgroundColor: '#7CBF49',
    color: '#fff'
    }