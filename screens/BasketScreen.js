import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState, useEffect, useMemo } from "react";
import React, { Image, TouchableOpacity, ScrollView, Text, TextInput, View } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, selectBasketItems } from "../features/basketSlice";
import { selectRestaurant } from '../features/restaurantSlice';
import { urlFor } from "../sanity";
import Currency  from 'react-currency-formatter';

const BasketScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rouded-full bg-gray-100 absolute top-3 right-5">
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row itmes-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: 'https://links.papareact.com/wru'
            }}
            className="h-7 w-7 bg-gray-300 p04 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Itmems list */}
      <ScrollView className="divide-gray-200">
        { Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
            <Text>{items.length} x</Text>
            <Image
              source={{uri: urlFor(items[0]?.url).url()}}
              className="h-12 w-12 rounded-full"
              />
            <Text className="flex-1">{items[0]?.name}</Text>
            <Text className="text-gray-600">
              <Currency quantity={items[0]?.price} currency="GBP" />
            </Text>
            <TouchableOpacity>
              <Text
                className="text-[#00ccbb] text-xs"
                onPress={()=> dispatch(removeFromBasket({ id: key}))}
                >
                  Remove
                  </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
};

export default BasketScreen;