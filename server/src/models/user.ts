import { Document, model, Model, Schema } from 'mongoose';
import crypto from 'crypto';
import util from 'util';

const pbkdf2 = util.promisify(crypto.pbkdf2);

interface User extends Document {
  name: string;
  email: string;
  profilePic: string;
  salt: string;
  hash: string;
  signingkey: string;
  pHash: (password: string) => void;
  compare: (password: string) => boolean;
}

const UserSchema: Schema = new Schema({
  name: String,
  email: { type: String, unique: true },
  profilePic: String,
  salt: String,
  hash: String,
  signingkey: String,
});

UserSchema.methods.pHash = async function (this: User, password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  const hash = await pbkdf2(password, this.salt, 1000, 64, 'sha512');
  this.hash = hash.toString('hex');
};

UserSchema.methods.compare = async function (
  this: User,
  password: string
): Promise<boolean> {
  const hash = (await pbkdf2(password, this.salt, 1000, 64, 'sha512')).toString(
    'hex'
  );
  return this.hash === hash;
};

const UserModel: Model<User> = model('user', UserSchema);
export default UserModel;
