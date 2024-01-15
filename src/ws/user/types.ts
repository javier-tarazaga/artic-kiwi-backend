import { WsMessagePayload } from '../message-type';

export interface UserChallengeSubscriptionPayload extends WsMessagePayload {
  userId: string;
  challengeId: string;
}
