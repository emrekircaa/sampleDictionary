import React, { useCallback } from "react";
import {
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import BookmarkItem from "../components/BookmarkItem";
import useAsyncData from "../hooks/useAsyncData";
import { FontAwesome } from "@expo/vector-icons";
import { RemoveAsyncStorageData } from "../utils/asyncStorage";
import { useFocusEffect } from "@react-navigation/native";

const ScreenHeiht = Dimensions.get("window").width;

const Bookmark: React.FC = () => {
  const { data, loading, getAsyncData } = useAsyncData();
  useFocusEffect(
    useCallback(() => {
      getAsyncData("Bookmark");
    }, [])
  );
  const removeItem = async (item: string) => {
    await RemoveAsyncStorageData(item, "Bookmark");
    getAsyncData("Bookmark");
  };
  const Item: React.FC<{ item: string; index: number }> = ({ item, index }) => (
    <View className="my-2">
      <BookmarkItem item={item} />
      <TouchableOpacity
        onPress={(e) => {
          removeItem(item);
        }}
        className="absolute right-3 bottom-0"
      >
        <FontAwesome name="bookmark" size={36} color="#E32F48" />
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView className="flex-1 items-center">
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            marginTop: ScreenHeiht * 0.05,
            width: ScreenHeiht * 0.8,
          }}
        >
          {data && data.length > 0 && (
            <>
              <FlatList
                data={data}
                renderItem={({ item, index }) => (
                  <Item item={item} index={index} />
                )}
                keyExtractor={(item, index: number) => index.toString()}
                className="flex-grow-0"
              />
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
