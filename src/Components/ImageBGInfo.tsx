import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GradientBgIcon from './GradientBgIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/Theme';
import CustomIcon from './CustomIcon';
interface ImageBGInfoProp {
  EnableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavourite: any;
}
const ImageBGInfo: React.FC<ImageBGInfoProp> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ImageBackground}>
        <View style={styles.imageLayout}>
          {EnableBackHandler ? (
            <View style={styles.ImageHeaderBarContainerWithBack}>
              <TouchableOpacity onPress={BackHandler}>
                <GradientBgIcon
                  name="left"
                  color={COLORS.primaryLightGreyHex}
                  size={FONTSIZE.size_16}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}>
                <GradientBgIcon
                  name="like"
                  color={
                    favourite
                      ? COLORS.primaryRedHex
                      : COLORS.primaryLightGreyHex
                  }
                  size={FONTSIZE.size_16}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.ImageHeaderBarContainerWithoutBack}>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}>
                <GradientBgIcon
                  name="like"
                  color={
                    favourite
                      ? COLORS.primaryRedHex
                      : COLORS.primaryLightGreyHex
                  }
                  size={FONTSIZE.size_16}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.imageInfoOuterContainer}>
            <View style={styles.imageInfoInnerContainer}>
              <View style={styles.imageInfoContainerRow}>
                <View>
                  <Text style={styles.itemTitleText}>{name}</Text>
                  <Text style={styles.itemSubTitleText}>
                    {special_ingredient}
                  </Text>
                </View>
                <View style={styles.itemPropertyContainer}>
                  <View style={styles.FirstProperty}>
                    <CustomIcon
                      name={type === 'Bean' ? 'bean' : 'beans'}
                      size={
                        type === 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24
                      }
                      color={COLORS.primaryOrangeHex}
                    />
                    <Text
                      style={[
                        styles.PropertyTextFirst,
                        // eslint-disable-next-line react-native/no-inline-styles
                        {marginTop: type === 'Bean' ? SPACING.space_2 * 3 : 0},
                      ]}>
                      {type}
                    </Text>
                  </View>
                  <View style={styles.FirstProperty}>
                    <CustomIcon
                      name={type === 'Bean' ? 'location' : 'drop'}
                      size={FONTSIZE.size_16}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Text style={[styles.PropertyTextFirst]}>
                      {ingredients}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.imageInfoContainerRow}>
                <View style={styles.ratingContainer}>
                  <CustomIcon
                    name="star"
                    color={COLORS.primaryOrangeHex}
                    size={FONTSIZE.size_20}
                  />
                  <Text style={styles.ratingText}>{average_rating}</Text>
                  <Text style={styles.ratingCountText}>{ratings_count}</Text>
                </View>
                <View style={styles.roastedContainer}>
                  <Text style={styles.roastedText}>{roasted}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  imageLayout: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  ImageHeaderBarContainerWithBack: {
    padding: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ImageHeaderBarContainerWithoutBack: {
    padding: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageInfoOuterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  imageInfoInnerContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_15,
  },
  imageInfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitleText: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  itemSubTitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  itemPropertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  FirstProperty: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  PropertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  ratingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  roastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  roastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
});

export default ImageBGInfo;
