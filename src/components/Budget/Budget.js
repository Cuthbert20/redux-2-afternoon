import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux'
import { requestUserData } from '../../ducks/userReducer'
import { requestBudgetData, addPurchase, removePurchase } from '../../ducks/budgetReducer'


class Budget extends Component {
  componentDidMount(){
    this.props.requestUserData()
    this.props.requestBudgetData()
  }

  render() {
    // console.log(this.props.budget)
    //destructuring loading off of this.props.budget
    const { loading } = this.props.budget//should have added purchases and budgetLimit but forgot.
    console.log("1", this.props)
    const {firstName, lastName} = this.props.user
    const { addPurchase, removePurchase } = this.props
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={addPurchase} />
              <DisplayPurchases removePurchase={removePurchase} purchases={this.props.budget.purchases} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={this.props.budget.purchases} budgetLimit={this.props.budget.budgetLimit} />
              <Chart2 purchases={this.props.budget.purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}
//In the mapStateToProps function, return an object with a budget property and value of the budget slice of state from the redux store.

function mapStateToProps(reduxState){
  console.log(reduxState)
  return {
    //to the left is the name in props
    budget: reduxState.budget,
    user: reduxState.user
  }
}
//All redux store state values managed by the budgetReducer are now on this.props, including the loading property in the redux store.


export default connect(mapStateToProps,{requestUserData, requestBudgetData, addPurchase, removePurchase})(Budget);
 //1. state we want
  //action builders we're using ie {requestUserData, requestBudgetData} also call an action creator object
