import { z } from 'zod';

import { firestoreTimestampSchema } from '@/types/firestoreSchemas';

// ルームにjoinしたユーザー1人分の情報
export const roomMemberSchema = z.object({
  userId: z.string(),
  playerName: z.string(),
});

export type RoomMember = z.infer<typeof roomMemberSchema>;

// 読み込み中のroomスキーマ
export const roomLoadingStateSchema = z.object({
  status: z.literal('LOADING'),
  members: z.array(roomMemberSchema),
  membersReadyState: z.record(z.literal(true)),
});

export type RoomLoadingState = z.infer<
  typeof roomLoadingStateSchema
>;

// 募集中のroomスキーマ
export const roomInvitingMembersStateSchema = z.object({
  status: z.literal('INVITING_MEMBERS'),
  members: z.array(roomMemberSchema),
  membersReadyState: z.record(z.literal(true)),
  timeLimitSeconds: z.number(),
  questionCount: z.number(),
});

export type RoomInvitingMembersState = z.infer<
  typeof roomInvitingMembersStateSchema
>;

export const gameQuestionSchema = z.object({
  presentedAt: firestoreTimestampSchema,
  productTitle: z.string(),
  productPrice: z.number(),
  productImageUrl: z.string(),
  affiliateLink: z.string(),
});

export type GameQuestion = z.infer<
  typeof gameQuestionSchema
>;

// memberAnswerMap[userId][questionIndex] = answeredPrice;
export const memberAnswerMapSchema = z.record(
  z.record(z.number().int())
);

export type MemberAnswerMap = z.infer<
  typeof memberAnswerMapSchema
>;

export const roomGameStartedStateSchema = z.object({
  status: z.literal('GAME_STARTED'),
  members: z.array(roomMemberSchema),
  timeLimitSeconds: z.number(),
  questionCount: z.number(),
  questions: z.array(gameQuestionSchema),
  memberAnswerMap: memberAnswerMapSchema,
});

export type RoomGameStartedState = z.infer<
  typeof roomGameStartedStateSchema
>;

export const roomSchema = z.union([
  roomLoadingStateSchema,
  roomInvitingMembersStateSchema,
  roomGameStartedStateSchema,
]);

export type Room = z.infer<typeof roomSchema>;
