import { useState, useEffect } from "react";
import * as Font from 'expo-font'

const cutomfonts = {
    'regular':require('../Assets/Fonts/Outfit-Regular.ttf'),
    'bold':require('../Assets/Fonts/Outfit-Bold.ttf'),
    'semi-bold':require('../Assets/Fonts/Outfit-SemiBold.ttf'),
    'medium-bold':require('../Assets/Fonts/Outfit-Medium.ttf'),
    'thin-bold':require('../Assets/Fonts/Outfit-Thin.ttf'),    
}

export function CustomFonts () {
    const [fontsloaded,setfontsloaded] = useState(false)
    useEffect(()=>{
        async function loadfonts (){
            await Font.loadAsync(cutomfonts);
            setfontsloaded(true)
        }
        loadfonts()
    },[]);
    return fontsloaded
}