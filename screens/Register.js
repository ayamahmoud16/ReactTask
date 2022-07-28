import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import PhoneInput from "react-native-phone-input";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";

WebBrowser.maybeCompleteAuthSession();
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const phoneInput = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const navigation = useNavigation();
  const handleSignUp = async () => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const update = {
          displayName: fullName,
          photoURL: image,
        };
        auth.currentUser.updateProfile(update).then((res) => {
          navigation.navigate("Home", auth.currentUser.displayName);
          console.log("Registered with:", auth.currentUser.displayName);
        });
      })

      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Register Your Account</Text>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
        />
        <PhoneInput
          containerStyle={styles.containerStyle}
          textContainerStyle={styles.textContainerStyle}
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="EG"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => setPhoneNumber(text)}
          withDarkTheme={false}
          withShadow={false}
          autoFocus={false}
          textProps={{
            placeholder: "Enter a phone number",
          }}
        />
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
        <Button title="Pick an image" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    marginTop: 10,
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

  googlebuttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  googlebutton: {
    backgroundColor: "gray",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    marginBottom: 40,
  },
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "700",
    color: "#0782F9",
    padding: 15,
  },
  containerStyle: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    width: "100%",
    paddingTop: 8,
    paddingBottom: 3,
  },
  textContainerStyle: { paddingTop: 8, backgroundColor: "white" },
});
