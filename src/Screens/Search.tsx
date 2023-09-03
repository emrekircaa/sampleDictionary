import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SearchInput from "../components/SearchInput";
import useAsyncData from "../hooks/useAsyncData";
import { useGetWordQuery } from "../features/api-slice";
import {
  AddAsyncStorageData,
  RemoveAsyncStorageData,
} from "../utils/asyncStorage";

const ScreenWidth = Dimensions.get("window").width;

const Search: React.FC = () => {
  const { data: bookmarkData, getAsyncData } = useAsyncData();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const { currentData: data, isFetching } = useGetWordQuery(searchTerm, {
    skip: !searchTerm || (searchTerm && searchTerm.length < 3),
  });
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchTerm);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const savesearchTerm = async (word: string, key: string): Promise<void> => {
    await AddAsyncStorageData(word, key);
  };
  const removeBookmark = async (item: string) => {
    await RemoveAsyncStorageData(item, "Bookmark");
  };

  useEffect(() => {
    if (data && searchTerm) {
      savesearchTerm(searchTerm, "History");
    }
    getAsyncData("Bookmark");
  }, [searchTerm, data]);

  const toggleBookmark = async () => {
    if (!(bookmarkData || []).includes(searchTerm)) {
      await savesearchTerm(searchTerm, "Bookmark");
      getAsyncData("Bookmark");
    } else {
      await removeBookmark(searchTerm);
      getAsyncData("Bookmark");
    }
  };

  const renderListItem = ({ item }) => (
    <View className="flex-row p-4 items-center rounded-3xl">
      <View className="h-9 w-[2px] rounded-lg bg-gray-300 mr-1" />
      <Text className="p-2">{item.definition}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 items-center">
      <View
        style={{
          marginTop: ScreenWidth * 0.05,
          width: ScreenWidth * 0.8,
        }}
      >
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
        {isFetching ? (
          <View className="mt-4">
            <ActivityIndicator size="small" color="#E32F48" />
          </View>
        ) : (
          <View className="mt-4 bg-white rounded-md shadow">
            <FlatList
              data={data && data[0].meanings[0].definitions.slice(0, 3)}
              renderItem={renderListItem}
              keyExtractor={(item) => item.definition}
              className="flex-grow-0"
            />
            {data && (
              <TouchableOpacity
                onPress={toggleBookmark}
                className="absolute right-3 bottom-[-20]"
              >
                {bookmarkData.includes(searchTerm) ? (
                  <FontAwesome name="bookmark" size={36} color="#E32F48" />
                ) : (
                  <FontAwesome name="bookmark-o" size={36} color="#E32F48" />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Search;
