import { generateId } from '../shared';

const API = {};

API.saveWeight = function(weight) {
  return Promise.resolve({
    timestamp: 1234567890,
    id: generateId(),
    weight,
  });
};

export default API;
