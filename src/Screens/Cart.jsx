import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStore} from '../Store/Store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/Theme';
import Header from '../Components/Header';
import EmptyListAnimation from '../Components/EmptyListAnimation';
import PaymentFooter from '../Components/PaymentFooter';
import CartItem from '../Components/CartItem';
const Cart = ({navigation, route}) => {
  const CartList = useStore(state => state.CartList);
  const CartPrice = useStore(state => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    state => state.incrementCartItemQuantity,
  );
  const DecrementQuantity = useStore(state => state.DecrementCartItemQuantity);
  const calculateCartPrice = useStore(state => state.calculateCartPrice);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };
  const incrementCartItemQuantityHandler = (id, size) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  const decrementCartItemQuantityHandler = (id, size) => {
    DecrementQuantity(id, size);
    calculateCartPrice();
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.ScrollFlex]}>
        <View
          style={[styles.InnerScrollView, {marginBottom: bottomTabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <Header title="Cart" />
            {CartList.length === 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map(data => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}>
                    <CartItem
                      id={data.id}
                      title={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View>
            {CartList.length !== 0 ? (
              <PaymentFooter
                buttonHandler={() => {
                  buttonPressHandler();
                }}
                buttonTitle="pay"
                price={{price: CartPrice, currency: '$'}}
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollFlex: {
    flexGrow: 1,
  },
  InnerScrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_10,
    gap: SPACING.space_20,
  },
});
