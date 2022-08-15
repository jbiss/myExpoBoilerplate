import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState, useEffect } from "react";
import React, {Image, ScrollView, Text, TextInput, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
} from 'react-native-heroicons/outline';

import client from '../sanity';
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
  const [featuredCategories, setfeaturedCategories] = useState([]);
  const navigaton = useNavigation();

  useLayoutEffect(() => {
    navigaton.setOptions({
      headerShown: false
    })
  }, []);

  useEffect(()=> {
    client.fetch(`
    *[_type == "featured"] {
      ...,
      restuarants[]->{
        ...,
        dishes[]->
      }
    }
    `).then(data => {
      setfeaturedCategories(data);
      // console.log(data);
    });
  }, [])
  
  return(
    <SafeAreaView className="bg.white pt-5">
      {/* header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru"
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="text-bold text-xl">Current Location <ChevronDownIcon size={20} color="#00CCBB" /></Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <SearchIcon size={20} color="gray" />
          <TextInput placeholder="Restuarants and Cuisines" keyboardType="default"/>
        </View>
      <AdjustmentsIcon size={20} color="#00CCBB" />
      </View>

      {/* body */}
      <ScrollView className="bg-gray-100">
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}
        {featuredCategories?.map(category => 
           <FeaturedRow 
           key={category._id}
           id={category._id}
           title={category.name}
           description={category.short_description}
           />
        )}
      </ScrollView>
    </SafeAreaView>

  )
};

export default HomeScreen;