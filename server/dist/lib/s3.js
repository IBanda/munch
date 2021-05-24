'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteImages = exports.uploadImage = void 0;
const client_s3_1 = require('@aws-sdk/client-s3');
const simple_random_1 = __importDefault(require('simple-random'));
const promises_1 = __importDefault(require('fs/promises'));
const s3 = new client_s3_1.S3Client({ region: process.env.AWS_REGION });
const Bucket = process.env.AWS_BUCKET;
const baseS3URL = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/`;
function uploadImage(key, path) {
  return __awaiter(this, void 0, void 0, function* () {
    const formatedKey = formatKey(key);
    const file = yield promises_1.default.readFile(path);
    try {
      yield s3.send(
        new client_s3_1.PutObjectCommand({
          Bucket,
          Key: formatedKey,
          Body: file,
          ContentLength: file.length,
          GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
        })
      );
      return `${baseS3URL}${formatedKey}`;
    } catch (error) {
      console.log(error);
    }
  });
}
exports.uploadImage = uploadImage;
function formatKey(key) {
  const split = key.split('.');
  const ext = split.pop();
  return `${split.join('.')}${simple_random_1.default()}.${ext}`;
}
function deleteImages(images) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield s3.send(
        new client_s3_1.DeleteObjectsCommand({
          Bucket,
          Delete: {
            Objects: images.map((img) => ({ Key: img.replace(baseS3URL, '') })),
          },
        })
      );
    } catch (error) {
      console.error(error);
    }
  });
}
exports.deleteImages = deleteImages;
