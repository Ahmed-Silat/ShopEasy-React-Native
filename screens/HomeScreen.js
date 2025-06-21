import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { fetchProducts } from "../data/mockAPI";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import { useThemeContext } from "../context/ThemeContext";
import { getWishlist, toggleWishlistItem } from "../utils/storage";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 0;
// const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2; // 2 cards with margin

const HomeScreen = ({ navigation }) => {
  const { theme } = useThemeContext();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadWishlist();
    }, [])
  );

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data || res); // fallback for mock API shape
      setFiltered(res.data || res);
    } catch (err) {
      console.error("Error loading products", err);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async () => {
    const list = await getWishlist();
    setWishlistItems(list || []);
  };

  const handleWishlistToggle = async (product) => {
    const updated = await toggleWishlistItem(product);
    setWishlistItems(updated);
  };

  const CARD_SPACING = 12;
  const CARD_WIDTH = (width - CARD_SPACING * 3) / 2;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#121212" : "#f2f2f2" },
      ]}
    >
      <SearchFilter
        searchText={searchText}
        setSearchText={setSearchText}
        products={products}
        setFilteredProducts={setFiltered}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#999" />
      ) : (
        <FlatList
          key={2}
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
              width={CARD_WIDTH} // 💡 pass exact width
            />
          )}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: CARD_SPACING,
          }}
          contentContainerStyle={{
            paddingHorizontal: CARD_SPACING,
            paddingBottom: 100,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: CARD_MARGIN,
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default HomeScreen;
