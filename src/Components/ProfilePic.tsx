import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/Theme';
const ProfilePic = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/app_images/avatar.png')}
        style={styles.image}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  imageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: SPACING.space_2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});
