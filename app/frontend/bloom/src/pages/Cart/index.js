import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import CartCardList from '../../components/CartCard';
import CartFooter from '../../components/CartCard/footer';
import {cartAPI} from '../../utils/Axios';
import {useSelector} from 'react-redux';

/**
 * CSW | 2022.04.28
 * @name CartPage
 * @des
 * 검색인풋박스와 shop컴포넌트를 보여주는 검색결과페이지입니다.
 * TODO
 * 1. navition 카드별로 적용
 *  */

const CartPage = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const user_id = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.accessToken);

  const getCart = async () => {
    try {
      const res = await cartAPI.getCartList(user_id, token);
      setData(res.data);
    } catch (error) {
      console.log('장바구니 검색', error);
    }
  };

  const renderItem = ({item}) => {
    return <CartCardList item={item} navigation={navigation} />;
  };

  useFocusEffect(
    useCallback(() => {
      getCart();
    }, []),
  );

  return (
    <>
      {data.length >= 1 ? (
        <View style={styles.container}>
          <View style={styles.list}>
            <FlatList
              //리스트의 소스를 담는 속성
              //data={data}
              data={data}
              //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
              renderItem={renderItem}
              //item의 고유의 키를 부여하는 속성
              keyExtractor={item => item.cart_id}
              //무한 스크롤때문에 넣은듯
              // onEndReached={() => {if(loading===false && pageNum<=totalPageCnt) getMyPillHistoryList()}}
              // onEndReachedThreshold={0.4}
              ListFooterComponent={CartFooter}
            />
          </View>
        </View>
      ) : (
        <View style={styles.Nocontainer}>
          <Text>장바구니 내역이 없습니다.</Text>
        </View>
      )}
    </>
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
    flex: 3,
  },
  Nocontainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartPage;
