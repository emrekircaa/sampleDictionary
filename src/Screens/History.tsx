import {
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import AcordionMenuItem from "../components/AcordionMenuItem";
import useAsyncData from "../hooks/useAsyncData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const ScreenWidth = Dimensions.get("window").width;

const History: React.FC = () => {
  const { data, getAsyncData } = useAsyncData();

  useFocusEffect(
    useCallback(() => {
      getAsyncData("History");
    }, [])
  );

  const Item: React.FC<{ item: string; index: number }> = ({ item, index }) => (
    <View style={{ marginTop: 10 }}>
      <AcordionMenuItem item={item} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      {/* <TouchableOpacity
        onPress={() => {
          AsyncStorage.clear();
        }}
      >
        <Text>Clear History</Text>
      </TouchableOpacity> */}
      <View
        style={{
          marginTop: ScreenWidth * 0.05,
          width: ScreenWidth * 0.8,
        }}
      >
        {data && data.length > 0 && (
          <FlatList
            data={data}
            renderItem={({ item }) => <Item item={item} index={0} />}
            keyExtractor={(item) => item}
            style={{ flexGrow: 0, height: "100%" }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default History;
