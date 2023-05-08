import styles from './stylesInfo';
import stylesGlobal from '../../../../global/stylesGlobal';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Entypo, Octicons, FontAwesome } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../../../context/AuthContext';
import axiosClient from '../../../../api/axiosClient';

export default function Info({ navigation }) {
  const [data, setData] = useState([]);
  const isFocus = useIsFocused();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getNotify = async () => {
      const res = await axiosClient.get('gotruck/notify/shipper/' + user._id);
      setData(res);
    };
    getNotify();
  }, [isFocus]);

  const formatTime = (time) => {
    const dt = new Date(time);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

    return `${padL(dt.getHours())}:${padL(dt.getMinutes())} ${padL(dt.getDate())}/${padL(
      dt.getMonth() + 1,
    )}/${dt.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.itemChat}
              onPress={() => {
                navigation.navigate('InfoDetail', { item: item });
              }}
            >
              <View
                style={
                  item.type_notify === 'Warning' ? styles.itemChat.deal : styles.itemChat.order
                }
              >
                {item.type_notify === 'Warning' ? (
                  <Entypo name="warning" size={24} color={stylesGlobal.darkOrange} />
                ) : (
                  <FontAwesome name="truck" size={24} color={stylesGlobal.darkGreen} />
                )}
              </View>

              <View style={styles.itemChat.rightItem}>
                <ReadMore
                  numberOfLines={1}
                  renderTruncatedFooter={() => null}
                  renderRevealedFooter={() => null}
                >
                  <Text
                    style={item.title ? styles.itemChat.name.read : styles.itemChat.name.unread}
                  >
                    {item.title}
                  </Text>
                </ReadMore>
                <View style={styles.itemChat.viewMessage}>
                  <View style={{ width: '80%' }}>
                    <ReadMore
                      numberOfLines={1}
                      renderTruncatedFooter={() => null}
                      renderRevealedFooter={() => null}
                    >
                      <Text
                        style={[
                          item.title
                            ? styles.itemChat.viewMessage.read
                            : styles.itemChat.viewMessage.unread,
                          styles.itemChat.viewMessage.message,
                        ]}
                      >
                        {item.content}{' '}
                      </Text>
                    </ReadMore>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      item.title
                        ? styles.itemChat.viewMessage.read
                        : styles.itemChat.viewMessage.unread,
                      styles.itemChat.viewMessage.time,
                    ]}
                  >
                    {formatTime(item.createdAt)}{' '}
                  </Text>
                  {item.title ? null : <Octicons name="dot-fill" size={24} color="blue" />}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '#' + index}
        key={'#'}
      />
    </View>
  );
}
