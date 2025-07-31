import React from "react";
import ApplicationItem from "./ApplicationItem";

const ApplicationList = ({ applications = [] }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <p className="text-gray-500">No applications yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationItem
          key={application._id}
          application={{
            _id: application._id || "",
            message: application.message || "",
            appliedAt: application.appliedAt || new Date().toISOString(),
            status: application.status || "pending",
            user: {
              name: application.user?.name || "",
              email: application.user?.email || "",
            },
          }}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
