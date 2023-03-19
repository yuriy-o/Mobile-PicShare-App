import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
// import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { DefaultScreenPosts } from "../nestedScreens/DefaultScreenPosts";

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { storage } from "../../firebase/config";
import { db } from "../../firebase/config";

import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const initialState = {
  photo: null,
  comment: "",
  locationName: "",
  locationProps: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [locationName, setLocationName] = useState("");
  const commentHandler = (text) => setComment(text);
  const locationHandler = (text) => setLocationName(text);

  const { userId, nickName } = useSelector((state) => state.auth);

  // Вибір камери
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  const keyboardHideInput = () => {
    Keyboard.dismiss();
    setComment("");
    setLocationName("");
  };

  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        //? або
        // const location = await Location.getCurrentPositionAsync();
        // setLocation(location);
        setLocation(location.coords);
      } catch (error) {
        console.log("Error getting location", error);
      }
    };

    getLocationAsync();
  }, []);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };
  const sendPhoto = () => {
    uploadPostToServer();
    // Переходимо на сторінку DefaultScreenPosts
    navigation.navigate("DefaultScreenPosts");
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.containerPermission}>
        <Text style={styles.textPermission}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const uploadPhotoToServer = async () => {
    if (!photo) return;

    try {
      // setLoading(true);
      const response = await fetch(photo);
      const blobFile = await response.blob();
      const id = Date.now();
      const reference = ref(storage, `images/${id}`);
      const result = await uploadBytesResumable(reference, blobFile);
      const processedPhoto = await getDownloadURL(result.ref);
      //? або
      // const processedPhoto = await getDownloadURL(ref(storage, `images/${id}`));

      setPhotoURL(processedPhoto);

      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      Alert.alert("Try again \n", err.message);
    }
  };

  const uploadPostToServer = async () => {
    await uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"), {
      photoURL,
      location,
      comment,
      locationName,
      userId,
      nickName,
    });
  };

  //todo завантаження фото з галереї
  // const uploadPhotoFromGallery = async () => {
  //   let userImage = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [5, 3],
  //     quality: 1,
  //   });
  //   if (!userImage.canceled) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       img: userImage.assets[0].uri,
  //     }));
  //   }
  // };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.cameraContainer}>
          {/* Додаємо камеру */}
          <Camera style={styles.camera} ref={setCamera} type={type}>
            {/* відображаємо прев'юшку фото поверх екрану камери */}
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={styles.image} />
              </View>
            )}
            <View style={styles.buttonIconContainer}>
              <TouchableOpacity onPress={takePhoto} activeOpacity={0.9}>
                <View style={styles.backIcon}>
                  <Ionicons name="camera" size={24} color="#BDBDBD" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Завантажте фото</Text>

          <View style={styles.form}>
            <TextInput
              value={comment}
              onChangeText={commentHandler}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              style={styles.input}
            />

            <View style={styles.locationContainer}>
              <TextInput
                value={locationName}
                onChangeText={locationHandler}
                placeholder="Місцевість"
                placeholderTextColor="#BDBDBD"
                style={styles.locationPlaceholder}
              />
              <Ionicons
                style={styles.locationIcon}
                name="location-outline"
                size={24}
                color="#BDBDBD"
              />
            </View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => {
                sendPhoto();
                keyboardHideInput();
              }}
            >
              <Text style={styles.btnTitle}>Опублікувати</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  cameraContainer: {
    marginHorizontal: 16,
  },
  camera: {
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 8,
  },
  buttonIconContainer: {
    flex: 1,
    justifyContent: "center",
  },
  backIcon: {
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },

  dataContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  dataLabel: {
    fontSize: 20,
    marginBottom: 35,
    color: "#BDBDBD",
  },

  form: {
    flex: 1,
    // marginBottom: 45,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    color: "#212121",
    width: "100%",
    height: 50,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  locationContainer: {
    width: "100%",
  },
  locationPlaceholder: {
    height: 50,
    paddingLeft: 30,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    position: "absolute",
    top: 11,
  },

  btnContainer: {
    alignItems: "center",
  },
  btn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 16,
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
    // fontFamily: "Roboto-Regular",
    fontSize: 20,
  },

  containerPermission: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  textPermission: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
