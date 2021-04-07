import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image, TouchableOpacity } from 'react-native';
// import Header from '../../components/Header'
import LinearGradient from 'react-native-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';

const OptionItem = ({ bgColor, icon, label, onPress }) => {
    return (
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={onPress}
        >
            <View style={[styles.shadow, { width: 60, height: 60 }]}>
                <LinearGradient
                    style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'red' }]}
                    colors={bgColor}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style={{
                            tintColor: COLORS.white,
                            width: 30,
                            height: 30,
                        }}
                    />
                </LinearGradient>
            </View>
            <Text style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{label}</Text>
        </TouchableOpacity>
    )
}
const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            {/* Banner */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={images.ned}
                    // resizeMode="cover"
                    // style={{
                    //     width: "100%",
                    //     height: "100%",
                    //     borderRadius: 15,
                    // }}
                    resizeMode="contain"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base }}>
                    <OptionItem
                        icon={icons.villa}
                        bgColor={['#46aeff', '#5884ff']}
                        label="Admin"
                        onPress={() => {
                            navigation.navigate('AdminScreen'
                            )
                        }}
                    />
                    <OptionItem
                        icon={icons.user}
                        bgColor={['#fca397', '#fc7b6c']}
                        label="Student"
                        onPress={() =>
                            navigation.navigate('StudentHomeScreen'
                            )
                        }
                    />
                    <OptionItem
                        icon={icons.bus}
                        bgColor={['#e973ad', '#da5df2']}
                        label="Driver"
                        onPress={() => { navigation.navigate('DriverScreen') }}
                    />
                </View>
            </View>
         
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }

});

export default HomeScreen;