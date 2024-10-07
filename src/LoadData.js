import React, { useState } from 'react';
import AWS from 'aws-sdk';
import './aws-config'; 
import musicData from './a1.json'; 

const LoadData = () => {
  const [response, setResponse] = useState('');
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const loadDataToMusicTable = async () => {
    try {
      if (!Array.isArray(musicData.songs)) {
        throw new Error('Loaded data is not an array');
      }
      for (let song of musicData.songs) {
        const item = {
          ...song,
          artist: song.artist.toLowerCase(),
          title: song.title.toLowerCase()
        };

        const params = {
          TableName: 'music',
          Item: item
        };
        await dynamodb.put(params).promise();
      }
      setResponse('Data loaded successfully');
    } catch (error) {
      setResponse(`Error loading data: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={loadDataToMusicTable}>Load Music Data</button>
      <p>{response}</p>
    </div>
  );
};

export default LoadData;
