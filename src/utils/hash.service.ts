
import * as crypto from 'crypto';

export function hashString(input: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}
