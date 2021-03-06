import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import ShopCard from '../../components/ShopCard';
import {WishListAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import shopSlice from '../../redux/slices/shop';

/**
 * CSW, LDJ | 2022.05.19
 * @name WishListPage
 * @api WishListAPI/getWishList
 * @des
 * 좋아요 누른 가게 목록 조회 (위시리스트 조회)
 * # 사용 컴포넌트 : ShopCard
 *  */

const WishListPage = ({navigation}) => {
  const dispatch = useDispatch();
  const wish_list = useSelector(state => state.shop.wish_list);
  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  const getWishlist = useCallback(async () => {
    try {
      const res = await WishListAPI.getWishList(user_id, token);
      const wish_data = res.data.data;
      if (res.data.result === 'success') {
        dispatch(shopSlice.actions.addWishList(wish_data));
      }
    } catch (error) {
      console.log('위시리스트 조회 에러 :', error);
    }
  }, [user_id, token, dispatch]);

  const renderItem = useCallback(
    ({item}) => {
      return <ShopCard item={item} navigation={navigation} />;
    },
    [navigation],
  );

  const initShop = useCallback(() => {
    dispatch(
      shopSlice.actions.setShop({
        number: '',
        name: '',
      }),
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      initShop();
      getWishlist();
    }, [initShop, getWishlist]),
  );

  return wish_list.length >= 1 ? (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={wish_list}
          renderItem={renderItem}
          keyExtractor={item => item.shop_number}
        />
      </View>
    </View>
  ) : (
    <View style={styles.Nocontainer}>
      <Text>위시리스트 내역이 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  iconBox: {
    flex: 1,
    position: 'absolute',
    width: '20%',
    top: 5,
    right: 0,
  },
  list: {
    backgroundColor: '#CBCBCB',
  },
  Nocontainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WishListPage;
