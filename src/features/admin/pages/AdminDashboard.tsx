import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { questionaries, notes } from "../hooks";

import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useAuth } from "../../../providers/auth/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import crypto from "crypto-js";

const AdminDashboard = () => {
  const { currentAuthenticatedUser, logout, fetchUserDevices } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const code = location.search.split("=")[1];

  const code_verifier = crypto.SHA256((123).toString());
  console.log(code_verifier.toString());
  const code_challenge = crypto.enc.Base64.stringify(
    crypto.enc.Utf8.parse(code_verifier.toString())
  );
  console.log(code_challenge);

  fetchUserDevices();

  useEffect(() => {
    /* try {
      currentAuthenticatedUser().then((data) => {
        if (!data) navigate("/");
      });
    } catch (error) {
      console.log(error);
    } */
  }, []);

  const onClickEvent1 = () => {
    window.location.replace(
      "https://mpenava-pool.auth.eu-north-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=29affca9kq64nt68hn8s8bn2jt&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fadmin&code_challenge=OUhRMt_LTq02o_DgXySVsBSkPcM_5gO7t9gzCoVX-9I&code_challenge_method=S256"
    );
  };

  const onClickEvent2 = async () => {
    const url =
      "https://mpenava-pool.auth.eu-north-1.amazoncognito.com/oauth2/token";
    const data = new URLSearchParams();
    data.append("redirect_uri", "http%3A%2F%2Flocalhost%3A5173%2Fadmin");
    data.append("client_id", "29affca9kq64nt68hn8s8bn2jt");
    data.append("code", code);
    data.append("grant_type", "authorization_code");
    data.append(
      "code_verifier",
      "DgUEbqOlmDRMFhvpdplmwpMLvhmHFXuHhM8ARa8H5bw5HV82VCF1WpYnJ8XcKS9DlMF2EklqrM9nlUKRgvdtMGlwD3pVI0RsFa4WTImRKVJ7tX2AgRECBX7Kon6oldzI"
    );

    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
