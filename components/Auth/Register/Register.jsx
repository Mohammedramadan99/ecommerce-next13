import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction, reset } from "../../../store/usersSlice";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userAuth, registered, appErr, loading, validationErrors } =
    useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = { name, email, password, images };
    dispatch(registerUserAction(userData));
  };
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (userAuth?._id || registered) {
      router.push("/login");
      dispatch(reset());
    }
  }, [dispatch, userAuth?._id, registered]);
  console.log(validationErrors);
  return (
    <div className="register">
      <div className="register__header">
        <div className="register__header__txt">create account</div>
      </div>
      <div className="container">
        <form onSubmit={submitHandler} className="register__form">
          {appErr && appErr !== "Validation error" && (
            <div className="alert">
              <ErrorIcon />
              {appErr}
            </div>
          )}
          {/* {validationErrors &&
            validationErrors?.map((item, i) => (
              <div key={i} className="alert">
                <ErrorIcon />
                {item}
              </div>
            ))} */}
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors?.name && (
            <div className="alert">
              <ErrorIcon />
              {validationErrors?.name}{" "}
            </div>
          )}
          <div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
            <div style={{ paddingBottom: "10px" }}>
              size should be less than{" "}
              <span style={{ color: "#ef233c", fontWeight: "700" }}>1MB </span>
            </div>
          </div>

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
          {validationErrors?.password && (
            <div className="alert">
              <ErrorIcon />
              {validationErrors?.password}{" "}
            </div>
          )}

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
            <input type="submit" value="register" />
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
