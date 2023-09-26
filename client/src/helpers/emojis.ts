import { IPreviewData } from "../models/types";

export function getPopularEmojis(arr: Array<IPreviewData>) {
  //@ts-ignore
  // todo: fix bug with empty forms after tests
  const emojisFromAllCards = arr.map((i) => i.activeEmoji.map((i) => i.emoji));

  const emojisCollection: string[] = [];
  for (let i = 0; i < emojisFromAllCards.length; i++) {
    for (let j = 0; j < emojisFromAllCards[i].length; j++) {
      emojisCollection.push(emojisFromAllCards[i][j]);
    }
  }

  const emojisUnique = new Set(emojisCollection);

  const emojisStats = emojisCollection.reduce(function (acc, elem) {
    // @ts-ignore
    acc[elem] = (acc[elem] || 0) + 1;
    return acc;
  }, {});

  const emojisStatsValue: number[] = [];
  for (const value of Object.entries(emojisStats)) {
    emojisStatsValue.push(value[1] as number);
  }

  return { emojisStats, emojisUnique, emojisStatsValue };
}
