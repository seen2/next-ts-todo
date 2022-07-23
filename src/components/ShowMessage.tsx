import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMsg, setStatusCode } from "../redux/reducers/authReducers";

export default function ShowMessage({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  const [toggle, setToggle] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setToggle(false);
      dispatch(setMsg(""));
      dispatch(setStatusCode(200));
    }, 3000);
  }, [toggle, setToggle, dispatch]);

  return (
    <div>
      {toggle && (
        <div
          style={{
            backgroundColor: statusCode == 200 ? "springgreen" : "red",
            color: "white",
            display: "flex",
            flexWrap: "wrap",
            borderRadius: "0.7rem",
            fontSize: "12px",
            padding: "0.3rem",
            margin: "0.3rem",
          }}
        >
          <p>
            {statusCode == 200 ? "Info: " : "Error: "}
            {statusCode + " " + message}
          </p>
        </div>
      )}
    </div>
  );
}
