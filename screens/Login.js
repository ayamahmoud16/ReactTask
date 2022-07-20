import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebase";
import { createSwitchNavigator } from "react-navigation";
import { Button } from "react-native-web";
//
WebBrowser.maybeCompleteAuthSession();
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [googleSumitting, setGoogleSumitting] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "87010839973-jh3s6lulctkr02469k677ubtii1piqth.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((result) => {
        console.log(result);
      });
    }
  }, [response]);

  //   setGoogleSumitting(true);
  //   const config = {
  //     androidClientId: `363109457211-9tp2oadmh1q8lmb4l5u109p4eg1guf79.apps.googleusercontent.com`,
  //     scopes: ["profile", "email"],
  //   };
  //   Google.logInAsync(config)
  //     .then((result) => {
  //       const { type, user } = result;
  //       if (type == "success") {
  //       } else {
  //       }
  //       setGoogleSumitting(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setGoogleSumitting(false);
  //     });
  // };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        {!googleSumitting && (
          <TouchableOpacity
            onPress={() => {
              promptAsync();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>sign in with google</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
