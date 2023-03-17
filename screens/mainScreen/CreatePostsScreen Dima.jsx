import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { storage } from "./../../firebase/config";
import { db } from "./../../firebase/config";

const initialState = {
  img: null,
  title: "",
  location: "",
  locationProps: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const isFocused = useIsFocused();

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermission();
  }, []);

  //TODO
  useEffect(() => {
    (async () => {
      const locationProps = await Location.getCurrentPositionAsync({});

      setState((prevState) => ({
        ...prevState,
        locationProps: locationProps.coords,
      }));
    })();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const uploadPhotoFromGallery = async () => {
    let userImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });
    if (!userImage.canceled) {
      setState((prevState) => ({
        ...prevState,
        img: userImage.assets[0].uri,
      }));
    }
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setState((prevState) => ({
      ...prevState,
      img: photo.uri,
    }));
  };

  const onSubmit = () => {
    uploadPostToServer();
    navigation.navigate("Posts");
    setState(initialState);
  };

  const uploadPostToServer = async () => {
    await uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"), {
      ...state,
      userId,
      login,
    });
  };

  const clearAllFields = () => {
    setState(initialState);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(state.img);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const mountainImagesRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(mountainImagesRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );

    setState((prevState) => ({ ...prevState, img: processedPhoto }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{
          ...styles.container,
        }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.contentWrap}>
            <View>
              <View style={styles.cameraContainer}>
                <View style={styles.cameraWrap}>
                  {state.img && (
                    <View style={styles.photoWrap}>
                      <Image source={{ uri: state.img }} style={styles.photo} />
                    </View>
                  )}
                  {isFocused && (
                    <Camera type={type} ref={setCamera} style={styles.camera}>
                      <TouchableOpacity
                        onPress={takePhoto}
                        style={styles.takePhotoBtn}
                      >
                        <FontAwesome name="camera" size={24} color="#ffffff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={toggleCameraType}
                        style={styles.toggleCameraBtn}
                      >
                        <MaterialIcons
                          name="flip-camera-android"
                          size={24}
                          color="#ffffff"
                        />
                      </TouchableOpacity>
                    </Camera>
                  )}
                </View>
                {state.img && (
                  <TouchableOpacity
                    onPress={() =>
                      setState((prevState) => ({ ...prevState, img: null }))
                    }
                  >
                    <Text
                      style={{ marginTop: 8, fontSize: 16, color: "#BDBDBD" }}
                    >
                      Edit photo
                    </Text>
                  </TouchableOpacity>
                )}
                {!state.img && (
                  <TouchableOpacity onPress={uploadPhotoFromGallery}>
                    <Text
                      style={{
                        marginLeft: "auto",
                        marginTop: 8,
                        fontSize: 16,
                        color: "#BDBDBD",
                      }}
                    >
                      Upload photo
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputsContainer}>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={{ ...styles.input, marginTop: 32 }}
                    placeholder={"Name..."}
                    placeholderTextColor={"#BDBDBD"}
                    value={state.title}
                    onChange={({ nativeEvent: { text } }) =>
                      setState((prevState) => ({
                        ...prevState,
                        title: text,
                      }))
                    }
                  />
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={{ ...styles.input, marginTop: 16 }}
                    placeholderTextColor={"#BDBDBD"}
                    value={state.location}
                    onChange={({ nativeEvent: { text } }) =>
                      setState((prevState) => ({
                        ...prevState,
                        location: text,
                      }))
                    }
                  />
                  <View
                    style={{
                      ...styles.locationPlaceholderWrap,
                      display: state.location.length ? "none" : "flex",
                    }}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.locationPlaceholderText}>
                      Location...
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  ...styles.formBtn,
                  backgroundColor:
                    state.title.length === 0 ||
                    state.location.length === 0 ||
                    state.img == null
                      ? "#F6F6F6"
                      : "#FF6C00",
                }}
                activeOpacity={0.7}
                onPress={onSubmit}
              >
                <Text
                  style={{
                    ...styles.formBtnText,
                    color:
                      state.title.length === 0 ||
                      state.location.length === 0 ||
                      state.img == null
                        ? "#BDBDBD"
                        : "#FFFFFF",
                  }}
                >
                  Publish
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{ ...styles.clearAllBtn }}
                onPress={clearAllFields}
              >
                <AntDesign name="delete" size={24} color="#DADADA" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    backgroundColor: "#ffffff",
  },
  cameraContainer: {
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  cameraWrap: {
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  photoWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    zIndex: 1,
    width: "100%",
  },
  photo: {
    height: 240,
    width: "100%",
  },
  camera: {
    position: "relative",
    height: 240,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoBtn: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleCameraBtn: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  scroll: {
    flexGrow: 1,
  },
  contentWrap: {
    justifyContent: "space-between",
    flex: 1,
  },
  imgWrap: {},
  imgContainer: {
    overflow: "hidden",
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  img: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
  },
  imgBtn: {
    marginTop: 8,
  },
  imgBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputsContainer: {},
  inputWrap: {
    position: "relative",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  locationPlaceholderWrap: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -4 }],
    flexDirection: "row",
    alignItems: "center",
  },
  locationPlaceholderText: {
    marginLeft: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  formBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    height: 51,
    borderRadius: 51 / 2,
  },
  formBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  clearAllBtn: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
