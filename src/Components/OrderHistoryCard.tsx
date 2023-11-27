import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/Theme';
import OrderItemCard from './OrderItemCard';
interface OrderHistoryCarProps {
  CartListPrice: string;
  OrderDate: string;
  OrderTime: string;
  CartList: any;
  NavigationHandler: any;
}
const OrderHistoryCard: React.FC<OrderHistoryCarProps> = ({
  CartListPrice,
  OrderDate,
  OrderTime,
  CartList,
  NavigationHandler,
}) => {
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View style={styles.DateContainer}>
          <Text style={styles.HeaderTitle}>Order Time</Text>
          <Text style={styles.HeaderSubTitle}>{OrderDate}</Text>
          <Text style={styles.HeaderSubTitle}>{OrderTime}</Text>
        </View>
        <View style={styles.HeaderInnerContainer}>
          <Text style={styles.HeaderTitle}>Total Price</Text>
          <Text style={styles.HeaderPriceSubTitle}>$ {CartListPrice}</Text>
        </View>
      </View>
      <View style={styles.ListContainer}>
        {CartList.map((data: any) => {
          return (
            <TouchableOpacity
              key={data.id}
              onPress={() => {
                NavigationHandler({
                  index: data.index,
                  id: data.id,
                  type: data.type,
                });
              }}>
              <OrderItemCard
                type={data.type}
                name={data.name}
                imagelink_square={data.imagelink_square}
                prices={data.prices}
                special_ingredient={data.special_ingredient}
                itemPrice={data.ItemPrice}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default OrderHistoryCard;

const styles = StyleSheet.create({
  CardContainer: {
    gap: SPACING.space_10,
  },
  CardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  HeaderSubTitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  HeaderInnerContainer: {
    alignItems: 'flex-end',
  },
  HeaderPriceSubTitle: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  DateContainer: {
    flexDirection: 'column',
  },
  ListContainer: {
    gap: SPACING.space_20,
  },
});
