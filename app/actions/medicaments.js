import API from '../utils/api';
import { db, auth } from '../../firebase/core';

export const ADD_MEDICAMENT = 'ADD_MEDICAMENT';
export const REMOVE_MEDICAMENT = 'REMOVE_MEDICAMENT';
export const SYNC_MEDICAMENTS = 'SYNC_MEDICAMENTS';

function addMedicament(medicament) {
  return {
    type: ADD_MEDICAMENT,
    medicament,
  };
}

function removeMedicament(id) {
  return {
    type: REMOVE_MEDICAMENT,
    id,
  };
}

export function handleAddMedicament(medicationTime, type, dose, notes, callback) {
  return function(dispatch) {
    return API.saveMedicament(medicationTime, type, dose, notes)
      .then(medicament => {
        dispatch(addMedicament(medicament));
        callback();
      })
      .catch(() => alert('There was an error saving medicament. Try again.'));
  };
}

export function handleDeleteMedicament(medicament) {
  return function(dispatch) {
    dispatch(removeMedicament(medicament.id));

    return API.deleteMedicament(medicament.id).catch(() => {
      dispatch(removeMedicament(medicament));
      alert('An error occurred. Try again.');
    });
  };
}

export function handleSyncMedicaments() {
  return function(dispatch) {
    if (!auth.currentUser) return;
    db.collection('medicaments')
      .where('owner_uid', '==', auth.currentUser.uid)
      .onSnapshot(snapshot => {
        const items = [];

        snapshot.forEach(doc => {
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

        dispatch({ type: SYNC_MEDICAMENTS, medicaments: items });
      });
  };
}
