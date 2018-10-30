import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './firebase-project-config';

firebase.initializeApp(config);

const auth = firebase.auth();

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});

export { db, auth, firebase };
