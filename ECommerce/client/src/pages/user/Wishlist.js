import React from "react";
import UserNav from "../../components/nav/UserNav";
import TodoForm from "../../components/forms/TodoForm";
import CalculatorForm from "../../components/forms/CalculatorForm";
import MainTaskBoard from "../admin/dashboard/MainTaskBoard";
import CounterClick from "../admin/dashboard/CounterClick";
import SampleLogin from "../admin/dashboard/SampleLogin";

const Wishlist = () => {
  const todos = [
    { id: 1, title: "send status email", completed: false },
    { id: 1, title: "enter timesheet", completed: true },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {/* <CounterClick /> */}
          {/* <MainTaskBoard /> */}
          <SampleLogin />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
