import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

import appStore from "../store/store";
import { RootStackParamList } from "./navigation/types";
import { useFilteredRates } from "../hooks/useFilterRates";
import SearchAndSort from "./SearchAndSort";
import { SortType } from "../types";

const CryptoList = observer(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { loading, error, rates } = appStore;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<SortType>(SortType.SYMBOL);

  const filteredRates = useFilteredRates(
    appStore.rates,
    searchQuery,
    sortType
  );

  useEffect(() => {
    appStore.fetchCryptoRates();

    return () => {
      appStore.cancelRequest();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchAndSort
        onSearch={(query) => setSearchQuery(query)}
        onSort={(sort) => setSortType(sort)}
        sortType={sortType}
      />
      <FlashList
        data={filteredRates}
        keyExtractor={(item) => item.symbol}
        estimatedItemSize={70}
        ListEmptyComponent={<Text style={styles.emptyText}>No data available</Text>}
        renderItem={({ item }) => {
          return (<TouchableOpacity onPress={() => navigation.navigate('Details', { symbol: item.symbol, data: item })}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.symbol.toUpperCase()}</Text>
              <Text style={styles.itemSubText}>Price: {item.rate}</Text>
            </View>
          </TouchableOpacity>)
        }}
      />
    </View>
  );
});

export default CryptoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubText: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
