import { useAuth } from "../../../providers/auth/context/AuthContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { TAuthRegisterType } from "../types";
import AccessCode from "./AccessCode";

const Register = () => {
  const { register } = useAuth();

  const [isConfVisible, setConfVisible] = useState<boolean>(false);

  const [auth, setAuth] = useState<TAuthRegisterType>({
    email: "",
    password: "",
    phone: "",
  });

  const getData = (e: any) => {
    const { value, name } = e.target;
    setAuth(() => {
      return {
        ...auth,
        [name]: value,
      };
    });
  };

  const handleSignUp = async () => {
    const username = auth.email;
    try {
      const result = register(username, auth.password, auth.email, auth.phone);
      if (result) {
        setConfVisible(true);
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
      {!isConfVisible && (
        <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
          <div className="flex justify-content-center text-4xl font-normal">
            Sign up
          </div>
          <div className="flex flex-column gap-5">
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
              <div className="flex flex-column gap-2">
                <label className="text-sm">Password</label>
                <span className="p-input-icon-left">
                  <Password
                    name="password"
                    value={auth.password}
                    onChange={(e) => getData(e)}
                    placeholder="Password"
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
              <div className="flex flex-column gap-2">
                <label className="text-sm">Phone</label>
                <span className="p-input-icon-left">
                  <i className="pi pi-phone" />
                  <InputText
                    placeholder="Phone"
                    name="phone"
                    value={auth.phone}
                    onChange={(e) => getData(e)}
                    pt={{
                      root: { className: "w-full" },
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="flex flex-column gap-2">
              <Button
                label="Continue"
                severity="secondary"
                pt={{
                  root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
                }}
                onClick={handleSignUp}
              ></Button>
            </div>
          </div>
        </div>
      )}
      {isConfVisible && <AccessCode />}
    </>
  );
};

export default Register;
