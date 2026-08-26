import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';
import { AppError } from '../utils/AppError';

export interface AdminPayload {
  sub: string;
  email: string;
  name: string;
}

export interface LoginResult {
  token: string;
  expiresIn: string;
  user: { id: string; email: string; name: string };
}

const BCRYPT_ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function login(email: string, password: string): Promise<LoginResult> {
  const user = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });

  // Hash a dummy value when the user is missing so a wrong e-mail and a wrong
  // password take roughly the same time and cannot be told apart.
  const hash = user?.password ?? '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid';
  const valid = await bcrypt.compare(password, hash);

  if (!user || !valid) {
    throw AppError.unauthorized("Email yoki parol noto'g'ri");
  }

  const payload: AdminPayload = { sub: user.id, email: user.email, name: user.name };
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);

  return {
    token,
    expiresIn: env.JWT_EXPIRES_IN,
    user: { id: user.id, email: user.email, name: user.name },
  };
}

export function verifyToken(token: string): AdminPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded === 'string') throw new Error('unexpected payload');
    return decoded as AdminPayload;
  } catch {
    throw AppError.unauthorized("Sessiya muddati tugagan. Qaytadan kiring.");
  }
}

export async function getAdminById(id: string) {
  const user = await prisma.adminUser.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  if (!user) throw AppError.unauthorized('Foydalanuvchi topilmadi');
  return user;
}
