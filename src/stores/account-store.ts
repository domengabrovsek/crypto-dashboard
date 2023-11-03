import { DynamoDBClient, QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { appConfig } from '../config/appConfig';
import { Staking } from '../models/Staking';

type Exchange = 'Kraken' | 'Binance';

interface Event {
  pk: string;
  sk: string;
  gsi?: string;
  eventType: string;
  timestamp: string;
  payload: any;
}

const mapEvent = (event: Event): Staking => ({
  exchange: event.payload.exchange,
  asset: event.payload.asset,
  amount: event.payload.amount,
  refid: event.payload.refid,
  timestamp: event.timestamp,
  balance: event.payload.balance
});

// DynamoDB client instance
const dynamoClient = new DynamoDBClient({ region: 'eu-central-1' });
const tableName = appConfig.get('DatabaseTable');

/**
 * Fetches staking events for a specific exchange.
 * 
 * @returns {Promise<Staking[]>} An array of staking events.
 */
export const fetchStakingTransactions = async (exchange: Exchange): Promise<Staking[]> => {
  const pk = 'EVENT_TYPE#Staking';
  const skPrefix = `EXCHANGE#${exchange}`;

  // Prepare QueryCommandInput parameters
  const params: QueryCommandInput = {
    TableName: tableName,
    KeyConditionExpression: 'pk = :pk and begins_with(sk, :skPrefix)',
    ExpressionAttributeValues: {
      ':pk': { S: pk },
      ':skPrefix': { S: skPrefix }
    }
  };

  try {
    // Perform the query
    const result = await dynamoClient.send(new QueryCommand(params));

    // Unmarshall and return the results
    return result.Items ? result.Items.map(item => mapEvent(unmarshall(item) as Event)) : [];

  } catch (error: any) {
    console.error('Error occurred while querying staking events for Kraken:', error);
    throw new Error('Failed to query staking events for Kraken');
  }
};

