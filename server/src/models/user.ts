import { Document, model, Model, Schema } from 'mongoose';
import crypto from 'crypto';
import util from 'util';
import { createJWT } from '../lib/jwt';

const pbkdf2 = util.promisify(crypto.pbkdf2);

interface User extends Document {
  name: string;
  email: string;
  salt: string;
  hash: string;
  signingkey: string;
  pHash: (password: string) => void;
  compare: (password: string) => string | void;
}

const UserSchema: Schema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  salt: String,
  hash: String,
  signingkey: String,
});

UserSchema.methods.pHash = async function (
  this: User,
  password: string
): Promise<string> {
  this.salt = crypto.randomBytes(16).toString('hex');
  const hash = await pbkdf2(password, this.salt, 1000, 63, 'sha512');
  this.hash = hash.toString('hex');
  const { jwt, signingKey } = createJWT(this._id);
  this.signingkey = signingKey;
  return jwt;
};

UserSchema.methods.compare = async function (
  this: User,
  password: string
): Promise<string | void> {
  const hash = (
    await pbkdf2(password, this.salt, 1000, 64, 'sha512')
  ).toString();
  if (this.hash === hash) {
    const { jwt } = await createJWT(this._id, this.signingkey);
    return jwt;
  }
};

const UserModel: Model<User> = model('user', UserSchema);
export default UserModel;
