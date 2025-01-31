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
  Linking,
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

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWaPress = (link) => {
    Linking.openURL(link);
  };

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

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
      <Text style={styles.normalText}>
        We're here to help! Reach out to us for any questions or feedback.
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.textBContainer}>Support:</Text>
      </View>
      <View style={styles.iconContainer}>
        <Message
          name="mail-outline"
          color={COLORS.primary}
          style={styles.img}
          size={30}
        />
        <TouchableOpacity
          onPress={() => handleEmailPress("support@sivasivaanbaesivam.com")}
        >
          <Text style={styles.emailText}> support@sivasivaanbaesivam.com</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textBContainer}>Enquiry:</Text>
      </View>
      <View style={styles.iconContainer}>
        <Message
          name="mail-outline"
          color={COLORS.primary}
          style={styles.img}
          size={30}
        />
        <TouchableOpacity
          onPress={() =>
            handleEmailPress("sivasivaanbaesivamoffical@gmail.com")
          }
        >
          <Text style={styles.emailText}>
            {" "}
            sivasivaanbaesivamoffical@gmail.com
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textBContainer}>Call or WhatsApp:</Text>
      </View>
      <View style={styles.iconContainer}>
        <Message
          name="call-outline"
          color={COLORS.primary}
          style={styles.img}
          size={30}
        />
        <TouchableOpacity onPress={() => handleCallPress("7550250425")}>
          <Text style={styles.emailText}>+91 7550250425</Text>
        </TouchableOpacity>
        <Text style={styles.emailText1}>/</Text>
        <TouchableOpacity onPress={() => handleCallPress("7538850425")}>
          <Text style={styles.emailText}> +91 7538850425</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textBContainer}>Working Hours:</Text>
        <Text style={styles.textContainer1}>
          Monday to Friday: 09:00 AM - 09:00 PM
        </Text>
        <Text>Saturday & Sunday: 09:00 AM - 08:00 PM</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textContainer2}>WHATSAPP LINK:</Text>
        <TouchableOpacity
          onPress={() =>
            handleWaPress("https://chat.whatsapp.com/Ci0NLz0vBjM4QbGl2ZSixu")
          }
        >
          <Text style={styles.emailText}> Join our group</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textContainer2}>Delete Your Account :</Text>
        <TouchableOpacity
          onPress={() =>
            handleWaPress(
              "https://1crorebahrainjobs.com/siva_siva_trust/DeleteAccount.html"
            )
          }
        >
          <Text style={styles.emailText}> View Details</Text>
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
  textContainer: {
    paddingHorizontal: 20,
  },
  textBContainer: {
    fontWeight: "bold",
  },
  textContainer2: {
    paddingVertical: 15,
    fontWeight: "bold",
  },
  textContainer1: {
    paddingVertical: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  normalText: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    fontStyle: "italic",
  },
  emailText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  emailText1: {
    fontSize: 14,
    marginLeft: 4,
    marginRight: 4,
  },
  img: {
    marginRight: 10,
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

// import React, { useRef, useState } from 'react';
// import { StyleSheet, View, Text, Button, Image, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';

// const AvatarGenerator = () => {
//   const [avatarUrl, setAvatarUrl] = useState(null); // Store generated avatar URL
//   const webViewRef = useRef(null); // Reference to the WebView

//   // Handle messages from WebView
//   const handleWebViewMessage = (event) => {
//     try {
//       const message = JSON.parse(event.nativeEvent.data);

//       if (message?.url) {
//         setAvatarUrl(message.url); // Save the avatar URL
//         Alert.alert('Avatar Created!', `Your avatar has been created successfully!`);
//         console.log('Avatar URL:', message.url);
//       }
//     } catch (error) {
//       console.error('Error parsing WebView message:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {avatarUrl ? (
//         // Display the generated avatar
//         <View style={styles.avatarContainer}>
//           <Text style={styles.title}>Your Avatar</Text>
//           <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
//           <Button title="Generate Another Avatar" onPress={() => setAvatarUrl(null)} />
//         </View>
//       ) : (
//         // Show the WebView to create the avatar
//         <WebView
//           ref={webViewRef}
//           source={{ uri: 'https://readyplayer.me/avatar' }}
//           style={styles.webView}
//           javaScriptEnabled
//           onMessage={handleWebViewMessage}
//           injectedJavaScript={`
//             window.addEventListener('message', (event) => {
//               const { origin, data } = event;
//               if (origin === "https://readyplayer.me" && data) {
//                 window.ReactNativeWebView.postMessage(JSON.stringify(data));
//               }
//             });

//             // Notify Ready Player Me that we're ready to listen for messages
//             window.postMessage(JSON.stringify({ type: 'subscribe', eventName: 'v1.avatar.exported' }));
//           `}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webView: {
//     flex: 1,
//   },
//   avatarContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//     fontWeight: 'bold',
//   },
//   avatarImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     marginBottom: 20,
//   },
// });

// export default AvatarGenerator;
