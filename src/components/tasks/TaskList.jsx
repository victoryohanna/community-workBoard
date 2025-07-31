import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, showActions = true }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600">No tasks available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} showActions={showActions} />
      ))}
    </div>
  );
};

export default TaskList;
