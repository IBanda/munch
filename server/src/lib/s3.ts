import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import random from 'simple-random';
import fs from 'fs/promises';

const s3 = new S3Client({ region: process.env.AWS_REGION });
const Bucket = process.env.AWS_BUCKET;
const baseS3URL = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/`;

export async function uploadImage(key, path) {
  const formatedKey = formatKey(key);
  const file = await fs.readFile(path);
  try {
    await s3.send(
      new PutObjectCommand({
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
}

function formatKey(key: string) {
  const split = key.split('.');
  const ext = split.pop();
  return `${split.join('.')}${random()}.${ext}`;
}

export async function deleteImages(images: string[]) {
  try {
    await s3.send(
      new DeleteObjectsCommand({
        Bucket,
        Delete: {
          Objects: images.map((img) => ({ Key: img.replace(baseS3URL, '') })),
        },
      })
    );
  } catch (error) {
    console.error(error);
  }
}
