import React from "react";
import loadingImg from '../assets/loading.gif'

export default function ServerConnectingComponent() {
  return (
    <div className="connectToServer">
    <span>
      <img src={loadingImg} alt="loading....."/>
      <h1>As the project has been deployed on a free deployment platform, there may be an initial delay in establishing a connection with the backend server. Kindly be patient while the server establishes its connection.</h1>
    </span>
    </div>
  );
}
