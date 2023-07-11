import { convertDate } from './date';
import { getBuildId } from './get-nextjs-build-id';
import { escaping } from './escaping.js';

export const getThreadJson = async ({ board, tid }) => {
  const url = `https://talk.jp/_next/data/${await getBuildId()}/boards/${board}/${tid}.json`;

  return fetch(url).then(r => r.json());
};

export const jsonToDat = json => {
  const { title, comments, board } = json.pageProps.threadData.data;

  return comments.map(({ body, timestamp, writer }, index) => {
    const userName = (writer.name) ? `${writer.name}◆${writer.trip}`
                                 : board.default_name;

    const date = convertDate(new Date(timestamp * 1000));

    return [ userName,
             null, // email
             `${date} ID:${writer.id}`,
             escaping(body),
             (index === 0) ? title : '' ].join('<>');
  }).join('\n');
}