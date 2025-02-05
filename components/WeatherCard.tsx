import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WeatherProps {
  weather: any;
}

const WeatherCard: React.FC<WeatherProps> = ({ weather }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.condition}>{weather.weather[0].main}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 10, backgroundColor: "#007BFF", alignItems: "center" },
  city: { fontSize: 30, fontWeight: "bold", color: "#fff" },
  temp: { fontSize: 50, fontWeight: "bold", color: "#fff" },
  condition: { fontSize: 24, color: "#fff" },
});

export default WeatherCard;
