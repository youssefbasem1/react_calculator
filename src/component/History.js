import React from "react";
import PropTypes from "prop-types";
import "./History.css"; // Import the CSS file for styling

const History = ({ history }) => {
  return (
    <div className="component-history">
      <h2>Calculation History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.expression} = {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      expression: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default History;
