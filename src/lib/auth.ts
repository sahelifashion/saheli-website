const ENCODER = new TextEncoder();

async function hash(message: string): Promise<string> {
  const msgBuffer = ENCODER.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a secure signed session token
 * @param email The email to sign in the payload
 * @param expiryMs Milliseconds from now when the token expires (e.g. 24 hours)
 */
export async function signToken(email: string, expiryMs: number): Promise<string> {
  const expiry = Date.now() + expiryMs;
  const payload = `${email}:${expiry}`;
  const secret = process.env.ADMIN_PASSWORD || "saheli-fallback-secret-key-123456";
  const signature = await hash(`${payload}:${secret}`);
  return `${payload}:${signature}`;
}

/**
 * Verifies the validity of a signed session token
 * @param token The token string to verify
 */
export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  
  const parts = token.split(':');
  if (parts.length !== 3) return false;
  
  const [email, expiryStr, signature] = parts;
  const expiry = parseInt(expiryStr, 10);
  
  // Check if token has expired
  if (isNaN(expiry) || Date.now() > expiry) return false;
  
  // Check if email matches expected admin email
  if (email !== process.env.ADMIN_EMAIL) return false;
  
  const payload = `${email}:${expiryStr}`;
  const secret = process.env.ADMIN_PASSWORD || "saheli-fallback-secret-key-123456";
  const expectedSignature = await hash(`${payload}:${secret}`);
  
  return signature === expectedSignature;
}
