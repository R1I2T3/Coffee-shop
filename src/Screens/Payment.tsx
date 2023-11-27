import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/Theme';
import GradientBgIcon from '../Components/GradientBgIcon';
import PaymentMethod from '../Components/paymentMethod';
import PaymentFooter from '../Components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../Components/CustomIcon';
import {useStore} from '../Store/Store';
import PopUpAnimation from '../Components/PopUpAnimation';
const paymentList = [
  {
    name: 'Wallet',
    Icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Goggle Play',
    Icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Play',
    Icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon pay',
    Icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];
const Payment = ({navigation, route}: any) => {
  const [PaymentMode, setPayMentMode] = useState<string>('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );
  const ButtonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('OrderHistory');
    }, 2000);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <GradientBgIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payment</Text>
          <View style={styles.EmptyView} />
        </View>
        <View style={styles.PaymentOptionContainer}>
          <TouchableOpacity
            onPress={() => {
              setPayMentMode('Credit Card');
            }}>
            <View style={[styles.CreditCardContainer]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View
                style={[
                  styles.CreditCardBg,
                  {
                    borderColor:
                      PaymentMode === 'Credit Card'
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryGreyHex,
                  },
                ]}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}
                  style={styles.linearGradientCard}>
                  <View style={styles.CreditCardRow}>
                    <CustomIcon
                      name="chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name="visa"
                      size={FONTSIZE.size_30 * 2}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>{123}</Text>
                    <Text style={styles.CreditCardNumber}>{456}</Text>
                    <Text style={styles.CreditCardNumber}>{789}</Text>
                    <Text style={styles.CreditCardNumber}>{321}</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardHolderSubTitle}>
                        Card Holder name
                      </Text>
                      <Text style={styles.CreditCardHolderTitle}>
                        Robert Evans
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardHolderSubTitle}>
                        Expiry date
                      </Text>
                      <Text style={styles.CreditCardHolderTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {paymentList.map((data: any) => (
            <TouchableOpacity
              onPress={() => {
                setPayMentMode(data.name);
              }}
              key={data.name}>
              <PaymentMethod
                paymentMode={PaymentMode}
                name={data.name}
                icon={data.Icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`Pay with ${PaymentMode}`}
        price={{price: route.params.amount, currency: '$'}}
        buttonHandler={ButtonPressHandler}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  PaymentOptionContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: 40,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    marginLeft: SPACING.space_10,
  },
  CreditCardBg: {
    borderRadius: 40,
    borderWidth: 1,
  },
  linearGradientCard: {
    borderRadius: 40,
    borderWidth: 1,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    letterSpacing: SPACING.space_4,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
  CreditCardHolderTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  CreditCardHolderSubTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_12,
  },
  LottieAnimation: {
    flex: 1,
  },
});
