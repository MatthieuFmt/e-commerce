import NavBar from "../NavBar/NavBar";
import React from "react";
export default function Container(props) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}
