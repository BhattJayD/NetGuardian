/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ping from 'react-native-ping';
import DeviceInfo from 'react-native-device-info';
import {generateIPRange} from './src/utils/helper';

import LanPortScanner from 'react-native-lan-port-scanner';

function App(): JSX.Element {
  const [hosts, setHosts] = useState<string[]>([]);
  const [ActiveHosts, setActiveHosts] = useState<string[]>([]);
  const [ip, setIp] = useState<string>(''); // Initialize to an empty string

  const getIp = async () => {
    try {
      const ipAddress = await DeviceInfo.getIpAddress();
      setIp(ipAddress); // Set the IP address once it's retrieved
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };
  useEffect(() => {
    if (ip != '') {
      console.log('ip');
      console.log(generateIPRange(ip, 255).length);
      setHosts(generateIPRange(ip, 255));
    }
  }, [ip]);
  useEffect(() => {
    if (hosts.length > 0) {
      hosts.forEach(i => {
        getData(i);
      });
    }
  }, [hosts]);

  useEffect(() => {
    if (ActiveHosts.length > 0) {
      console.log(ActiveHosts);
    }
  }, [ActiveHosts]);

  const getData = async (currentIp: string) => {
    try {
      const ms = await Ping.start(currentIp, {timeout: 100}); //TODO: add timeout with slider
      console.log('ms', ms);
      if (ms >= 0) {
        setActiveHosts(prevActiveHosts => [...prevActiveHosts, currentIp]);
        console.log(currentIp);

        console.log(currentIp, ActiveHosts);
      }
    } catch (error: any) {
      console.log('Error pinging host:', error);
    }
  };

  useEffect(() => {
    getIp();
  }, []);

  const portChecker = async (IP: string, PORT: number) => {
    let result = await LanPortScanner.scanHost(IP, PORT, 1000, false);
    if (result) {
      console.log('====================================');
      console.log(result);
      console.log('====================================');
    }
  };
  return (
    <View>
      {ActiveHosts.map((host, index) => (
        <TouchableOpacity
          onPress={() => {
            portChecker(host, 80); //TODO: check http for not full port scan leter
          }}>
          <Text key={index} style={{color: 'red'}}>
            {host}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default App;
