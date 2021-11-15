import React from "react";
import Menu from "./Menu";

export default function Base({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <div>
      <Menu></Menu>
      <div className="conatiner-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
          <div className={className}>{children}</div>
        </div>
      </div>
      <footer className="footer bg-dark mt-auto py-0">
        <div className="container-fluid bg-success text-white text-center">
          <h4>If you have got any questions, feel free to reach out</h4>
          <button className="btn btn-warning btn-lg">Contact Us </button>
        </div>
        <div className="container"></div>
        <span className="text-muted text-right">
          Your One Stop destination to buy T-shirt
        </span>
      </footer>
    </div>
  );
}
