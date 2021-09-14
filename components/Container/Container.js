import NavBar from "../NavBar/NavBar";

export default function Container(props) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}
