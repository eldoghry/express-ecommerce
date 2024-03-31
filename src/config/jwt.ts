import createHttpError from "http-errors";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

export function sign(data: { [key: string]: any }, expiresIn: string = "1d") {
  return jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET!,
    { expiresIn }
  );
}

export function refreshToken(data: { [key: string]: any }) {
  return sign(data, "3d");
}

export function verify(token: string) {
  //   if (!token) throw createHttpError(400, "Missing Token");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded.data;
  } catch (error: any) {
    console.log(error?.message);
    let errorMessage = "Invalid token";
    if (error instanceof TokenExpiredError) errorMessage = "Expired Token";
    throw createHttpError(403, errorMessage);
  }
}
