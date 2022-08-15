import { useEffect, useState } from 'react';
import React, {ScrollView, Text, View} from 'react-native';
import client from '../sanity';
import CategoryCard from './CategoryCard';

const Categories = () => {
  const [categories, setCategoies] = useState([]);

  useEffect(() => {
    client.fetch(`
      *[_type == "category"]
    `)
    .then(data => setCategoies(data));
  }, []);

  return (
    <ScrollView 
    contentContainerStyle={{
      paddingHorizontal: 15,
      paddingTop: 10,
    }}
    horizontal 
    showsHorizontalScrollIndicator={false}>
      {/* Category Card */}
      {categories.map(category => 
        <CategoryCard 
        key={category._id}
        imgUrl={category.image} 
        title={category.name}
      />
      )}
    </ScrollView>
  );
};

export default Categories;