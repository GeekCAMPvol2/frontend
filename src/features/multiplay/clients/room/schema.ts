import { z } from 'zod';
import { firestoreTimestampSchema } from '@/types/firestoreSchemas';

// ルームにjoinしたユーザー1人分の情報
export const remoteRoomMemberSchema = z.object({
  userId: z.string(),
  displayName: z.string(),
});

export type RemoteRoomMember = z.infer<
  typeof remoteRoomMemberSchema
>;

export const remoteClientSceneLobbySchema = z.object({
  kind: z.literal('LOBBY'),
});

export const remoteClientSceneQuizSubmitSchema = z.object({
  kind: z.literal('QUIZ_SUBMIT'),
  currentQuestionIndex: z.number().int(),
});

export const remoteClientSceneQuizAnswerSchema = z.object({
  kind: z.literal('QUIZ_ANSWER'),
  currentQuestionIndex: z.number().int(),
});

export const remoteClientSceneGameResultSchema = z.object({
  kind: z.literal('GAME_RESULT'),
});

export const remoteClientSceneSchema = z.union([
  remoteClientSceneLobbySchema,
  remoteClientSceneQuizSubmitSchema,
  remoteClientSceneQuizAnswerSchema,
  remoteClientSceneGameResultSchema,
]);

export type RemoteClientScene = z.infer<
  typeof remoteClientSceneSchema
>;

export const remoteClientSceneScheduleSchema = z.object({
  scene: remoteClientSceneSchema,
  startDate: firestoreTimestampSchema,
});

export type RemoteClientSceneSchedule = z.infer<
  typeof remoteClientSceneScheduleSchema
>;

// 募集中のroomスキーマ
export const remoteRoomInvitingMembersSchema = z.object({
  status: z.literal('INVITING_MEMBERS'),
  members: z.array(remoteRoomMemberSchema),
  membersReadyState: z.record(z.literal(true)),
  timeLimitSeconds: z.number(),
  questionCount: z.number(),
  clientSceneSchedules: z.array(
    remoteClientSceneScheduleSchema
  ),
});

export type RemoteRoomInvitingMembers = z.infer<
  typeof remoteRoomInvitingMembersSchema
>;

export const RemoteQuestionSchema = z.object({
  productTitle: z.string(),
  productPrice: z.number(),
  productImageUrl: z.string(),
  productLinkUrl: z.string(),
});

export type RemoteQuestion = z.infer<
  typeof RemoteQuestionSchema
>;

// memberAnswerMap[userId][questionIndex] = answeredPrice;
export const remotePlayerQuestionAnswerTable = z.record(
  z.array(z.number().int())
);

export type RemoteMemberAnswerMap = z.infer<
  typeof remotePlayerQuestionAnswerTable
>;

export const remoteRoomGameStartedSchema = z.object({
  status: z.literal('GAME_STARTED'),
  members: z.array(remoteRoomMemberSchema),
  timeLimitSeconds: z.number(),
  questionCount: z.number(),
  questions: z.array(RemoteQuestionSchema),
  playerQuestionAnswerTable:
    remotePlayerQuestionAnswerTable,
  clientSceneSchedules: z.array(
    remoteClientSceneScheduleSchema
  ),
});

export type RemoteRoomGameStarted = z.infer<
  typeof remoteRoomGameStartedSchema
>;

export const remoteRoomSchema = z.union([
  remoteRoomInvitingMembersSchema,
  remoteRoomGameStartedSchema,
]);

export type RemoteRoom = z.infer<typeof remoteRoomSchema>;
