/* c8 ignore start */

export const setCookie = (
  name: string,
  value: string,
  type: "session" | "persistent" = "session",
  path: string = "/"
) => {
  let expires: string | undefined;
  if (type === "persistent") {
    expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
  } else {
    expires = "";
  }
  document.cookie = `${name}=${value};${expires};path=${path}`;
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const deleteCookie = (name: string, path: string = "/") => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
};
