import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { observer } from "mobx-react-lite";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../components/navigation/types";
import InfoRow from "../components/InfoRow";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen = observer(({ route }: { route: DetailsScreenRouteProp }) => {
  const { symbol, data } = route.params;

  const getDiff24hStyle = () => ({
    color: data.diff24h > 0 ? 'green' : 'red',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{`$${data.rate.toFixed(3)}`}</Text>
        <Text style={{...styles.price, ...getDiff24hStyle()}}>{` (${data.diff24h.toFixed(2)}%)`}</Text>
      </View>
      <View style={styles.bidAsk}>
        <InfoRow label="Ask" value={data.ask.toFixed(3)} />
        <InfoRow label="Bid" value={data.bid.toFixed(3)} />
      </View>
    </View>
  );
});

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    padding: 20, 
    backgroundColor: '#fff',
  },
  symbol: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
  },
  bidAsk: {
    flexDirection: 'row',
    marginTop: 40,
  },
});
