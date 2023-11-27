import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/Theme';
import CustomIcon from './CustomIcon';
interface PaymentMethodProps {
  paymentMode: string;
  name: string;
  icon: any;
  isIcon: boolean;
}
const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMode,
  name,
  icon,
  isIcon,
}) => {
  return (
    <View
      style={[
        styles.PaymentCardContainer,
        {
          borderColor:
            paymentMode === name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex,
        },
      ]}>
      {isIcon ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.LinearGradientWallet}>
          <View style={styles.WalletRow}>
            <CustomIcon
              name="wallet"
              color={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_30}
            />
            <Text style={styles.PaymentTitle}>{name}</Text>
            <Text style={styles.PaymentPrice}>100.5</Text>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.LinearGradientRegular}>
          <Image source={icon} style={styles.PaymentImage} />
          <Text style={styles.PaymentTitle}>{name}</Text>
        </LinearGradient>
      )}
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  PaymentCardContainer: {
    borderRadius: 40,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderWidth: 3,
  },
  LinearGradientWallet: {
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
  },
  WalletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_24,
  },
  PaymentTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  PaymentPrice: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  LinearGradientRegular: {
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
  },
  PaymentImage: {
    height: SPACING.space_30,
    width: SPACING.space_30,
  },
});
