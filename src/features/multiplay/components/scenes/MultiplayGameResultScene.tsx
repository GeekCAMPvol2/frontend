import { css } from '@emotion/react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Background } from '@/components/elements/Background';
import { Title } from '@/components/elements/Title';
import { LeaveButton } from '../internal/LeaveButton';
import { MultiplayRoomInGameResult } from '../../model';
import { formatNumberToJpyString } from '../../utils/formatNumberToJpyString';

export type MultiplayGameResultSceneProps = {
  room: MultiplayRoomInGameResult;
  goBackFromMultiplay: () => void;
};

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    width: 95%;
    height: 70vh;
    margin: 0 auto;
  `,
  titleWrapper: css`
    text-align: center;
  `,
  tabTitleContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    gap: 20px;
  `,
  tabTitle1: css`
    flex: 1;
    color: rgb(199, 81, 250);
    font-size: 3rem;
    text-align: center;
    margin: 20px 0;
    border-radius: 2rem 0 0 0;
    background-color: rgb(0, 255, 250);
    padding: 5px;
    cursor: pointer;
  `,
  tabTitle2: css`
    flex: 1;
    color: rgb(0, 255, 250);
    font-size: 3rem;
    text-align: center;
    margin: 20px 0;
    border-radius: 0 2rem 0 0;
    background-color: rgb(199, 81, 250);
    padding: 5px;
    cursor: pointer;
  `,

  tabNone: css`
    opacity: 0.5;
  `,
  tabContainer: css`
    display: flex;
    flex-direction: column;
    max-height: 60vh;
    width: 90%;
    font-size: 2rem;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  `,
  rankingTable: css`
    width: 100%;
    color: #fff;
    text-align: center;
    border-collapse: collapse;
    border: 1px solid #fff;
    background-color: #1515158a;
    & tr {
      border: 1px solid #fff;
      height: 80px;
    }
    & th {
      border: 1px solid #fff;
      padding: 10px;
    }
    & td {
      border: 1px solid #fff;
      padding: 10px;
    }
  `,
  itemContainer: css`
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  `,
  itemWrapper: css`
    flex: 1;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: white;
    background-color: rgb(0 0 0 /0);
    padding: 10px;
    border: 2px solid rgb(199, 81, 250);
    box-shadow: 0 0 5px rgb(199, 81, 250);
    border-radius: 10px;
  `,
  itemImageWrapper: css`
    border: 2px solid black;
    border-radius: 10px;
    display: flex;
  `,
};

type PlayerGameResult = {
  userId: string;
  displayName: string;
  scoresByQuestion: number[];
  totalScore: number;
};

const calculateAllPlayerGameResult = (
  room: MultiplayRoomInGameResult
) => {
  const { members, questions, playerQuestionAnswerTable } =
    room;
  const gameResults: PlayerGameResult[] = members.map(
    ({ userId, displayName }) => ({
      userId,
      displayName,
      scoresByQuestion: [],
      totalScore: NaN,
    })
  );

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    for (let j = 0; j < members.length; j++) {
      const { userId } = members[j];
      const score =
        playerQuestionAnswerTable[userId][i] -
        question.productPrice;
      gameResults[j].scoresByQuestion[i] = score;
    }
  }

  for (const r of gameResults) {
    r.totalScore = r.scoresByQuestion.reduce(
      (prev, curr) => prev + Math.abs(curr),
      0
    );
  }

  return gameResults;
};

type RankingTableProps = {
  allPlayerGameResults: PlayerGameResult[];
};

const RankingTable = (props: RankingTableProps) => {
  const sorted = props.allPlayerGameResults.sort(
    (a, b) => a.totalScore - b.totalScore
  );

  const tbodyChildren = [];
  let i = 0;
  let rank = 1;
  while (i < sorted.length) {
    const r = sorted[i];
    tbodyChildren.push(
      <tr>
        <td>{rank}位</td>
        <td>{r.displayName}</td>
        <td>{formatNumberToJpyString(r.totalScore)}</td>
      </tr>
    );

    const nextR = sorted[i + 1];
    if (
      nextR != null &&
      r.totalScore !== nextR.totalScore
    ) {
      rank++;
    }

    i++;
  }

  return (
    <table css={styles.rankingTable}>
      <thead>
        <tr>
          <th>順位</th>
          <th>名前</th>
          <th>合計差額</th>
        </tr>
      </thead>
      <tbody>{tbodyChildren}</tbody>
    </table>
  );
};

export const MultiplayGameResultScene = (
  props: MultiplayGameResultSceneProps
) => {
  const { room, goBackFromMultiplay } = props;
  const { roomId, members, questions } = room;

  const gameResults = useMemo(
    () => calculateAllPlayerGameResult(room),
    [room]
  );
  const [showTab, setShowTab] = useState<string>('rank');

  return (
    <div>
      <LeaveButton {...{ roomId, goBackFromMultiplay }} />
      <Background selected={'rgb(0, 225, 255)'} />
      <div css={styles.titleWrapper}>
        <Title />
      </div>
      <div css={styles.container}>
        <div css={styles.tabTitleContainer}>
          <h2
            css={[
              styles.tabTitle1,
              showTab !== 'rank' && styles.tabNone,
            ]}
            onClick={() => setShowTab('rank')}
          >
            ランキング
          </h2>
          <h2
            css={[
              styles.tabTitle2,
              showTab !== 'item' && styles.tabNone,
            ]}
            onClick={() => setShowTab('item')}
          >
            商品一覧
          </h2>
        </div>
        <div css={styles.tabContainer}>
          {showTab == 'rank' && (
            <RankingTable
              allPlayerGameResults={gameResults}
            />
          )}
          {showTab == 'item' && (
            <div css={styles.itemContainer}>
              {questions.map((q) => (
                <div css={styles.itemWrapper}>
                  <div css={styles.itemImageWrapper}>
                    <Image
                      src={q.productImageUrl}
                      alt={q.productTitle}
                      width={200}
                      height={200}
                    />
                  </div>
                  <h1
                    style={{
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {q.productTitle}
                  </h1>
                  <p
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {formatNumberToJpyString(
                      q.productPrice
                    )}
                    円
                  </p>
                  <motion.a
                    href={q.productLinkUrl}
                    target="_blank"
                    style={{
                      border: '2px rgb(199, 81, 250) solid',
                      borderRadius: 40,
                      backgroundColor: 'rgb(199, 81, 250)',
                      fontSize: 18,
                      padding: '2px 14px',
                      color: 'white',
                    }}
                  >
                    商品のページへ
                  </motion.a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
