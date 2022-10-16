import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, View, FlatList, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { data } from './src/common'

const normalize = (data) => {
  for (let i = 1; i <= data.length % 2; i++) {
    data.push({})
  }
  return data
}

const SPACING = 13
const IMAGE_SIZE = 62
const ITEM_SIZE = IMAGE_SIZE + SPACING * 2

const renderItem = (item, index, scrollY) => {
  const inputRange = [
    -1,
    0,
    ITEM_SIZE * index,
    ITEM_SIZE * (index + 1)
  ]

  const opacityInputRange = [
    -1,
    0,
    ITEM_SIZE * index,
    ITEM_SIZE * (index + 0.6)
  ]

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0]
  })


  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0]
  })

  return (
    item.hasOwnProperty('Ingredient') ? (
      <Animated.View style={{ transform: [{ scale }], opacity: opacity }}>
        <View style={styles.imgView}>
          <Image
            style={styles.img}
            source={{ uri: item.imageUrl }}
          />
        </View>
        <Text style={styles.itemName}>{item.Ingredient}</Text>
        <Text style={styles.itemShort} numberOfLines={3}>{item['Short text']}</Text>
      </Animated.View>
    ) :
      (
        <View style={{ flex: 1 }}></View>
      )
  )
}

const App = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current

  return (
    <View style={styles.main}>
      <View style={styles.searchTxt}>
        <Text style={styles.headLabel}>Search</Text>
      </View>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Food Name"
          placeholderTextColor={'#7e8a9a'}
        />
      </View>
      <View style={styles.itemsView}>
        <Text style={styles.headLabel}>Foods</Text>
        <Animated.FlatList
          data={normalize(data || [])}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          renderItem={({ item, index }) => renderItem(item, index, scrollY)}
        />
      </View>
    </View >
  )
}

export default App

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchTxt: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    width: '100%',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10
  },
  searchIcon: {
    padding: 10,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: '#f7f7f7'
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#f7f7f7',
    height: 42,
    fontSize: 13
  },
  headLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 19,
    color: '#30384d',
    marginVertical: 15,
    marginLeft: 20
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  itemsView: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginTop: 10
  },
  itemName: {
    color: '#30384d',
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 13.6,
    marginTop: 8
  },
  itemShort: {
    width: 150,
    color: '#7e8a9a',
    fontWeight: '500',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 6
  },
  imgView: {
    borderRadius: 6,
    height: 110,
    width: (Dimensions.get('window').width / 2) - 30
  },
  img: {
    height: 110,
    width: '100%',
    borderRadius: 6
  }
})