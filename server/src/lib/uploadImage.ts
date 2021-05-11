import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import random from 'simple-random';
import fs from 'fs/promises';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export default async function uploadImage(key, path) {
  const formatedKey = formatKey(key);
  const file = await fs.readFile(path);
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: formatedKey,
        Body: file,
        ContentLength: file.length,
        GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
      })
    );
    return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${formatedKey}`;
  } catch (error) {
    console.log(error);
  }
}

function formatKey(key: string) {
  const split = key.split('.');
  const ext = split.pop();
  return `${split.join('.')}${random()}.${ext}`;
}
