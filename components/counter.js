import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '../store/actions/counterActions';

const Counter = (props) => {
  return (
    <div>
      <div>count : {props.counter}</div>
      <div className="flex">
        <div>
          <button onClick={props.increment}>INCREMENT BY 1</button>
        </div>
        <div>
          <button onClick={props.decrement}>DECREMENT BY 1</button>
        </div>
        <button onClick={props.reset}>RESET</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    counter: state.counterReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
