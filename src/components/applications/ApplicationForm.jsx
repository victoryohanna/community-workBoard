import React, { useState } from "react";
import { applyToTask } from "../../api/applications";

const ApplicationForm = ({ taskId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyToTask(taskId, { message });
      setMessage("");
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying to task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Apply to this Task</h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
