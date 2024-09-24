import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { bucket } from '../config/firebase.config';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    const fileName = `${Date.now()}_${file.originalname}`; // Optional: Use uuid for better uniqueness
    const fileUpload = bucket.file(fileName);

    return new Promise<string>((resolve, reject) => {
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (err) => {
        reject(
          new HttpException(
            `Upload failed: ${err.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      });

      stream.on('finish', async () => {
        try {
          await fileUpload.makePublic(); // Make the file public (if needed)
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(publicUrl);
        } catch (err) {
          reject(
            new HttpException(
              `Failed to make file public: ${err.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        }
      });

      stream.end(file.buffer);
    });
  }
}
