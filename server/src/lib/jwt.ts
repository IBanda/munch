import njwt from 'njwt';
import secureRandom = require('secure-random');
import util from 'util';
import User from '../models/user';

const verify = util.promisify(njwt.verify);

export function createJWT(userId: string, key?: string) {
  const signingKey =
    key || secureRandom(256, { type: 'Buffer' }).toString('base64');
  const claims = {
    iss: 'http://localhost:4000',
    sub: `users/${userId}`,
    scope: 'self',
  };
  return { jwt: njwt.create(claims, signingKey).compact(), signingKey };
}

export async function verifyJWT(token: string, userId: string) {
  try {
    const user = await User.findOne({ _id: userId });
    const res = await verify(token, user.signingkey);
    return res;
  } catch (error) {
    return error;
  }
}
