import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";


// Register user with email and password
export const registerWithEmailPassword = async (email, password) => {
  try {
    // Attempt to create user with provided email and password
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered successfully!");

    // Return a success message or value if needed
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    // Handle registration error
    if (error.code === "auth/email-already-in-use") {
      console.log("Email address is already in use.");
      return { error: "Email address is already in use." };
    } else {
      // Handle other registration errors
      console.error("Error registering user:", error);
      return { error: "An error occurred. Please try again later." };
    }
  }
};

// Sign in user with email and password
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    console.error("Error signing in:", error);
    if (error.code === "auth/invalid-credential") {
      return { error: "Invalid email or password." };
    } else if (error.code === "auth/too-many-requests") {
      return {
        error:
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      };
    }
    return { error: error.message };
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOutUser(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
    return true; // Password reset email sent successfully
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    return false; // Failed to send password reset email
  }
};

export const confirmResetPassword = async (email, newPassword) => {
  try {
    await confirmPasswordReset(auth, email, newPassword);
  } catch (error) {
    console.error("Error resetting password:", error);
  }
};

export const logoutUser = async () => {
  try {
    await signOutUser();
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const updateUserProfile = async (currentUser, displayName) => {
  try {
    await updateProfile(currentUser, { displayName });
    console.log("User's display name updated successfully!");
  } catch (error) {
    console.error("Error updating user's display name:", error);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};


// Function to check if a user already exists with the provided email
export const checkIfUserExists = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods && signInMethods.length > 0;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
};