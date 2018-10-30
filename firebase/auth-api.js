import { auth } from './core';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    auth.currentUser.sendEmailVerification();
  });

// Sign out
export const doSignOut = cb => {
  auth
    .signOut()
    .then(() => {
      localStorage.removeItem('MoodAppFirebase');
      cb();
    })
    .catch(error => {});
};

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password).then(userData => {
    if (userData.user.emailVerified) {
      localStorage.setItem('MoodAppFirebase', auth.currentUser.uid);
    } else {
      throw new Error('Please click on a link in a verification email to activate your account.');
    }
  });

// Password Reset
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = password => auth.currentUser.updatePassword(password);
