import * as React from 'react';
import { TextInput, View, Text, StyleSheet, Dimensions } from 'react-native';

//Config

const WINDOW_WIDTH = Dimensions.get('window').width;

let a = Array.from(Array(4).keys());

const OtpInput = ({ code, onChangeText }) => {

    return (
        <View style={{ width: WINDOW_WIDTH/1.5 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {a.map((item, index) => {
                    return (
                        <View key={index.toString()} style={styles.oneNumberView}>
                            <Text style={styles.numberStyle}>{code.slice(index, index + 1)}</Text>
                        </View>
                    )
                })}
            </View>

            <TextInput
                value={code}
                onChangeText={onChangeText}
                keyboardType="number-pad"
                style={styles.textInput}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    oneNumberView: {
        flex: 1,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
    },
    numberStyle: {
        fontSize: 14,
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        paddingVertical: 25,
        height: 0,
        backgroundColor: 'transparent',
        position: 'absolute',
    }
})

export default OtpInput;