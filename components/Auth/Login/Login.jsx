import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, setLogin } from "../../../store/usersSlice";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

import BaseUrl from "@/utils/db/BaseUrl";
import axios from "axios";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userAuth, loading } = useSelector((state) => state.users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      // const response = await fetch(`${BaseUrl}/api/auth/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(userData),
      // });

      // if (response.ok) {
      //   const data = await response.json();
      //   console.log({ data });
      //   dispatch(setLogin(data));
      // } else {
      //   throw new Error("Request failed.");
      // }

      // const { data } = await axios.post(`${BaseUrl}/api/auth/login`, {
      //   userData,
      // });
      dispatch(loginUserAction(userData));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userAuth?._id) {
      router.push("/");
    }
  }, [userAuth?._id]);

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__header__txt">login</div>
      </div>
      <div className="container">
        <form onSubmit={submitHandler} className="login__form">
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading ? (
            <div
              className="spinner"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner animation="border" variant="danger" />
            </div>
          ) : (
            <input type="submit" value="login" />
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
