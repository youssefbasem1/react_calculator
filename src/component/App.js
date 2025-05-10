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
    if (buttonName === "AC") {
      this.setState({ ...newState, history: [] }); // Clear history on AC
      return;
    }

    if (newState.total !== undefined || newState.next !== undefined) {
      // Only add to history if there's a result or next value
      const expression = newState.next
        ? `${newState.total || 0} ${newState.operation || ""} ${newState.next}`
        : newState.total || 0;
      const result = newState.total || newState.next || 0;
      this.setState(prevState => ({
        ...newState,
        history: [...prevState.history, { expression, result }],
      }));
    } else {
      this.setState(newState);
    }
  };

  handleKeyDown = event => {
    const { key } = event;
    // Allow only numbers, operators, decimal point, Enter, and Escape
    if (/[0-9+\-*/.=]/.test(key) || key === "Enter" || key === "Escape" || key === "Backspace") {
      event.preventDefault(); // Prevent default browser behavior
      const buttonName = key === "Enter" ? "=" : key === "Escape" ? "AC" : key === "Backspace" ? "Backspace" : key;
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
