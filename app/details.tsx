import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

const API_KEY = "caed283529e2586d599f192dc5ed0175";

export default function DetailsScreen() {
  const { city } = useLocalSearchParams();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : weather ? (
        <>
          <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.details}>Weather: {weather.weather[0].description}</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={styles.details}>Feels Like: {weather.main.feels_like}°C</Text>
          <Text style={styles.details}>Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.details}>Wind Speed: {weather.wind.speed} m/s</Text>
          <Text style={styles.details}>Pressure: {weather.main.pressure} hPa</Text>
          <Text style={styles.details}>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Text>
          <Text style={styles.details}>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Text>
        </>
      ) : (
        <Text style={styles.error}>Error fetching data.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  city: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  temp: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
  },
  details: {
    fontSize: 18,
    color: "#ddd",
    marginVertical: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});
