import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    header: {
        // height: 60,
        padding: 15,
        
        // backgroundColor: 'darkslateblue'
    },
    text: {
        color: 'darkslateblue',
        fontSize: 23,
        textAlign: 'center',
        // fontWeight: 'bold',
    },

});

export default Header;
