import React from "react";
import { useAuth } from "../hooks/useAuth";
import ContributorDashboard from "../components/dashboard/ContributorDashboard";
import VolunteerDashboard from "../components/dashboard/VolunteerDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {user?.role === "contributor" ? (
        <ContributorDashboard />
      ) : (
        <VolunteerDashboard />
      )}
    </div>
  );
};

export default Dashboard;
