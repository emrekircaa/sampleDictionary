import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useGetWordQuery } from "../features";

export default function BookmarkItem({ item }: { item: String }) {
  const { currentData: data } = useGetWordQuery(item, { skip: !item });
  const [decorateData, setDecorateData] = useState(null);
  const [emre, setEmre] = useState(null);
  useEffect(() => {
    if (data) {
      setDecorateData(data[0].meanings[0].definitions.slice(0, 3));
      setEmre(data[0].phonetics[0].audio);
    }
  }, [data]);

  const Item = (item) => (
    <View className="flex-row items-start my-2 gap-4">
      <View className="h-9 w-[2px] rounded-lg bg-gray-300" />
      <Text className="p-1">{item.definition}</Text>
    </View>
  );
  return (
    <View className=" w-full mb-4 p-4 bg-white rounded-md shadow-md ">
      <Text className="text-base text-black font-bold">{item}</Text>
      <View className="h-[2px] bg-gray-300 rounded-3xl my-4" />
      <View>
        <FlatList
          data={decorateData}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={(item, index) => item.definition}
          className="flex-grow-0"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
