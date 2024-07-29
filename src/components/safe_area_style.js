import { StyleSheet,Platform } from "react-native";
import { COLORS } from "./constants";

export default StyleSheet.create({
    androidsafearea:{
        flex:1,
        backgroundColor: 'white',
        paddingTop: Platform.OS==="android"?30:0
    }
})