import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {COLORS} from '../constants'

const Header = ({ title }) => {
    return (

        <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
        </View>

    );
};

Header.defaultProps = {
    title: 'Shuttle Routes'
};

const styles = StyleSheet.create({
    text: {
        color: '#800',
        fontSize: 23,
        textAlign: 'center'
    },
   

});

export default Header;
