import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Message from "react-native-vector-icons/Ionicons";
import { COLORS } from "../components/constants";
import { CustomFonts } from "../components/CustomFonts";

const SupportScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: "0",
      text: "Hi Tommy Shelby",
      sent: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      id: "1",
      text: `Welcome to the Doctor Appointment Booking App. How can we assist you today?`,
      sent: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    // {
    //   id: "2",
    //   text: "Refresh your app, ensure network stability 📶",
    //   sent: false,
    //   time: new Date().toLocaleTimeString([], {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   }),
    // },
  ]);
  const [inputText, setInputText] = useState("");

  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }

  const sendMessage = () => {
    if (inputText.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages([
        ...messages,
        {
          id: messages.length.toString(),
          text: inputText,
          sent: true,
          time: currentTime,
        },
      ]);
      setInputText("");
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 15 }}>
      <View style={{ flexDirection: item.sent ? "row-reverse" : "row" }}>
        {/* {!item.sent && <Image source={require('../../assets/images/AnbeSiva.png')} style={styles.logo} />} */}
        <Message
          name="chatbubble-ellipses"
          style={{ marginRight: 5 }}
          size={20}
          color={COLORS.primary}
        />

        <View
          style={[
            styles.messageContainer,
            item.sent ? styles.sentMessage : styles.receivedMessage,
          ]}
        >
          <View style={styles.messageContent}>
            <Text
              style={
                item.sent ? styles.sentMessageText : styles.receivedMessageText
              }
            >
              {item.text}
            </Text>
          </View>
        </View>
      </View>
      <Text style={item.sent ? styles.recivetime : styles.messageTime}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {!inputText && (
        <View style={{ justifyContent: "center" }}>
          <Image
            style={{
              width: 250,
              height: 200,
              alignSelf: "center",
              opacity: 0.5,
            }}
            source={require("../Assets/support-png.png")}
          />
        </View>
      )}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  messagesList: {
    padding: 10,
  },
  recivetime: {
    fontSize: 12,
    color: COLORS.black,
    alignSelf: "flex-end",
    fontFamily: "regular",
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    maxWidth: "70%",
  },
  messageContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sentMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
    marginRight: 5,
  },
  receivedMessage: {
    backgroundColor: COLORS.header_color,
    alignSelf: "flex-start",
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 50,
  },
  sentMessageText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: "regular",
  },
  receivedMessageText: {
    color: COLORS.black,
    fontSize: 15,
    textAlign: "left",
    fontFamily: "regular",
  },
  messageTime: {
    fontSize: 12,
    color: COLORS.black,
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 0.7,
    borderTopColor: COLORS.light_gray,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 0.7,
    borderColor: COLORS.light_gray,
    backgroundColor: COLORS.baby_gray,
    fontSize: 15,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SupportScreen;
