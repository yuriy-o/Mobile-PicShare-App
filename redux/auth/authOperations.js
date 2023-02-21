import db from "../../firebase/config";

export const authSignUpUser =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    console.log("name, email, password", name, email, password);
    // console.log("email, password, nickname", email, password, nickname);
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser = () => async (dispatch, getState) => {};

export const authSignOutUser = () => async (dispatch, getState) => {};
