import * as React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

const { width} = Dimensions.get('window')

export default class CarouselView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      sliderHeight: props.sliderHeight||200,
      entries: props.entries,
    }
  }

  _renderItem({item, index}, parallaxProps) {
    return (
      <View style={styles.item}>
        <Image
          source={{uri: item.pic}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  }
  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'rgba(208, 208, 208, 0)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render () {
    return (
      <View style={styles.carousel_container}>
        <Carousel
          sliderWidth={width}
          sliderHeight={200}
          itemWidth={width - 60}
          itemHeight={200}
          autoplay={true}
          loop={true}
          data={this.state.entries}
          renderItem={this._renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
        />
        { this.pagination }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carousel_container: {
    height:200,
    marginTop: 40,
    backgroundColor: '#ff0',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width - 60,
    height: 200,
  },
  title: {
    display: 'flex',
    position: 'absolute',
    bottom: 10,
    color: 'white',
    // backgroundColor: 'rgba(208, 208, 208, .6)',
    width: '100%',
    fontSize: 20,
    paddingLeft: 10,
    borderWidth: 5,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 5,
    borderRightWidth: 0,
    borderLeftColor: '#3399FF'
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    // width:"100%",
    // height:100

  },
})

