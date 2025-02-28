import { SignJWT } from "jose";

const secretKey = new TextEncoder().encode("your_secret_key");

export const createToken = async (userData: any) => {
  return await new SignJWT(userData)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);
};
