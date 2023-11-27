import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../Store/Store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
import {StatusBar} from 'react-native';
import ImageBGInfo from '../Components/ImageBGInfo';
import PaymentFooter from '../Components/PaymentFooter';

const Details = ({navigation, route}) => {
  const ItemOfIndex = useStore(state =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  const addToFavouriteList = useStore(state => state.addToFavoriteList);
  const removefromFavouriteList = useStore(
    state => state.deleteFromFavoriteList,
  );
  const addToCart = useStore(state => state.addToCart);
  const calculateCartPrice = useStore(state => state.calculateCartPrice);
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };
  const ToggleFavourite = (FavouriteItem, id, type) => {
    FavouriteItem
      ? removefromFavouriteList(type, id)
      : addToFavouriteList(type, id);
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollView}>
        <ImageBGInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={() => {
            navigation.pop();
          }}
          ToggleFavourite={(favourite, type, id) => {
            favourite
              ? removefromFavouriteList(type, id)
              : addToFavouriteList(type, id);
          }}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {isFullDescription ? (
            <TouchableWithoutFeedback
              onPress={() => setIsFullDescription(!isFullDescription)}>
              <Text style={styles.descriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setIsFullDescription(!isFullDescription)}>
              <Text numberOfLines={3} style={styles.descriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Sizes</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemOfIndex.prices.map(data => (
              <TouchableOpacity
                onPress={() => setPrice(data)}
                key={data.size}
                style={[
                  styles.sizeBox,
                  {
                    borderColor:
                      data.size === price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        ItemOfIndex.type === 'bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                    },
                    {
                      color:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <PaymentFooter
            price={price}
            buttonTitle="Add to cart"
            buttonHandler={() => {
              addToCarthandler({
                id: ItemOfIndex.id,
                index: ItemOfIndex.index,
                name: ItemOfIndex.name,
                roasted: ItemOfIndex.roasted,
                imagelink_square: ItemOfIndex.imagelink_square,
                special_ingredient: ItemOfIndex.special_ingredient,
                type: ItemOfIndex.type,
                price: price,
              });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollView: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: 10,
  },
  descriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: 30,
    textAlign: 'justify',
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  sizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
