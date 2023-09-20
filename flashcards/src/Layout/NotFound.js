import React from "react";
import { useRouteMatch } from "react-router-dom";

function NotFound() {
  const match = useRouteMatch();
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
    </div>
  );
}

export default NotFound;
