import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainBackground from '../../assets/Mainbackground.jpg';

/**
 * CSW | 2022.04.26
 * @name MainPage
 * @des
 * 버튼을 통해 페이지가 잘 넘어가지는지 테스트 버튼 넣어놓은 상태
 * TODO
 * 1. 4가지 태그 부분 추가
 * 2. 닉네임 받기
 * 3. 검색어 넘겨주기
 *  */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    fontSize: 14,
    marginLeft: 10,
  },
  inputBox: {
    flex: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '70%',
    height: '11%',
    borderRadius: 10,
    borderColor: '#F2A7B3',
    borderWidth: 1.5,
    marginTop: '20%',
  },
  iconBox: {
    flex: 1,
    position: 'absolute',
    width: '20%',
    top: 5,
    right: 0,
  },
  mapBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    backgroundColor: '#F2A7B3',
    width: '35%',
    borderRadius: 40,
    marginTop: '20%',
    marginBottom: '30%',
    height: 40,
  },
  rowBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  columnBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Btn: {
    backgroundColor: '#F15C74',
    color: 'black',
    width: '30%',
    alignItems: 'center',
    borderRadius: 12,
    height: 80,
    justifyContent: 'center',
    marginRight: '3%',
    marginBottom: '3%',
    marginLeft: '3%',
  },
});

const MainPage = ({navigation}) => {
  const [inputText, setInputText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageBox}>
        <ImageBackground
          source={MainBackground}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              placeholder="검색어를 입력하세요."
              value={inputText}
              onChangeText={setInputText}></TextInput>
            <View style={styles.iconBox}>
              <Icon.Button
                onPress={() =>
                  navigation.navigate('Search', {navigation: `${navigation}`})
                }
                name="search-outline"
                color="black"
                backgroundColor="white"
              />
            </View>
          </View>
          <View style={styles.mapBox}>
            <Icon
              name="map-outline"
              color="white"
              backgroundColor="white"
              size={20}
              onPress={() =>
                navigation.navigate('Map', {navigation: `${navigation}`})
              }
            />
            <Text
              style={{color: 'white', fontWeight: 'bold'}}
              onPress={() =>
                navigation.navigate('Map', {navigation: `${navigation}`})
              }>
              지도에서 찾기
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.rowBox}>
        <Text
          style={{
            color: 'black',
            marginTop: '5%',
            marginBottom: '5%',
            marginLeft: '5%',
          }}
          onPress={() =>
            navigation.navigate('Map', {navigation: `${navigation}`})
          }>
          청바지님, 이런 피크닉은 어떤가요?
        </Text>
        <View style={styles.columnBox}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('#', {navigation: `${navigation}`})
            }>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              #가성비
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('#', {navigation: `${navigation}`})
            }>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              #깔끔
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columnBox}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('#', {navigation: `${navigation}`})
            }>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              #감성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('#', {navigation: `${navigation}`})
            }>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              #다양한구성
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default MainPage;
