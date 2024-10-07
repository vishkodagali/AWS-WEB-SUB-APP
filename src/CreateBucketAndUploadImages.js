import React, { useState } from 'react';
import AWS from 'aws-sdk';
import './aws-config';
import musicData from './a1.json';

const CreateBucketAndUploadImages = () => {
  const [response, setResponse] = useState('');
  const s3 = new AWS.S3();

  const uploadImages = async () => {
    const bucketName = '9900430217'; 

    try {
      for (let song of musicData.songs) {
        const imageUrl = song.img_url;
        const fileName = `${song.artist.replace(/\s/g, '_')}.jpg`;

        try {
          await s3.headObject({
            Bucket: bucketName,
            Key: fileName,
          }).promise();
          console.log(`File already exists, skipping upload: ${fileName}`);
        } catch (error) {
          if (error.statusCode === 404) {  
            const imageResponse = await fetch(imageUrl);
            const imageData = await imageResponse.blob();

            await s3.upload({
              Bucket: bucketName,
              Key: fileName,
              Body: imageData,
            }).promise();
            console.log(`Image uploaded successfully: ${fileName}`);
          } else {
            throw error;  
          }
        }
      }
      setResponse('Images processed successfully.');
    } catch (error) {
      setResponse(`Error: ${error.message}`);
      console.error(`Failed to process images: ${error}`);
    }
  };

  return (
    <div>
      <button onClick={uploadImages}>Upload Images</button>
      <p>{response}</p>
    </div>
  );
};

export default CreateBucketAndUploadImages;
