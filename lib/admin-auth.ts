import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE = 'cv_admin_session';
const MAX_AGE = 60 * 60 * 8;

export function verifyAdminPassword(password: string) {
  const encoded = process.env.ADMIN_PASSWORD_HASH;
  if (!encoded) return false;
  const [salt, expected] = encoded.split(':');
  if (!salt || !expected) return false;
  try {
    const actual = scryptSync(password, salt, 64).toString('hex');
    return timingSafeEqual(
      Buffer.from(actual, 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}

export async function createAdminSession() {
  const token = randomBytes(32).toString('hex');
  const signed = createHash('sha256')
    .update(`${token}:${process.env.ADMIN_PASSWORD_HASH ?? ''}`)
    .digest('hex');
  (await cookies()).set(COOKIE, `${token}.${signed}`, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/admin',
    maxAge: MAX_AGE,
  });
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [token, signature] = value.split('.');
  if (!token || !signature) return false;
  const expected = createHash('sha256')
    .update(`${token}:${process.env.ADMIN_PASSWORD_HASH ?? ''}`)
    .digest('hex');
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE);
}

export function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return adminSaltedHash(password, salt);
}

export function adminSaltedHash(password: string, salt: string) {
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
