import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import appColors from '../colors';

const LandingPage2 = ({setIsPageTwo, setIsPageThree}) => {
  return (
    <View>
      <Text>screen 2</Text>
      <View>
        <Button onPress={() => [setIsPageTwo(false), setIsPageThree(true)]}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
};

export default LandingPage2;
