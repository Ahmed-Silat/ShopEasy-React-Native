import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card } from "react-native-elements";
import { useThemeContext } from "../context/ThemeContext";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const ProductCard = ({ product, onPress, width }) => {
  const { theme } = useThemeContext();

  const isDark = theme === "dark";
  const cardBgColor = isDark ? "#1e1e1e" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const priceColor = isDark ? "#bbb" : "#444";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card
        containerStyle={[
          styles.card,
          {
            backgroundColor: cardBgColor,
            width: width || "100%", // <-- dynamic: 100% if no width passed
            borderColor: "transparent",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 3 },
            elevation: 4,
            margin: 0,
          },
        ]}
      >
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.info}>
          <Text numberOfLines={1} style={[styles.name, { color: textColor }]}>
            {product.name}
          </Text>
          <Text style={[styles.price, { color: priceColor }]}>
            ${product.price}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: CARD_MARGIN,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
  },
  info: {
    marginTop: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  price: {
    fontSize: 13,
    marginTop: 5,
  },
});

export default ProductCard;
