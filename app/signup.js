import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const SignUp = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userNameError, setUserNameError] = useState('');

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        if (!validateEmail(text)) {
          setEmailError('Invalid email address');
        } else {
          setEmailError('');
        }
    };


    const validateUserName = (userName) => {
        const regex = /.{3,}/;
        return regex.test(String(userName));
    };

    const handleUserNameChange = (text) => {
        setUserName(text);
        if (!validateUserName(text)) {
            setUserNameError('Invalid UserName, it must have at least 3 letters');
        } else {
            setUserNameError('');
        }
    };

 
    const validatePassword = (password) => {
        const regex = /.{8,}/;
        return regex.test(String(password));
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (!validatePassword(text)) {
            setPasswordError('Invalid Password, it must have at least 8 chars');
        } else {
            setPasswordError('');
        }
    };



    const handleRegister = async () => {
        if (!userName || !email || !password) {
          Alert.alert("Validation Error", "Please fill in all fields.");
          alert("Validation Error. Please fill in all fields.");
          return;
        } else {
        const userDetails = { userName, email,password, token: "sample-token" };
        await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
        console.log("User logged in:", userDetails);
        router.push("/login");
        }
    };

    return (
            
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

            <Stack.Screen
                options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => (
                <></>
                ),
                headerTitle: "",
                }}
            />
            <View style={{ padding: 20 }} testID="signupContainer">
                <View
                    style={{
                        padding: 20,
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: "#f0f0f0",
                        borderRadius: 50,
                        height: 90,
                        ...SHADOWS.medium,
                        shadowColor: COLORS.white,
                    }}
                    testID="imageIcon"
                    >
                    <Image
                        source={icons.menu}
                        style={{
                        width: 50,
                        height: 50,
                        }}
                    />
                </View>

                <View style={{ marginTop: 30 }} testID="formData">

                    <View style={{ marginBottom: 10 }} testID="userName">
                        <TextInput
                        style={{
                            borderColor: "#ccc",
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                        }}
                        value={userName}
                        onChangeText={handleUserNameChange}
                        placeholder="UserName"
                        />
                        {userNameError ? <Text style={{ color: 'red' }}>{userNameError}</Text> : null}
                    </View>

                    <View style={{ marginBottom: 10 }} testID="email">
                        <TextInput
                        style={{
                            borderColor: "#ccc",
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                        }}
                        value={email}
                        onChangeText={handleEmailChange}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        />
                        {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

                    </View>

                    <View style={{ marginBottom: 20 }} testID="password">
                        <TextInput
                        style={{
                            borderColor: "#ccc",
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                        }}
                        value={password}
                        onChangeText={handlePasswordChange}
                        secureTextEntry={true}
                        placeholder="Password"
                        />
                        {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
                    </View>

                    <TouchableOpacity
                        style={{
                        backgroundColor: COLORS.primary,
                        padding: 15,
                        borderRadius: 5,
                        alignItems: "center",
                        marginBottom: 10,
                        }}
                        onPress={handleRegister}
                        testID="handleRegister"
                        >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                    
                <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                    }}
                    testID="textData"
                    >
                    <Text style={{ marginRight: 5 }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text style={{ color: "blue" }}>Login</Text>
                    </TouchableOpacity>
                </View>

               



            </View>

        </SafeAreaView>

    );
};
export default SignUp;