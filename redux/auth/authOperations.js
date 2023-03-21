import db from "../../firebase/config";
// import auth from "../../firebase/config";
import { authSlice } from "./authReducer";

// https://youtu.be/faHR9Df-pvc?list=PLViULGko0FdhDiMwWW-Q2JBAJtSQVYptE&t=523
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: nickname,
      });

      const { displayName, uid } = await db.auth().currentUser;

      const userUpdateProfile = {
        nickName: displayName,
        userId: uid,
      };

      // https://youtu.be/8TOVHzpaKnI?list=PLViULGko0FdhDiMwWW-Q2JBAJtSQVYptE&t=383
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("authSignUpUser__error", error);
      console.log("authSignUpUser__error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      // console.log("user", user);
    } catch (error) {
      console.log("authSignInUser__error", error);
      console.log("authSignInUser__error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

// ! Спостерігаємо за користувачем → перезавантаження додатку
export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
