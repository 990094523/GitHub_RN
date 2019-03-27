import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabBar } from 'react-navigation-tabs';

const TABS = {
  // 在这里配置路由页面
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: (({tintColor, focused}) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          color={tintColor}
        />
      ))
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: (({tintColor, focused}) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          color={tintColor}
        />
      ))
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: (({tintColor, focused}) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          color={tintColor}
        />
      ))
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: (({tintColor, focused}) => (
        <Entypo
          name={'user'}
          size={26}
          color={tintColor}
        />
      ))
    }
  },
};

type Props = {};
export default class DynamicTabNavigator extends Component<Props> {

  _tabNavigator() {
    const {PopularPage, MyPage, TrendingPage, FavoritePage} = TABS;
    PopularPage.navigationOptions.tabBarLabel = '最新';
    // 根据需要定制显示的 tab
    const tabs = {PopularPage, MyPage, TrendingPage, FavoritePage};
    return createBottomTabNavigator(
      tabs,
      {
        tabBarComponent: TabBarComponent
      }
    );
  }


  render() {
    const Tab = this._tabNavigator();
    return <Tab/>;
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    };
  }

  render() {
    const {routes, index} = this.props.navigation.state;
    if (routes[index].params) {
      const {theme} = routes[index].params;
      // 以最新的更新时间为主，防止被其它的 tab 之前的修改覆盖掉
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});