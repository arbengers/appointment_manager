import React, { useState, useEffect } from "react";

import AppointmentsService from "../services/appointments.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

const Appointments = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    AppointmentsService.getAppointments().then(
      (response) => {
        console.log(response.data);
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {content.map((data) => (
          <div>{data.id}</div>
        ))}
      </header>
    </div>
  );
};

export default Appointments;
