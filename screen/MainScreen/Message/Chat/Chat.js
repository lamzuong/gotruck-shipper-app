import styles from './stylesChat';

import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { AuthContext } from '../../../../context/AuthContext';
import axiosClient from '../../../../api/axiosClient';
import { socketClient } from '../../../../global/socket';
import { useIsFocused, useRoute } from '@react-navigation/native';

const mess = [
  {
    id: '1',
    ava: 'https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg',
    name: 'Nguyễn Văn An',
    message: {
      content: 'Hàng gấp lắm rồi, bạn tới nhanh nhé. Cám ơn bạn',
      read: true,
    },
    time: '22m',
  },
  {
    id: '2',
    ava: 'https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg',
    name: 'Lê Nhật Tâm',
    message: {
      content: 'Hàng gấp lắm rồi, bạn tới nhanh nhé. Cám ơn bạn',
      read: false,
    },
    time: '22m',
  },
  {
    id: '3',
    ava: 'https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg',
    name: 'Trần Hùng Phát',
    message: {
      content: 'Hàng gấp lắm rồi, bạn tới nhanh nhé. Cám ơn bạn',
      read: true,
    },
    time: '22m',
  },
];

export default function Chat({ navigation }) {
  const [listConversation, setListConversation] = useState([]);
  const { user } = useContext(AuthContext);
  const route = useRoute();
  const isFocus = useIsFocused();

  const renderUI = async () => {
    const listConversation = await axiosClient.get('gotruck/conversation/shipper/' + user._id);
    setListConversation(listConversation);
  };

  useEffect(() => {
    socketClient.on('message' + user._id, (data) => {
      renderUI();
    });
    return () => socketClient.off('message' + user._id);
  });

  useEffect(() => {
    renderUI();
  }, [isFocus]);

  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + ' năm trước';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' tháng trước';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' ngày trước';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' giờ trước';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' phút trước';
    }
    return 'Vừa gửi';
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listConversation}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.itemChat}
              onPress={() => {
                navigation.navigate('ChatRoom', { item: item });
              }}
            >
              <Image
                source={{
                  uri: item.id_customer.avatar,
                }}
                style={styles.itemChat.avatar}
              />
              <View style={styles.itemChat.rightItem}>
                <Text
                  style={
                    item.read.indexOf(user._id) > -1
                      ? styles.itemChat.name.read
                      : item.lastMess !== ''
                      ? styles.itemChat.name.unread
                      : styles.itemChat.name.read
                  }
                >
                  {item.id_form.id_order}
                </Text>
                <Text
                  style={
                    item.read.indexOf(user._id) > -1
                      ? styles.itemChat.name.read
                      : item.lastMess !== ''
                      ? styles.itemChat.name.unread
                      : styles.itemChat.name.read
                  }
                >
                  {item.id_customer.name}
                </Text>
                <View style={styles.itemChat.viewMessage}>
                  <ReadMore
                    numberOfLines={1}
                    renderTruncatedFooter={() => null}
                    renderRevealedFooter={() => null}
                  >
                    <Text
                      style={[
                        item.read.indexOf(user._id) > -1
                          ? styles.itemChat.viewMessage.read
                          : item.lastMess !== ''
                          ? styles.itemChat.viewMessage.unread
                          : null,
                        styles.itemChat.viewMessage.message,
                      ]}
                    >
                      {item.lastMess}
                    </Text>
                  </ReadMore>

                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={[
                        item.read.indexOf(user._id) > -1
                          ? styles.itemChat.viewMessage.read
                          : styles.itemChat.viewMessage.unread,
                        styles.itemChat.viewMessage.time,
                      ]}
                    >
                      {item.timeLastMess && item.lastMess !== ''
                        ? timeSince(new Date(item.timeLastMess)) + '  '
                        : null}
                    </Text>
                    {item.read.indexOf(user._id) > -1 ? null : item.lastMess !== '' ? (
                      <Octicons name="dot-fill" size={24} color="blue" />
                    ) : null}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '@' + index}
        key={'@'}
      />
    </View>
  );
}
