import React, { useState } from 'react';
import AWS from 'aws-sdk';
import './aws-config'; 

const CreateTable = () => {
  const [response, setResponse] = useState('');

  const createMusicTable = async () => {
    const dynamodb = new AWS.DynamoDB();

    const params = {
      TableName : 'music',
      KeySchema: [       
          { AttributeName: 'artist', KeyType: 'HASH'},  
          { AttributeName: 'title', KeyType: 'RANGE' }  
      ],
      AttributeDefinitions: [       
          { AttributeName: 'artist', AttributeType: 'S' },
          { AttributeName: 'title', AttributeType: 'S' }
      ],
      ProvisionedThroughput: {       
          ReadCapacityUnits: 5, 
          WriteCapacityUnits: 5
      }
    };

    try {
      const result = await dynamodb.createTable(params).promise();
      setResponse('Table Created Successfully');
    } catch (error) {
      setResponse(`Error creating table: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={createMusicTable}>Create Music Table</button>
      <p>{response}</p>
    </div>
  );
};

export default CreateTable;
