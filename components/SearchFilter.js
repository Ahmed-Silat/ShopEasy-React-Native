import React, { useState, useEffect, useMemo } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Icon } from "react-native-elements";
import { useThemeContext } from "../context/ThemeContext";

const SearchFilter = ({
  searchText,
  setSearchText,
  products,
  setFilteredProducts,
}) => {
  const { theme } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [searchText, selectedCategory, sortOrder, products]);

  const applyFilters = () => {
    let data = [...products];

    if (searchText) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      data = data.filter((item) => item.category === selectedCategory);
    }

    if (sortOrder === "low") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(data);
  };

  return (
    <View style={styles.container}>
      {/* Modern Search Bar with Side Padding */}
      <View style={styles.searchBarWrapper}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme === "dark" ? "#2c2c2e" : "#eaeaea",
            },
          ]}
        >
          <Icon
            name="search"
            size={18}
            color={theme === "dark" ? "#ccc" : "#666"}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor={theme === "dark" ? "#888" : "#666"}
            style={[
              styles.searchInput,
              { color: theme === "dark" ? "#fff" : "#000" },
            ]}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Filter & Sort Row */}
      <View style={styles.dropdownRow}>
        <View
          style={[
            styles.pickerContainer,
            {
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#fff",
              borderColor: theme === "dark" ? "#444" : "#ddd",
              shadowColor: theme === "dark" ? "#000" : "#aaa",
            },
          ]}
        >
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={{ color: theme === "dark" ? "#fff" : "#000", flex: 1 }}
            dropdownIconColor={theme === "dark" ? "#fff" : "#000"}
          >
            {categories.map((cat) => (
              <Picker.Item label={cat} value={cat} key={cat} />
            ))}
          </Picker>
        </View>

        <View
          style={[
            styles.pickerContainer,
            {
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#fff",
              borderColor: theme === "dark" ? "#444" : "#ddd",
              shadowColor: theme === "dark" ? "#000" : "#aaa",
            },
          ]}
        >
          <Picker
            selectedValue={sortOrder}
            onValueChange={(itemValue) => setSortOrder(itemValue)}
            style={{ color: theme === "dark" ? "#fff" : "#000", flex: 1 }}
            dropdownIconColor={theme === "dark" ? "#fff" : "#000"}
          >
            <Picker.Item label="Sort by" value="none" />
            <Picker.Item label="Low to High" value="low" />
            <Picker.Item label="High to Low" value="high" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10, // fallback if not supported: use marginRight in child
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 5,
    height: 50,
    justifyContent: "center",
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  searchBarWrapper: {
    paddingHorizontal: 15, // ⬅️ Space from both sides
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
  },
});

export default SearchFilter;
