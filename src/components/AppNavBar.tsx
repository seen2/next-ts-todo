import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import HomeLogo from "./HomeLogo";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Router from "next/router";
import { onLogout } from "../redux/actionCreators/authActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function AppNavBar({
  createNewTodo,
  setCreateNewTodo,
}: {
  createNewTodo: boolean;
  setCreateNewTodo: Function;
}) {
  const dispatch = useAppDispatch();
  const { _id, name, email } = useAppSelector((state) => state.auth);
  const todos = useAppSelector((state) => state.todos);
  const complete = todos.filter((todo) => todo.isCompleted).length;
  const inComplete = todos.length - complete;

  useEffect(() => {
    if (!_id) {
      Router.push("/");
    }
  }, [_id]);

  const onLogoutClick = async () => {
    await dispatch(onLogout());
    Router.push("/");
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <HomeLogo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Button onClick={() => setCreateNewTodo(true)}>
                Create Todo
              </Button>
            </Nav.Item>

            <Link href="/todos">
              <Nav.Item>
                {(() => (
                  <div
                    style={{
                      margin: "10px",
                      color: "skyblue",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Home
                  </div>
                ))()}
              </Nav.Item>
            </Link>
          </Nav>
          <NavDropdown
            style={{ color: "white", fontWeight: "bold" }}
            title={"Hello, " + name?.split(" ")[0]}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Header>
              <Nav.Item>Name: {name}</Nav.Item>
              <Nav.Item>Email: {email}</Nav.Item>
            </NavDropdown.Header>
            <NavDropdown.Divider></NavDropdown.Divider>
            <NavDropdown.ItemText
              style={{ color: "#1a1a1a", fontWeight: "bold" }}
            >
              TODO Status:
            </NavDropdown.ItemText>
            <Nav.Item
              style={{
                margin: "10px",
                color: "grey",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Incomplete: {inComplete}{" "}
            </Nav.Item>
            <Nav.Item
              style={{
                margin: "10px",
                color: "grey",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Complete: {complete}
            </Nav.Item>
            <NavDropdown.Item>
              <Button onPress={() => onLogoutClick()} color={"error"}>
                Logout
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
