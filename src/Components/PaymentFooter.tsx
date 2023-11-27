import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
interface PriceProps {
  price: string;
  currency: string;
}
interface PaymentFooterProps {
  price: PriceProps;
  buttonTitle: string;
  buttonHandler: any;
}
const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonTitle,
  buttonHandler,
}) => {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.priceTitle}>Price</Text>
        <Text style={styles.priceValue}>
          {price.currency} <Text>{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={buttonHandler}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  PriceContainer: {
    alignItems: 'center',
    width: 100,
  },
  priceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  priceValue: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
  },
  payButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_25,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});
