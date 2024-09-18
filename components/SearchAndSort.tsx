import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from '@expo/vector-icons';
import { SortType } from "../types";

interface SearchAndSortProps {
  onSearch: (query: string) => void;
  onSort: (sortType: SortType) => void;
  sortType: SortType;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({ onSearch, onSort, sortType }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by symbol"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      <RNPickerSelect
        onValueChange={(value) => onSort(value)}
        value={sortType}
        Icon={() => <FontAwesome name="filter" size={20} color="#333" style={styles.searchIcon} />}
        items={[
          { label: 'Symbol', value: SortType.SYMBOL },
          { label: 'Rate', value: SortType.RATE },
        ]}
        style={pickerSelectStyles}
      />
    </View>
  );
};

export default SearchAndSort;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  searchContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 10,
    color: '#ccc',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    color: '#555',
    paddingRight: 16,
  },
  inputAndroid: {
    height: 40,
    fontSize: 16,
    paddingLeft: 30,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    backgroundColor: '#fff',
    borderRadius: 8,
    color: 'black',
    paddingRight: 16,
  },
  iconContainer: {
    top: 9,
    left: 8,
    color: '#ccc',
  },
});
