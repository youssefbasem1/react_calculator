import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import History from "./History"; // Import the new History component
import "./App.css";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    history: [], // Add history array to state
  };

  handleClick = buttonName => {
    const newState = calculate(this.state, buttonName);
    if (newState.total !== undefined || newState.next !== undefined) {
      // Only add to history if there's a result or next value
      this.setState(prevState => ({
        ...newState,
        history: [
          ...prevState.history,
          {
            expression: prevState.next
              ? `${prevState.total || 0} ${prevState.operation || ""} ${prevState.next}`
              : prevState.total || 0,
            result: newState.total || newState.next || 0,
          },
        ],
      }));
    } else {
      this.setState(newState);
    }
  };

  handleKeyDown = event => {
    const { key } = event;
    // Allow only numbers, operators, decimal point, Enter, and Escape
    if (/[0-9+\-*/.=]/.test(key) || key === "Enter" || key === "Escape") {
      event.preventDefault(); // Prevent default browser behavior
      const buttonName = key === "Enter" ? "=" : key === "Escape" ? "AC" : key;
      this.handleClick(buttonName);
    }
  };

  render() {
    return (
      <div className="component-app" onKeyDown={this.handleKeyDown} tabIndex="0">
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
        <History history={this.state.history} /> {/* Render the History component */}
      </div>
    );
  }
}
