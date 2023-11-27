import {ImageProps, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
interface OrderItemCardProps {
  type: string;
  name: string;
  special_ingredient: string;
  prices: any;
  itemPrice: string;
  imagelink_square: ImageProps;
}
const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  special_ingredient,
  prices,
  itemPrice,
  imagelink_square,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}
      style={styles.CardLinearGradient}>
      <View style={styles.CardInfoContainer}>
        <View style={styles.CardImageInfoContainer}>
          <Image source={imagelink_square} style={styles.Image} />
          <View>
            <Text style={styles.CardTitle}>{name}</Text>
            <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
          </View>
          <View>
            <Text style={styles.CardCurrency}>
              $<Text style={styles.ItemPrice}>{itemPrice}</Text>
            </Text>
          </View>
        </View>
      </View>
      {prices.map((data: any, index: any) => (
        <View key={index.toString()} style={styles.CardTableRow}>
          <View style={styles.CardTableRow}>
            <View style={styles.SizeBoxLeft}>
              <Text style={styles.sizeText}>{data.size}</Text>
            </View>
          </View>
          <View style={styles.PriceBoxRight}>
            <Text style={styles.PriceCurrency}>
              {data.currency} <Text style={styles.price}>{data.price}</Text>
            </Text>
          </View>
          <View style={styles.CardTableRow}>
            <Text style={styles.CardQuantityPriceText}>
              X <Text style={styles.price}>{data.quantity}</Text>
            </Text>
          </View>
          <View style={styles.CardTableRow}>
            <Text style={styles.price}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  CardLinearGradient: {
    gap: SPACING.space_20,
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardImageInfoContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  Image: {
    height: 90,
    width: 90,
    borderRadius: BORDERRADIUS.radius_15,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CardSubTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CardCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  ItemPrice: {
    color: COLORS.primaryWhiteHex,
  },
  CardTableRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBoxLeft: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 3,
    borderRightColor: COLORS.primaryGreyHex,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
  },
  PriceBoxRight: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    flex: 1,
    borderBottomRightRadius: BORDERRADIUS.radius_10,
    borderTopRightRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderColor: COLORS.primaryGreyHex,
  },
  PriceCurrency: {
    color: COLORS.primaryOrangeHex,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
  },
  CardQuantityPriceText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
  },
});
