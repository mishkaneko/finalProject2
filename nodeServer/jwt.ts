import { Request } from 'express';
import jwt from 'jwt-simple';
import { id, ParseResult, object, values } from 'cast.ts';
import { env } from './env';
import { Bearer } from 'permit';
import { Http2ServerRequest } from 'http2';
import httpStatus from 'http-status';
import { HttpError } from './http.error';

let jwtParser = object({
  user_id: id(),
  role: values(['passenger' as const, 'driver' as const, 'admin' as const]),
});

export type JWTPayload = ParseResult<typeof jwtParser>;

export function encodeJWT(payload: JWTPayload): string {
  return jwt.encode(payload, env.JWT_SECRET);
}

export function decodeJWT(token: string): JWTPayload {
  let payload = jwtParser.parse(jwt.decode(token, env.JWT_SECRET));
  return payload;
}

const permit = new Bearer({
  query: 'acccess_Token',
});

export function getToken(req: Request) {
  let token: string;
  try {
    token = permit.check(req);
  } catch (error) {
    throw new HttpError(httpStatus.UNAUTHORIZED, 'Invalid Bearer Token');
  }
  if (!token) {
    throw new HttpError(httpStatus.UNAUTHORIZED, 'Missing Bearer Token');
  }
  try {
    return decodeJWT(token);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(
      httpStatus.UNAUTHORIZED,
      'Invalid JWT:' + String(error).replace('Error:', '')
    );
  }
}
