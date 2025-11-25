import React, { useState } from "react";
import { View, SafeAreaView, Image, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


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
    


    const handleLogin = async () => {
        if (!email || !password) {
        Alert.alert("Validation Error", "Please fill in all fields.");
        alert("Validation Error. Please fill in all fields.");
        return;
        } else {

            const userDetails = { email, password, token: "sample-token" };

            console.log('userDetails', userDetails);

            try {
            const detailsDatafromSignup = await AsyncStorage.getItem("userDetails");
            if (detailsDatafromSignup) {
            const parsedDetails = JSON.parse(detailsDatafromSignup);
            if (userDetails.email === parsedDetails.email && userDetails.password === parsedDetails.password) {
                
                router.push("/home");
            } else {
            Alert.alert("Error", "Incorrect email or password.");
            alert("Error Incorrect email or password.");
            }
            } else {
            Alert.alert("Error", "No user details found in AsyncStorage.");
            alert("Error No user details found in AsyncStorage. here ");
            }
            } catch (error) {
            console.error("Error accessing AsyncStorage", error);
            }

        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => (
                <>
                </>
                ),
                headerTitle: "",
                }}
            />
            <View style={{ padding: 20 }}>
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
                    >
                    <Image
                        source={icons.menu}
                        style={{
                        width: 50,
                        height: 50,
                        marginBottom: 20,
                        }}
                    />
                </View>

                {/* Form Component */}
                <View style={{ marginTop: 20 }}>
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
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

                        <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                        }}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={handlePasswordChange}
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
                    }}
                    onPress={handleLogin}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Additional Options */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 10,
                    }}
                    >
                    <Text style={{ marginRight: 5 }}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => router.push("/signup")}>
                        <Text style={{ color: "blue" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;