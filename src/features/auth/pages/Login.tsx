import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { TAuthType } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/auth/context/AuthContext";
import { Spinner } from "../../../shared/components";

const Login = () => {
  const { login, currentAuthenticatedUser } = useAuth();
  const navigate = useNavigate();

  const [auth, setAuth] = useState<TAuthType>({ email: "", password: "" });
  const [spinner, setSpinner] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const getData = (e: any) => {
    const { value, name } = e.target;
    setAuth(() => {
      return {
        ...auth,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    try {
      currentAuthenticatedUser().then((data) => {
        if (data) navigate("/admin");
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      setSpinner(true);
      await login(auth.email, auth.password);
      setSpinner(false);
      navigate("/access-code");
    } catch (error) {
      setSpinner(false);
      toast.current?.show({
        severity: "error",
        summary: "Error...",
        detail: "Wrong email or password!",
      });
    }
  };

  return (
    <>
      <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
        <div className="flex justify-content-center text-4xl font-normal">
          Log in
        </div>
        <div className="flex flex-column gap-5">
          <Toast
            ref={toast}
            pt={{
              closeButton: { className: "text-red border-1" },
            }}
          />
          <div className="flex flex-column gap-5">
            <div className="flex flex-column gap-2">
              <label className="text-sm">Email</label>
              <span className="p-input-icon-left">
                <i className="pi pi-envelope" />
                <InputText
                  placeholder="Email"
                  name="email"
                  value={auth.email}
                  onChange={(e) => getData(e)}
                  pt={{
                    root: { className: "w-full" },
                  }}
                />
              </span>
            </div>
            <div className="flex flex-column w-full gap-2">
              <label className="text-sm">Password</label>
              <span className="p-input-icon-left w-full">
                <Password
                  placeholder="Password"
                  name="password"
                  value={auth.password}
                  onChange={(e) => getData(e)}
                  feedback={false}
                  toggleMask
                  pt={{
                    root: { className: "w-full" },
                    input: { className: "w-full pl-5" },
                  }}
                />
                <i className="pi pi-lock" />
              </span>
            </div>
          </div>
          <div className="flex flex-column gap-2">
            <Button
              label="Log in"
              severity="secondary"
              onClick={handleSignIn}
              pt={{
                root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
              }}
            ></Button>
            <div className="flex justify-content-center px-4 py-2 font-normal text-sm">
              Not a member?&nbsp;
              <Link
                to="/registration"
                className="text-blue-500 no-underline text-sm font-medium"
              >
                Signup now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Spinner visible={spinner} />
    </>
  );
};

export default Login;
