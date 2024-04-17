import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Reset..");
  };

  return (
    <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
      <div className="flex flex-column gap-4">
        <div className="flex justify-content-center text-4xl font-normal">
          Reset your password
        </div>
        <div className="flex flex-column justify-content-center align-items-center text-xs font-normal">
          <span>
            Enter your email, and we will send you the link to reset your
            password.
          </span>
        </div>
      </div>
      <div className="flex flex-column gap-5">
        <div className="flex flex-row justify-content-center">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-envelope" />
            <InputText
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => getData(e)}
              pt={{
                root: { className: "w-full" },
              }}
            />
          </span>
        </div>
        <div className="flex flex-column gap-2">
          <Button
            label="Submit"
            severity="secondary"
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
            }}
            onClick={handleSubmit}
          ></Button>
          <div className="flex justify-content-center px-4 py-2 font-normal text-sm">
            <Link to="/" className="no-underline text-sm font-medium">
              Return to log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
