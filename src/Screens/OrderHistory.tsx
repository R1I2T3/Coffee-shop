import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PopUpAnimation from '../Components/PopUpAnimation';
import React, {useState} from 'react';
import {useStore} from '../Store/Store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/Theme';
import Header from '../Components/Header';
import {SPACING} from '../theme/Theme';
import EmptyListAnimation from '../Components/EmptyListAnimation';
import OrderHistoryCard from '../Components/OrderHistoryCard';
const OrderHistory = ({navigation}: any) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const ButtonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };
  const NavigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollFlex}>
        <View style={[styles.InnerScrollView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <Header title="Order History" />
            {OrderHistoryList.length === 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data: any) => (
                  <OrderHistoryCard
                    key={data.OrderTime}
                    NavigationHandler={NavigationHandler}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                    CartList={data.CartList}
                    OrderTime={data.OrderTime}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={ButtonPressHandler}>
              <Text style={styles.DownloadButtonText}>DownLoad History</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

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
  LottieAnimation: {
    flex: 1,
  },
  DownloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  DownloadButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
