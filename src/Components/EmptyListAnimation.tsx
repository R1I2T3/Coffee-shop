import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/Theme';
interface EmptyListAnimationProps {
  title: string;
}
const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({title}) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        source={require('../lottie/coffeecup.json')}
        style={styles.LottyStyle}
        autoPlay
        loop
      />
      <Text style={styles.LottyText}>{title}</Text>
    </View>
  );
};

export default EmptyListAnimation;

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  LottyStyle: {
    height: 300,
  },
  LottyText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});
