import { EventContext } from 'firebase-functions/v1';

export type StartTimestamp = number;
export type OpenPrice = number;
export type HighPrice = number;
export type LowPrice = number;
export type ClosePrice = number;
export type BtcVolume = number;
export type EndTimestamp = number;
export type BusdVolume = number;

/**
 * Known items from the desctructured array of datapoints
 */
export type ItemT = [
  StartTimestamp,
  OpenPrice,
  HighPrice,
  LowPrice,
  ClosePrice,
  BtcVolume,
  EndTimestamp,
  BusdVolume,
  //?,
  //?,
  //?,
  //?,
];

export type ContextT = EventContext<Record<string, string>>;
