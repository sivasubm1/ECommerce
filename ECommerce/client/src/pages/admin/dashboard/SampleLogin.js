import React, { useState } from "react";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const SampleLogin = () => {
  const [sampleEmail, setSampleEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resultEmail, setResultEmail] = useState("");

  const emailChange = (e) => {
    setSampleEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="text-center">
      <input
        type="text"
        placeholder="Email"
        value={sampleEmail}
        onChange={(e) => setSampleEmail(e.target.value)}
      />
      <br />
      <div className="first-example">
        <input type="password" id="password-field" />
        <i id="pass-status" className="fa fa-eye" aria-hidden="true"></i>
      </div>

      {/* <input
        type="password"
        className="ml-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
            <i id="pass-status" class="fa fa-eye" aria-hidden="true" onClick="viewPassword()"></i>
      <EyeOutlined className="text-warning" /> */}
      <br />
      <a className="ml-5" href="">
        Forgot Password?
      </a>
      <br />
      {sampleEmail}
      <br />
      {password}
      <br />
      <button style={{ width: 100 }} className="btn btn-primary" type="Submit">
        Log In
      </button>
      <br />
      <br />
      <h1>Don't recognize this account?</h1>
      <a href="">Create new intuitive account</a>
    </div>
  );
};

export default SampleLogin;
