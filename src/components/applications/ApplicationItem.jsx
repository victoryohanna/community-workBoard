import React from "react";
// import { format } from "date-fns";

const ApplicationItem = ({
  application = {
    _id: "",
    message: "",
    appliedAt: new Date().toISOString(),
    user: {
      name: "",
      email: "",
    },
  },
  showActions = false,
  onApprove,
  onReject,
  onWithdraw,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {application.user?.name?.charAt(0)?.toUpperCase() ?? ""}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {application.user?.name ?? ""}
              </h3>
              <p className="text-sm text-gray-500">
                {application.user?.email ?? ""}
              </p>
            </div>
          </div>

          <div className="mt-3 pl-13">
            <p className="text-gray-700">{application.message}</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Applied{" "}
              {/* {format(
                new Date(application.appliedAt),
                "MMM d, yyyy [at] h:mm a"
              )} */}
            </div>
          </div>
        </div>

        {showActions && (
          <div className="ml-4 flex flex-col space-y-2">
            {onApprove && (
              <button
                onClick={() => onApprove(application._id)}
                className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded hover:bg-green-200 transition-colors"
              >
                Approve
              </button>
            )}
            {onReject && (
              <button
                onClick={() => onReject(application._id)}
                className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded hover:bg-red-200 transition-colors"
              >
                Reject
              </button>
            )}
            {onWithdraw && (
              <button
                onClick={() => onWithdraw(application._id)}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
              >
                Withdraw
              </button>
            )}
          </div>
        )}
      </div>

      {application.status && (
        <div className="mt-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              application.status === "approved"
                ? "bg-green-100 text-green-800"
                : application.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {application.status.charAt(0).toUpperCase() +
              application.status.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ApplicationItem;
