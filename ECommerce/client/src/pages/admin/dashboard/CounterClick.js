import React, { useState, useEffect, useRef } from "react";

const CounterClick = () => {
  const intervalRef = useRef();
  let cnt = 0;
  const [clicked, setClicked] = useState(cnt);

  useEffect(() => {
    const id = setInterval(() => setClicked(clicked + 1), 1000);
    intervalRef.current = id;
    return () => clearInterval(intervalRef.current);
  });

  const cancelClickCnt = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <label>{clicked}</label>
      <button className="btn btn-outline-info" onClick={() => cancelClickCnt()}>
        Click Me
      </button>
    </div>
  );
};

export default CounterClick;
