import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
} from "react-native";
// import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
// import db from "../../firebase/config";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

export const CommentsScreen = ({ route }) => {
  const { postId, uri } = route.params;
  const { nickName } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const submitComment = async () => {
    await addDoc(collection(doc(collection(db, "posts"), postId), "comments"), {
      comment,
      nickName,
    });

    setComment("");
  };

  const getAllComments = async () => {
    await onSnapshot(
      collection(doc(collection(db, "posts"), postId), "comments"),
      (data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.photo} source={{ uri }} />
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={
                item.nickName === nickName
                  ? { alignItems: "flex-end" }
                  : { alignItems: "flex-start" }
              }
            >
              <View
                style={[
                  styles.commentContainer,
                  item.nickName === nickName
                    ? { backgroundColor: "rgba(0, 0, 225, 0.1)" }
                    : { backgroundColor: "rgba(0, 225, 0, 0.1)" },
                ]}
              >
                {item.nickName !== nickName && (
                  <Text style={styles.textNickName}>{item.nickName}: </Text>
                )}
                <Text style={styles.textComment}>{item.comment}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.commentFieldContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Comment..."}
            value={comment}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={submitComment}>
            <FontAwesome name="send" size={24} color="#FF6C00" />
            {/* <AntDesign name="like2" size={24} color="#ffffff" /> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexGrow: 1,
    justifyContent: "flex-end",
    // marginHorizontal: 16,
    backgroundColor: "#fff",
  },
  photo: {
    minWidth: 400,
    minHeight: 240,
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
  },
  commentContainer: {
    width: "80%",
    // height: "100%",
    // justifyContent: "space-between",
    // flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
    // borderTopLeftRadius: 0,
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  commentFieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 8,
    height: 50,
    backgroundColor: "#F6F6F6",
    border: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  input: {},
  submitBtn: {
    justifyContent: "center",
    // alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 50,
    // backgroundColor: "#FF6C00",
  },
  textNickName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  textComment: {
    fontSize: 16,
    width: 285,
  },
});
