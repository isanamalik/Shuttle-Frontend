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
            <View style={[styles.shadow, { width: 70, height: 70 }]}>
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
                            // width: 35,
                            // height: 35,
                        }}
                    />
                </LinearGradient>
            </View>
            <Text style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{label}</Text>
        </TouchableOpacity>
    )
}
const StudentHomeScreen = ({ navigation }) => {

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
            <View style={{ flex: 1, marginTop: SIZES.padding }}>
                <View style={{ flexDirection: 'row', marginBottom: SIZES.padding }}>
                    <OptionItem
                        icon={icons.bus}
                        bgColor={['#46aeff', '#5884ff']}
                        label="Shuttle Routes"
                        onPress={() => {
                            navigation.navigate('ShuttleNumberScreen'
                            )
                        }}
                    />
                    <OptionItem
                        icon={icons.user}
                        bgColor={['#fca397', '#fc7b6c']}
                        label="Student Info"
                        onPress={() =>
                            navigation.navigate('StudentInfo'
                            )
                        }
                    />

                </View>

                <View style={{ flexDirection: 'row', marginTop: SIZES.padding }}>
                    <OptionItem
                        icon={icons.search}
                        bgColor={['#7be993', '#46caaf']}
                        label="Fee Status"
                        onPress={() => { console.log("fee status") }}
                    />
                    <OptionItem
                        icon={icons.compass}
                        bgColor={['#7cf1fb', '#4ebefd']}
                        label="Notifier"
                        onPress={() =>
                            navigation.navigate('NotificationScreen'
                            )
                        }
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

export default StudentHomeScreen;