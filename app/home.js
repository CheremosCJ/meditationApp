import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenHeaderBtn from "../components/ScreenHeaderBtn.js";
import Welcome from "../components/welcome.js";
import PopularMeditation from "../components/PopularMeditation.js";
import DailyMeditation from "../components/DailyMeditation";


const loadUserDetails = async () => {
    const user = await AsyncStorage.getItem('userDetails');
    console.log("user leido aqui", user);
    setUserDetails(user);
};

const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    loadUserDetails();
  }, []);

const jsonString1 = '{"userName" :"vacio 1"}';
const jsonString2 = '{"userName" :"vacio 2"}';

const Home = () => {
    return (
        <>
            
            
            
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <ScreenHeaderBtn/>
                    
                    <View style={{ flex: 1, padding: SIZES.medium,}} testID="screensDisplay">
                        <Welcome userDetails={userDetails ? JSON.parse(userDetails) : null} />
                        <PopularMeditation/>
                        <DailyMeditation/>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    );
  };
  export default Home;