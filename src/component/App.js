import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.css";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
  };

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
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
        {/* Added tabIndex to make the div focusable */}
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}

