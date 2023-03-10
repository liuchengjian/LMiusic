import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';

import {Const} from "../config/Const";
import AndroidBackPress from "../navigator/AndroidBackPress";
import {findList} from "../config/Http";
import Carousel from "../widget/CarouselView";
import CarouselView from "../widget/CarouselView";

export const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const androidBack = new AndroidBackPress();
    findsList();
    return androidBack.remove;
  }, []);
  const findsList = async () => {
    const res = await findList(
      {
        timestamp: new Date().getTime(),
        cookie: Const.token
      });
    setData(res.blocks)
  }
  const renderItem = (item, index) => {
    switch (item.blockCode) {
      case 'HOMEPAGE_BANNER':
        if (item.extInfo.banners) {
          return (<CarouselView
            entries={item.extInfo.banners}/>)
        } else {
          return null;
        }
      default:
        return (<Text>{item.blockCode}</Text>)
    }

  }
  const refreshControl = () => (
    <RefreshControl
      title={"刷新中..."}
      titleColor={["#2F54EB"]} //只有ios有效
      colors={["#2F54EB"]}
      tintColor={["#2F54EB"]}
      refreshing={loading}
      onRefresh={() => {
      }}
    />
  );
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content"/>
      <FlatList
        data={data}
        style={{flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        // ListEmptyComponent={listEmptyView}
        renderItem={({item, index}) => renderItem(item, index)}
        refreshControl={refreshControl()}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
