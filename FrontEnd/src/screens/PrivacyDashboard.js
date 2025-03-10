import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, useColorScheme, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const screenWidth = Dimensions.get('window').width;

const MockIcon = ({ size, color }) => (
  <Svg height={size} width={size}>
    <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
  </Svg>
);

const PrivacyDashboard = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const backgroundColor = isDarkMode ? '#121212' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const cardBackground = isDarkMode ? '#1e1e1e' : '#f9f9f9';
  const borderColor = isDarkMode ? '#ffffff' : '#000000';

  const [privacyScore, setPrivacyScore] = useState(85);
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'Unauthorized camera access detected', severity: 'critical' },
    { id: 2, message: 'Location access granted to a new app', severity: 'moderate' },
  ]);
  const [permissionsUsage, setPermissionsUsage] = useState({
    Camera: 20,
    Location: 35,
    Microphone: 15,
    Storage: 30,
  });
  const [privacyShield, setPrivacyShield] = useState(false);

  useEffect(() => {
    // TODO: Fetch privacy score, alerts, and permission usage from API
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor }}>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor }}>Privacy Dashboard</Text>
          <MockIcon size={28} color={privacyShield ? 'green' : 'gray'} />
        </View>

        {/* Risk Indicator Widget */}
        <Card style={{ marginVertical: 10, padding: 16, alignItems: 'center', backgroundColor: cardBackground }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>Privacy Score</Text>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: privacyScore > 80 ? 'green' : 'red' }}>{privacyScore}</Text>
        </Card>

        {/* Live Alerts Section */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: textColor }}>Live Alerts</Text>
          {alerts.map((alert) => (
            <Card key={alert.id} style={{ padding: 12, marginVertical: 4, borderColor: alert.severity === 'critical' ? 'red' : 'yellow', borderWidth: 1, backgroundColor: cardBackground }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MockIcon size={20} color={alert.severity === 'critical' ? 'red' : 'yellow'} />
                <Text style={{ marginLeft: 8, color: textColor }}>{alert.message}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Graph Visualization */}
        <View style={{ marginVertical: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10, color: textColor }}>Permissions Usage</Text>
          <BarChart
            data={{
              labels: Object.keys(permissionsUsage),
              datasets: [{ data: Object.values(permissionsUsage) }],
            }}
            width={screenWidth - 32}
            height={250}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: backgroundColor,
              backgroundGradientFrom: backgroundColor,
              backgroundGradientTo: backgroundColor,
              color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.6,
              decimalPlaces: 0,
            }}
            style={{ borderRadius: 10 }}
          />
        </View>

        {/* Quick Actions Panel */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
          <Button onPress={() => setPrivacyShield(!privacyShield)}>
            {privacyShield ? 'Disable Privacy Shield' : 'Enable Privacy Shield'}
          </Button>
          <Button variant="outline">Revoke Permission</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyDashboard;
