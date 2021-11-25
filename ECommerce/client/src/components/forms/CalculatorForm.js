import React, { useState } from "react";

const CalculatorForm = () => {
  const [calValue, setCalValue] = useState();
  const [calValue1, setCalValue1] = useState();
  const [result, setResult] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    return setResult(Number(calValue) + Number(calValue1));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>calculator</div>
        <input
          type="number"
          value={calValue}
          onChange={(e) => setCalValue(e.target.value)}
        />
        <input
          type="number"
          value={calValue1}
          onChange={(e) => setCalValue1(e.target.value)}
        />
        <div>
          <button className="btn btn-outline-info">Calculate</button>
        </div>
        <div>{result}</div>
      </div>
    </form>
  );
};

export default CalculatorForm;
