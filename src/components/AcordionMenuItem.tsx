import {
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useGetWordQuery } from "../features";

interface AcordionMenuItemProps {
  item: string;
}
const AcordionMenuItem: React.FC<AcordionMenuItemProps> = ({ item }) => {
  const { currentData: data } = useGetWordQuery(item, { skip: !item });
  const [expanded, setExpanded] = useState(false);
  const [decorateData, setDecorateData] = useState(null);
  const accordian = useRef<TouchableOpacity | null>(null);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toogleExpand = () => {
    setExpanded(!expanded);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  useEffect(() => {
    if (data) {
      setDecorateData(data[0].meanings[0].definitions.slice(0, 3));
    }
  }, [data]);

  return (
    <View className="bg-white rounded-md">
      <TouchableOpacity
        ref={accordian}
        onPress={() => toogleExpand()}
        className="flex-row justify-between h-14 pr-5 pl-7 items-center bg-gray-[#808080]"
      >
        <Text className="text-base text-black font-bold">{item}</Text>
        <AntDesign
          name={expanded ? "down" : "right"}
          size={24}
          color="#E32F48"
        />
      </TouchableOpacity>
      <View className="rounded-b-xl" />
      {expanded && (
        <View className="p-4 bg-white rounded-b-md">
          {(decorateData || []).map((e, index) => (
            <View key={index} className="flex-row m-4 gap-4">
              {/* <AntDesign name="doubleright" size={18} color="#E32F48" /> */}
              <View className="h-9 w-[2px] rounded-lg bg-gray-300" />
              <Text className="pr-2 text-black">{e.definition} </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
export default AcordionMenuItem;
