import { UserProps } from "@/@types/user.type";
import Cookies from "js-cookie";

export const setUserCookie = (session: UserProps) => {
  Cookies.remove("payments_userCookie");
  Cookies.set("payments_userCookie", JSON.stringify(session), {
    expires: 15,
    path: "/",
  });
};

export const getUserCookie = (): UserProps | null => {
  const sessionCookie = Cookies.get("payments_userCookie");
  if (sessionCookie === undefined) return null;
  return JSON.parse(sessionCookie);
};

export const removeUserCookie = () => {
  Cookies.remove("payments_userCookie");
};
