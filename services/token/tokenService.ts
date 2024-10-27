"use server";

import { cookies } from "next/headers";
const cookie = cookies();

export const getCookies = ( cookieName:string) => {
    return cookie.get(cookieName);
}

export const setCookie = (cookieName: string, cookieValue: string) => {
    return cookie.set(cookieName, cookieValue, );
}

export const deleteCookie = (cookieName: string) => {
    return cookie.delete(cookieName);
}