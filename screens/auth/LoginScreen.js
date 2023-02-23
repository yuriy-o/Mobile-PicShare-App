import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  

  const dispatch = useDispatch();

  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  const handleSubmit = () => {
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        onLayout={onLayoutRootView}
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : -100}
      >
        <ImageBackground
          source={require("../../assets/images/background_3.jpg")}
          style={styles.image}
        >
          <View style={styles.back}>
            <Text style={styles.textTitle}>Увійти</Text>

            <View style={styles.form}>
              <TextInput
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                style={{
                  ...styles.input,
                  borderColor: isFocusEmail ? `#FF6C00` : `#E8E8E8`,
                }}
                onFocus={() => setIsFocusEmail(true)}
                onBlur={() => setIsFocusEmail(false)}
              />
              <TextInput
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={true}
                style={{
                  ...styles.input,
                  borderColor: isFocusPassword ? `#FF6C00` : `#E8E8E8`,
                }}
                onFocus={() => setIsFocusPassword(true)}
                onBlur={() => setIsFocusPassword(false)}
              />

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={handleSubmit}
                // onPress={() => navigation.navigate("PostsScreen")}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                activeOpacity={0.7}
              >
                <Text style={styles.textLogin}>
                  Немає облікового запису?{" "}
                  <Text style={(styles.textLogin, styles.textAction)}>
                    Зареєструватись
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",

    justifyContent: "flex-end",
    alignItems: "center",
  },
  back: {
    position: "relative",
    width: "100%",
    marginHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  textTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    width: 343,
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    marginBottom: 16,
  },
  btn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 30,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textLogin: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textAction: {
    color: "#053f82",
    fontFamily: "Roboto-Medium",
  },
  form: {
    marginBottom: 45,
    alignItems: "center",
  },
});
