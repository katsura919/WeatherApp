import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet, Image, StatusBar} from "react-native";
import { Link } from "expo-router";
import * as Location from "expo-location";
import axios from "axios";
import { useRouter } from "expo-router";
import WeatherCard from "../components/WeatherCard";


const API_KEY = "caed283529e2586d599f192dc5ed0175"; // Replace with OpenWeatherMap API Key

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Enable location services to use this feature.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );

      setWeather(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Search Icon */}
      <View style={styles.searchContainer}> 
      <Link href="/search">
          <Text style={styles.iconText}>🔍</Text>
      </Link>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : weather ? (
        <>
        <Text style={styles.sectionTitle}> Your City</Text>
          <WeatherCard weather={weather} />
          <View style={styles.additionalInfo}>
            <Text style={styles.infoText}>Feels Like: {weather.main.feels_like}°C</Text>
            <Text style={styles.infoText}>Humidity: {weather.main.humidity}%</Text>
            <Text style={styles.infoText}>Pressure: {weather.main.pressure} hPa</Text>
            <Text style={styles.infoText}>Wind Speed: {weather.wind.speed} m/s</Text>
            <View style={styles.weatherIconContainer}>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                }}
                style={styles.weatherIcon}
              />
              <Text style={styles.weatherDescription}>{weather.weather[0].description}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.errorText}>Error fetching data.</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#333",
    position: "relative", // Add this line
  },
  searchContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  iconText:{
    fontSize: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  sectionTitle:{
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#ddd",
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#ddd",
  },
  additionalInfo: {
    marginTop: 20,
    alignItems: "center",
  },
  weatherIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  weatherDescription: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: "#007BFF",
  },
});
