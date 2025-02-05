import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

const API_KEY = "caed283529e2586d599f192dc5ed0175"; // Replace with OpenWeatherMap API Key

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  const searchCity = async (text: string) => {
    setQuery(text);
    if (text.length < 3) return;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/find?q=${text}&type=like&appid=${API_KEY}`
    );
    setResults(response.data.list || []);
  };

  return (
    <View style={styles.container}>

    <View style={styles.rowContainer}>
    <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
        <Text style={styles.goBackText}>←</Text>
    </TouchableOpacity>
    <TextInput
        style={styles.input}
        placeholder="Search city..."
        value={query}
        onChangeText={searchCity}
        placeholderTextColor="#aaa"
    />
    </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/details?city=${item.name}`)}
          >
            <Text style={styles.cityName}>{item.name}, {item.sys.country}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c1c1c", // Dark background color
      },
      rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Adjust spacing between elements
        marginBottom: 20,
        padding: 15,
      },
      goBackButton: {
      
      },
      goBackText: {
        fontSize: 25,
        color: "#fff",
        textAlign: "center",
      },
      input: {
        height: 50,
        borderBottomWidth: 2,
        fontSize: 18,
        color: "#fff",
        borderColor: "#fff",
        paddingLeft: 10,
        flex: 1, // Makes the input take the remaining space
      },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#444",
    backgroundColor: "#333",
    marginBottom: 10,
    borderRadius: 8,
  },
  cityName: {
    fontSize: 18,
    color: "#fff",
  },
});
