import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { questionaries, notes } from "../hooks";

import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useAuth } from "../../../providers/auth/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CookieStorage } from "aws-amplify/utils";
import { setCookie } from "../../../helpers/cookies.helper";

const sha256 = async (str: string): Promise<ArrayBuffer> => {
  return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
};

const generateNonce = async (): Promise<string> => {
  const hash = await sha256(
    crypto.getRandomValues(new Uint32Array(4)).toString()
  );
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const base64URLEncode = (string: ArrayBuffer): string => {
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(string)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const AdminDashboard = () => {
  const { currentAuthenticatedUser, logout } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const code = location.search.split("=")[1];

  useEffect(() => {
    /* try {
      currentAuthenticatedUser().then((data) => {
        if (!data) navigate("/");
      });
    } catch (error) {
      console.log(error);
    } */
  }, []);

  const onClickEvent1 = async () => {
    const code_verifier = await generateNonce();
    window.sessionStorage.setItem("codeVerifier", code_verifier);
    const code_challenge = base64URLEncode(await sha256(code_verifier));
    console.log("Code challenge: " + code_challenge);
    console.log("Code verifier: " + code_verifier);
    window.location.replace(
      "https://mpenava-pool.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=" +
        import.meta.env.VITE_COGNITO_CLIENT_ID +
        "&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fadmin&code_challenge=" +
        code_challenge +
        "&code_challenge_method=S256"
    );
  };

  const onClickEvent2 = async () => {
    const code_verifier = window.sessionStorage.getItem("codeVerifier");

    const response = await fetch(
      `https://mpenava-pool.auth.eu-north-1.amazoncognito.com/oauth2/token`,
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/x-www-form-urlencoded",
        }),
        body: Object.entries({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
          code: code,
          code_verifier: code_verifier,
          redirect_uri: "http%3A%2F%2Flocalhost%3A5173%2Fadmin",
        })
          .map(([k, v]) => `${k}=${v}`)
          .join("&"),
      }
    );
    if (!response.ok) {
      throw new Error(await response.json());
    }
    const tokens = await response.json();
    if (tokens) {
      setCookie("access_token", tokens.access_token);
      setCookie("id_token", tokens.id_token);
      setCookie("refresh_token", tokens.refresh_token);
    }
  };

  const viewIcon = () => {
    return (
      <Button
        icon={"pi pi-send"}
        severity="secondary"
        size={"small"}
        className="p-button-sm p-button-text p-0"
      ></Button>
    );
  };

  const tagMessage = () => {
    return (
      <Tag
        severity="success"
        value="Completed"
        rounded
        pt={{
          root: {
            className:
              "bg-green-100 font-normal text-green-500 border-1 border-green-500 p-1",
          },
        }}
      />
    );
  };

  const toast = useRef<Toast>(null);

  const handleLogoutEvent = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-column gap-5">
      <div className="flex flex-row align-items-center justify-content-between w-full">
        <div className="flex gap-3">
          <i className="pi pi-th-large flex align-items-center text-2xl"></i>
          <div className="font-bold text-3xl">Dashboard</div>
        </div>
        <div className="flex gap-3">
          <Toast
            ref={toast}
            pt={{
              closeButton: { className: "text-white border-1" },
            }}
          />
          <Button
            icon="pi pi-arrow-up"
            label="Open form"
            severity="secondary"
            onClick={onClickEvent1}
          ></Button>
          <Button
            icon="pi pi-arrow-down"
            label="Get tokens"
            severity="secondary"
            onClick={onClickEvent2}
          ></Button>
          <Button
            icon="pi pi-sign-out"
            label="Logout"
            severity="secondary"
            onClick={handleLogoutEvent}
          ></Button>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-content-between">
        <div className="card flex p-4 gap-3 bg-gray-100 border-round-xl m-2">
          <div className="flex align-items-center text-lg font-semibold">
            Completed questionaries
          </div>
          <div className="flex justify-content-end text-4xl font-bold text-blue-400">
            145
          </div>
        </div>
        <div className="card flex p-4 gap-3 bg-gray-100 border-round-xl m-2">
          <div className="flex align-items-center text-lg font-semibold">
            Not submited questionaries
          </div>
          <div className="flex justify-content-end text-4xl font-bold text-blue-400">
            20
          </div>
        </div>
        <div className="card flex p-4 gap-3 bg-gray-100 border-round-xl m-2">
          <div className="flex align-items-center text-lg font-semibold">
            Incomplete questionarires
          </div>
          <div className="flex justify-content-end text-4xl font-bold text-blue-400">
            54
          </div>
        </div>
      </div>

      <div className="flex flex-column gap-2">
        <div className="flex justify-content-between gap-3 w-full py-2">
          <div className="font-bold text-3xl">Ready to</div>
          <div className="font-medium text-lg text-color-secondary flex align-items-center">
            See all
          </div>
        </div>
        <div className="flex w-full">
          <DataTable
            value={questionaries}
            stripedRows
            showGridlines
            showHeaders={false}
          >
            <Column field="name" pt={{ root: { className: "w-7" } }}></Column>
            <Column field="date" pt={{ root: { className: "w-4" } }}></Column>
            <Column body={viewIcon}></Column>
          </DataTable>
        </div>
      </div>

      <div className="flex flex-column gap-2">
        <div className="flex justify-content-between gap-3 w-full py-2">
          <div className="font-bold text-3xl">Recently scribed notes</div>
          <div className="font-medium text-lg text-color-secondary flex align-items-center">
            See all
          </div>
        </div>
        <div className="flex w-full">
          <DataTable
            value={notes}
            stripedRows
            showGridlines
            showHeaders={false}
          >
            <Column field="name" pt={{ root: { className: "w-7" } }}></Column>
            <Column field="date" pt={{ root: { className: "w-3" } }}></Column>
            <Column
              body={tagMessage}
              pt={{ root: { className: "w-3" } }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
