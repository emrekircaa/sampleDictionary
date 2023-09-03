import AsyncStorage from "@react-native-async-storage/async-storage";

// Array.lenght max limit for History ???
// Function to add data to AsyncStorage
export const AddAsyncStorageData = async (word: string, type: string) => {
  try {
    // Check if there is already data stored for the specified type
    let existingData = await AsyncStorage.getItem(type);
    // If data exists for the specified type
    if (existingData) {
      // Parse the existing data into an array
      const parsedData: string[] = JSON.parse(existingData);
      // If the word is not already in the parsedData array
      if (!parsedData.includes(word)) {
        parsedData.push(word);
        await AsyncStorage.setItem(type, JSON.stringify(parsedData));
      }
    } else {
      // If no data exists for the specified type, create a new array with the word
      await AsyncStorage.setItem(type, JSON.stringify([word]));
    }
  } catch (error) {
    // Log an error message if an error occurs during AsyncStorage operations
    console.error("Error adding data to AsyncStorage:", error);
  }
};

// Function to remove data from AsyncStorage
export const RemoveAsyncStorageData = async (word: string, type: string) => {
  try {
    // Retrieve the existing data for the specified type from AsyncStorage
    const existingData = await AsyncStorage.getItem(type);
    const parsedData: string[] = JSON.parse(existingData || "[]");

    // Filter the existing data to exclude the word to be removed
    const filteredData = parsedData.filter((item) => item !== word);

    await AsyncStorage.setItem(type, JSON.stringify(filteredData));
  } catch (error) {
    console.error("Error removing data from AsyncStorage:", error);
  }
};
