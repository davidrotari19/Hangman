import { app } from "./config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

export default async function signUp(
  email: string,
  password: string,
  displayName: string
) {
  let result = null as any,
    error = null as any;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    if (result?.user) {
      try {
        await updateProfile(result.user, {
          displayName: displayName,
        });
      } catch (e) {
        console.log(e);
      }
    }

    result = { ...result.user };
  } catch (e) {
    error = e;
  }

  return { result, error };
}
