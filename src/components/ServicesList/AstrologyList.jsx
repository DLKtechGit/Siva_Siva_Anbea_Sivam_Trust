import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { data } from "../../Data/YogaData";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { COLORS } from "../constants";
  import Icon from "react-native-vector-icons/Feather";
  import Icon2 from "react-native-vector-icons/AntDesign";
  import { Modal } from "react-native";
  import { CustomFonts } from "../CustomFonts";
  import { useNavigation } from "@react-navigation/native";
  
  const Doctorinfo = ({ visible, onclose, item, onclose1 }) => (
    <Modal
      visibleisible={visible}
      animationType="fade"
      onRequestClose={onclose}
      transparent={true}
    >
      {/* modal main container */}
      <View style={styles.modal_main_container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* modal content */}
          <View style={styles.modal_content}>
            {/* image text container */}
            <View style={styles.img_txt_container}>
              <Image source={item.image} style={styles.modal_img} />
              {/* name container */}
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text style={styles.modal_doc_name}>{item.name}</Text>
                <Text style={styles.modal_doc_speciality}>{item.speciality}</Text>
              </View>
            </View>
            <Text style={styles.modal_doc_desc}>{item.description}</Text>
            <Text style={styles.modal_doc_fees}>Fees: {item.fees}</Text>
  
            {/* book appoinment btn container */}
            <TouchableOpacity
              style={styles.modal_book_app_btn}
              onPress={onclose1}
            >
              <Text style={styles.modal_book_app_btn_txt}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* close modal icon container */}
        <TouchableOpacity onPress={onclose} style={styles.close_btn}>
          <Icon2 name="closecircle" size={25} color={"rgba(0,0,0,0.40)"} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
  
  const AstrologyList = () => {
    const [selecteddoctor, setselecteddoctor] = useState(null);
    const [modalvisible, setmodalvisible] = useState(false);
    const [selectedbtn, setselectedbtn] = useState(null);
  
    const navigation = useNavigation();
  
    const fontsloaded = CustomFonts();
    if (!fontsloaded) {
      return null;
    }
  
    const openmodal = (item) => {
      setselecteddoctor(item), setmodalvisible(true);
    };
  
    const closemodal = () => {
      setselecteddoctor(null), setmodalvisible(false);
    };
  
    const handlebookbtn = () => {
      setmodalvisible(false);
      alert("Doctor Selected successful");
    };
  
    const Bookbtn = (i) => {
      setselectedbtn(i === selectedbtn ? null : i);
      console.log(i);
      navigation.navigate("OtherBooking");
    };
  
    return (
      // main container
      <>
        {data.map((item, i) => {
          return (
            // main container
            <View key={i} style={styles.main_container}>
              {/*Doctor image container */}
              <View style={styles.img_container}>
                <Image source={item.image} style={styles.img} />
              </View>
              {/*doctor text container */}
              <View style={styles.txt_container}>
                <Text style={styles.doc_name}>{item.name}</Text>
                <Text style={styles.doc_speciality}>{item.speciality}</Text>
                <Text style={styles.doc_desc}>
                  {item.description.length > 30
                    ? item.description.slice(0, 60)
                    : item.description}
                  <Text>...</Text>
                </Text>
                {/* fees and booking button */}
                <View style={styles.fees_btn_container}>
                  {/* fees */}
                  <Text style={styles.doc_fees}>{item.fees}</Text>
                  {/* book button */}
                  <TouchableOpacity
                    style={[
                      styles.book_app_btn,
                      i === selectedbtn && styles.selected_book_app_btn,
                    ]}
                    key={i}
                    onPress={() => Bookbtn(i)}
                  >
                    <Text
                      style={[
                        styles.book_app_txt,
                        i === selectedbtn && styles.selected_book_app_txt,
                      ]}
                    >
                      Book
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
  
              <Pressable onPress={() => openmodal(item)} style={styles.icon}>
                <Icon name="info" size={20} color={COLORS.dark_gray} />
              </Pressable>
              {selecteddoctor && (
                <Doctorinfo
                  visible={modalvisible}
                  onclose={closemodal}
                  item={selecteddoctor}
                  onclose1={handlebookbtn}
                />
              )}
            </View>
          );
        })}
      </>
    );
  };
  
  export default AstrologyList;
  
  const styles = StyleSheet.create({
    main_container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: wp(3),
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      position: "relative",
      marginBottom: 15,
    },
    img: {
      width: wp(25),
      height: hp(14),
      objectFit: "cover",
      borderRadius: 8,
    },
    img_container: {
      width: wp(25),
      height: hp(14),
    },
    txt_container: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      gap: 2,
      width: wp(61),
    },
    doc_name: {
      fontFamily: "semi-bold",
      fontSize: hp(2),
    },
    doc_speciality: {
      fontFamily: "medium-bold",
      fontSize: hp(1.7),
      color: COLORS.dark_gray,
    },
    doc_desc: {
      fontFamily: "regular",
      fontSize: 13,
    },
    doc_fees: {
      fontSize: hp(1.7),
      fontFamily: "bold",
    },
    fees_btn_container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      borderTopWidth: 1,
      borderTopColor: COLORS.very_light_gray,
      borderStyle: "dashed",
      paddingTop: 5,
      marginTop: 5,
    },
    book_app_btn: {
      backgroundColor: COLORS.primary,
      padding: 5,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 15,
      marginRight: 10,
    },
    selected_book_app_btn: {
      backgroundColor: COLORS.white,
      padding: 3,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 13,
      marginRight: 10,
      borderColor: COLORS.primary,
      borderWidth: 2,
    },
    book_app_txt: {
      color: COLORS.white,
      fontFamily: "semi-bold",
    },
    selected_book_app_txt: {
      color: COLORS.primary,
      fontFamily: "semi-bold",
    },
    icon: {
      position: "absolute",
      top: 12,
      right: 12,
    },
    modal_main_container: {
      height: hp(40),
      backgroundColor: COLORS.white,
      padding: 15,
      position: "absolute",
      bottom: 0,
      width: wp(100),
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderColor: COLORS.light_gray,
      borderWidth: 2,
    },
    modal_img: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    img_txt_container: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
    },
    modal_content: {
      display: "flex",
      // alignItems: "center",
      flexDirection: "column",
    },
    close_btn: {
      position: "absolute",
      right: 13,
      top: 13,
    },
    modal_doc_name: {
      fontSize: hp(2.5),
      fontFamily: "bold",
      marginTop: hp(0.7),
      marginBottom: hp(0.4),
    },
    modal_doc_speciality: {
      fontSize: hp(1.8),
      fontFamily: "semi-bold",
      color: COLORS.dark_gray,
    },
    modal_doc_desc: {
      fontSize: hp(1.8),
      width: "100%",
      textAlign: "justify",
      marginVertical: hp(0.9),
      fontFamily: "regular",
    },
    modal_doc_fees: {
      fontFamily: "semi-bold",
      fontSize: hp(2),
      textAlign: "left",
      width: "100%",
    },
    modal_book_app_btn: {
      backgroundColor: COLORS.primary,
      width: "100%",
      padding: 9,
      marginTop: hp(1),
      borderRadius: 5,
    },
    modal_book_app_btn_txt: {
      color: COLORS.white,
      fontFamily: "semi-bold",
      fontSize: hp(2),
      textAlign: "center",
    },
  });
  