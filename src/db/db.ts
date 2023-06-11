import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput
} from '@aws-sdk/client-dynamodb';

import { EventType, Exchange, LedgerEvent } from '../models/Events';
import { marshall } from '@aws-sdk/util-dynamodb';
import { toSHA256 } from '../lib/utils'

const dynamoClient = new DynamoDBClient({ region: 'eu-central-1' });
const tableName = 'crypto-dashboard-events';

export const createEventHandler = async (ledger: any) => {
  const accountId = '1';

  let eventType: EventType;

  switch (ledger.type) {
    case 'staking': {
      eventType = EventType.Staking;
      break;
    }
    case 'buy': {
      eventType = EventType.Buy;
      break;
    }
    case 'sell': {
      eventType = EventType.Sell;
      break;
    }
    case 'deposit': {
      eventType = EventType.Deposit;
      break;
    }
    case 'withdrawal': {
      eventType = EventType.Withdrawal;
      break;
    }
    case 'trade': {
      eventType = EventType.Trade;
      break;
    }
    case 'margin': {
      eventType = EventType.Margin;
      break;
    }
    case 'rollover': {
      eventType = EventType.Rollover;
      break;
    }
    case 'credit': {
      eventType = EventType.Credit;
      break;
    }
    case 'transfer': {
      eventType = EventType.Transfer;
      break;
    }
    case 'settled': {
      eventType = EventType.Settled;
      break;
    }
    case 'sale': {
      eventType = EventType.Sale;
      break;
    }
    default: {
      throw new Error(`Unknown event type ${ledger.type}`);
    }
  }

  const payload = {
    accountId: accountId,
    exchange: Exchange.Kraken,
    asset: ledger.asset,
    amount: ledger.amount,
    balance: ledger.balance,
    refid: ledger.refid
  }

  const event: LedgerEvent = {
    eventId: toSHA256(payload),
    eventType: eventType,
    timestamp: ledger.time,
    payload: payload
  }

  // prepare the keys for the event
  const pk = `EVENT#${event.eventId}`;
  const sk = `EVENT#${event.timestamp}`;
  const gsi = `ACCOUNT#${accountId}`;

  // store the event in the event store
  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: marshall({ pk, sk, gsi, ...event, }),
    ConditionExpression: 'pk <> :pk and sk <> :sk',
    ExpressionAttributeValues: marshall({ ':pk': pk, ':sk': sk }, { removeUndefinedValues: true }),
  };

  try {

    console.log(`Creating ${eventType} event for account "${accountId}"}`);

    await dynamoClient.send(new PutItemCommand(params));

    console.log(`Successfully created ${eventType} event for account "${accountId}"`);

  } catch (error: any) {
    
    if(error.name === 'ConditionalCheckFailedException') {
      console.warn(`Event ${event.eventId} already exists`);
      return;
    } 

    console.error(error);
    throw error;
  }
};
