import React, { FC, ChangeEventHandler } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <View className="flex-row w-full px-5 py-3 bg-white rounded-md shadow-md">
      <AntDesign name="search1" size={24} color="gray" />
      <TextInput
        autoCorrect={false}
        value={value}
        onChangeText={onChange}
        placeholder="Search.."
        className="ml-3"
      />
      {/* <Feather name="mic" size={24} color="black" /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
export default SearchInput;
