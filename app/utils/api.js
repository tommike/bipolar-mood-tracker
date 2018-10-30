import { db, auth } from '../../firebase/core';

const API = {};

API.fetchEating = function() {
  return db
    .collection('eating')
    .where('owner_uid', '==', auth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      const items = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const currentItem = {
          id: doc.id,
          timestamp: data.timestamp.seconds,
          optionID: data.optionID,
        };
        items.push(currentItem);
      });

      return items;
    });
};

API.saveEating = function(optionID) {
  const saveObject = {
    optionID,
    timestamp: new Date(),
    owner_uid: auth.currentUser.uid,
  };

  return db
    .collection('eating')
    .add(saveObject)
    .then(doc => ({
      ...saveObject,
      id: doc.id,
    }));
};

API.fetchHabits = function() {
  return db
    .collection('habits')
    .where('owner_uid', '==', auth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      const items = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const currentItem = {
          id: doc.id,
          timestamp: data.timestamp.seconds,
          optionID: data.optionID,
        };
        items.push(currentItem);
      });

      return items;
    });
};

API.fetchWeight = function() {
  return db
    .collection('weight')
    .where('owner_uid', '==', auth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      const items = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const currentItem = {
          id: doc.id,
          timestamp: data.timestamp.seconds,
          value: data.value,
        };
        items.push(currentItem);
      });

      return items;
    });
};

API.saveHabit = function(optionID) {
  const saveObject = {
    optionID,
    timestamp: new Date(),
    owner_uid: auth.currentUser.uid,
  };

  return db
    .collection('habits')
    .add(saveObject)
    .then(doc => ({
      ...saveObject,
      id: doc.id,
    }));
};

API.saveWeight = function(weight) {
  const saveObject = {
    timestamp: new Date(),
    value: weight,
    owner_uid: auth.currentUser.uid,
  };

  return db
    .collection('weight')
    .add(saveObject)
    .then(doc => ({
      timestamp: saveObject.timestamp,
      id: doc.id,
      weight,
    }));
};

API.fetchMedicaments = function() {
  return db
    .collection('medicaments')
    .where('owner_uid', '==', auth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      const items = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const currentItem = {
          id: doc.id,
          medicationTime: data.medicationTime,
          type: data.type,
          dose: data.dose,
          notes: data.notes,
        };
        items.push(currentItem);
      });

      return items;
    });
};

API.saveMedicament = function(medicationTime, type, dose, notes) {
  const saveObject = {
    medicationTime,
    type,
    dose,
    notes,
    owner_uid: auth.currentUser.uid,
  };

  return db
    .collection('medicaments')
    .add(saveObject)
    .then(doc => ({
      ...saveObject,
      id: doc.id,
    }));
};

API.fetchSelfCare = function() {
  return db
    .collection('selfcare')
    .where('owner_uid', '==', auth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      const items = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const currentItem = {
          id: doc.id,
          timestamp: data.timestamp.seconds,
          optionID: data.optionID,
          notes: data.notes,
        };
        items.push(currentItem);
      });

      return items;
    });
};

API.saveSelfCare = function(optionID, notes) {
  const saveObject = {
    timestamp: new Date(),
    optionID,
    notes,
    owner_uid: auth.currentUser.uid,
  };

  return db
    .collection('selfcare')
    .add(saveObject)
    .then(doc => ({
      id: doc.id,
      ...saveObject,
    }));
};

API.fetchSleep = function() {
  return db
    .collection('sleep')
    .where('owner_uid', '==', auth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      const items = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const currentItem = {
          id: doc.id,
          timestamp: data.timestamp.seconds,
          optionID: data.optionID,
        };
        items.push(currentItem);
      });

      return items;
    });
};

API.saveSleep = function(optionID) {
  const saveObject = {
    timestamp: new Date(),
    optionID,
    owner_uid: auth.currentUser.uid,
  };

  return db
    .collection('sleep')
    .add(saveObject)
    .then(doc => ({
      ...saveObject,
      id: doc.id,
    }));
};

API.fetchSleepTime = function() {
  return db
    .collection('sleeptime')
    .where('owner_uid', '==', auth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      const items = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const currentItem = {
          id: doc.id,
          timestamp: data.timestamp.seconds,
          bedtime: data.bedtime,
          wakeup: data.wakeup,
        };
        items.push(currentItem);
      });

      return items;
    });
};

API.saveSleepTime = function(bedtime, wakeup) {
  const saveObject = {
    timestamp: new Date(),
    bedtime,
    wakeup,
    owner_uid: auth.currentUser.uid,
  };

  return db
    .collection('sleeptime')
    .add(saveObject)
    .then(doc => ({
      ...saveObject,
      id: doc.id,
    }));
};

API.fetchMood = function() {
  return db
    .collection('mood')
    .where('owner_uid', '==', auth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      const items = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const currentItem = {
          id: doc.id,
          timestamp: data.timestamp.seconds,
          catID: data.catID,
          optionID: data.optionID,
        };
        items.push(currentItem);
      });

      return items;
    });
};

API.saveMood = function(catID, optionID) {
  const saveObject = {
    timestamp: new Date(),
    catID,
    optionID,
    owner_uid: auth.currentUser.uid,
  };

  return db
    .collection('mood')
    .add(saveObject)
    .then(doc => ({
      ...saveObject,
      id: doc.id,
    }));
};

export function getInitialData() {
  return Promise.all([
    API.fetchMedicaments(),
    API.fetchMood(),
    API.fetchSelfCare(),
    API.fetchSleep(),
    API.fetchSleepTime(),
    API.fetchEating(),
    API.fetchHabits(),
    API.fetchWeight(),
  ]).then(([medicaments, mood, selfCare, sleep, sleepTime, eating, habits, weight]) => ({
    medicaments,
    mood,
    selfCare,
    sleep,
    sleepTime,
    eating,
    habits,
    weight,
  }));
}

export default API;
