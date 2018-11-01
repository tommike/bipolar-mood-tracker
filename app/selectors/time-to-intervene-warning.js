import { createSelector } from 'reselect';
import { moodOptions } from '../tracker-options.config.js';

const getAllMoods = state => state.moods;
const nrOfDays = 10;

export const getTimeToInterveneStatus = createSelector(getAllMoods, moods => {
  const moodsGroupedByCat = moodOptions
    .filter(cat => cat.id !== 'aches')
    .reduce((catAcc, catItem) => {
      let subCatItems = moods
        .filter(item => item.catID === catItem.id)
        .sort((a, b) => b.timestamp - a.timestamp);

      if (subCatItems.length) {
        const catOptions = catItem.options;

        subCatItems = subCatItems.reduce((subcatAcc, subcatItem) => {
          const { optionID, timestamp } = subcatItem;

          const value = catOptions.find(item => item.id === optionID).scale;
          subcatAcc.push({ timestamp, value });

          return subcatAcc;
        }, []);

        catAcc[catItem.id] = subCatItems;
      }

      return catAcc;
    }, {});

  let showWarning = false;
  Object.keys(moodsGroupedByCat).forEach(cat => {
    moodsGroupedByCat[cat].slice(0, nrOfDays).forEach(item => {
      if (item.value >= 3 || item.value <= -3) {
        showWarning = true;
      }
    });
  });

  return showWarning;
});
