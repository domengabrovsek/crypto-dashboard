import { ScanCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

import * as dotenv from 'dotenv';
import { LedgerEvent } from 'src/models/Events';
dotenv.config();

const dynamoDbClient = new DynamoDBClient({ region: 'eu-central-1' });

(async () => {

  const scanCommand = new ScanCommand({ TableName: 'crypto-dashboard-events' });
  const response = await dynamoDbClient.send(scanCommand);
  const events: LedgerEvent[] = response.Items ? response.Items.map(item => unmarshall(item) as LedgerEvent) : [];

  const depositEvents = events
    .filter(event => event.eventType === 'Deposit');
    // .filter(event => event.payload.asset === 'ZEUR')

  const result = depositEvents
    .map(event => ({ ...event.payload, timestamp: event.timestamp }))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  console.table(result);

})();