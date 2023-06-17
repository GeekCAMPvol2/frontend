import { css } from '@emotion/react';
import Image from 'next/image';
import { MultiplayRoomMember } from '@/features/multiplay/model';
import { formatNumberToJpyString } from '@/features/multiplay/utils/formatNumberToJpyString';

const styles = {
  container: css`
    width: 90%;
    margin: 0 auto;
  `,
  answerWrapper: css`
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  `,
  label: css`
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: rgb(199, 81, 250);
    text-shadow: 0 0 5px rgb(199, 81, 250);
  `,
  tableContainer: css`
    height: 400px;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  tableWrapper: css`
    width: 100%;

    border-collapse: collapse;
  `,
  answerTr: css`
    text-align: center;
    border-bottom: 2px solid rgb(199, 81, 250);
  `,
  userImage: css`
    border-radius: 100%;
    object-fit: cover;
    margin-top: 10px;
  `,
  answerTd: css`
    font-size: 30px;
  `,
};

export type AnswerCardProps = {
  correctPrice: number;
  players: MultiplayRoomMember[];
  answersByPlayer: Map<string, number>;
};

export const AnswerCard = (props: AnswerCardProps) => {
  const { correctPrice, answersByPlayer } = props;
  return (
    <div css={styles.container}>
      <div css={styles.answerWrapper}>
        <p css={styles.label}>正解</p>
        <h1>{formatNumberToJpyString(correctPrice)}</h1>
      </div>

      <div css={styles.tableContainer}>
        <table css={styles.tableWrapper}>
          <thead>
            <tr>
              <th></th>
              <th css={styles.label}>回答</th>
              <th css={styles.label}>差額</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(
              answersByPlayer,
              ([userId, answeredPrice]) => (
                <tr css={styles.answerTr} key={userId}>
                  <td>
                    <Image
                      css={styles.userImage}
                      src={'/flower2.jpg'}
                      alt={'ユーザーアイコン'}
                      height={50}
                      width={50}
                    />
                  </td>
                  <td css={styles.answerTd}>
                    {formatNumberToJpyString(answeredPrice)}
                  </td>
                  <td>
                    {formatNumberToJpyString(
                      Math.abs(answeredPrice - correctPrice)
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
