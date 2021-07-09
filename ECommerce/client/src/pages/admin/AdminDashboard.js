import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import MainTaskBoard from "./dashboard/MainTaskBoard";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <MainTaskBoard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
