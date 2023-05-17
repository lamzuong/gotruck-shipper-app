import styles from './stylesChatRoom';
import stylesGlobal from '../../../../../global/stylesGlobal';

import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  BackHandler,
  Linking,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axiosClient from '../../../../../api/axiosClient';
import { socketClient } from '../../../../../global/socket';
import { AuthContext } from '../../../../../context/AuthContext';

export default function ChatRoom({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  const [mess, setMess] = useState();
  const [listMessage, setListMessage] = useState([]);
  const { user } = useContext(AuthContext);

  const handleCallPhone = () => {
    if (item?.id_customer?.phone) {
      Linking.openURL(`tel:${item.id_customer.phone}`);
    } else {
      Alert.alert('Thông báo', 'Không thể gọi cho số điện thoại này');
    }
  };

  const handleMessage = async () => {
    const messageSend = {
      id_conversation: item._id,
      message: mess.trim(),
      id_sender: user._id,
      userSendModel: 'Shipper',
      read: [user._id],
    };
    if (mess.trim()) {
      await axiosClient.post('gotruck/conversation/message/', {
        ...messageSend,
      });
      socketClient.emit('send_message', { id_receive: item.id_customer._id });
      getAllMessage();
    }
    setMess('');
    Keyboard.dismiss();
  };

  const getAllMessage = async () => {
    const listMess = await axiosClient.get('gotruck/conversation/message/' + item._id);
    listMess.reverse();
    setListMessage(listMess);

    const listMessUnread = [];
    listMess.map((item) => {
      if (item.read.indexOf(user._id) === -1) {
        item.read.push(user._id);
        listMessUnread.push(item);
      }
    });

    await axiosClient.put('gotruck/conversation/read', listMessUnread);
  };

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

  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  //------------------------------
  useEffect(() => {
    getAllMessage();
    socketClient.on('message' + String(user._id), (data) => {
      getAllMessage();
    });
    return () => {
      socketClient.off('message' + String(user._id));
    };
  }, []);

  return (
    <>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()} />
        <Text style={styles.header.txtHeader}>{item.id_customer.name}</Text>
        {!item.disable ? (
          <Feather name="phone" size={24} color="white" onPress={() => handleCallPhone()} />
        ) : (
          <View></View>
        )}
      </View>
      <View style={styles.container}>
        <FlatList
          data={listMessage}
          inverted={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <>
                {item.userSendModel == 'Shipper' ? (
                  <Text style={styles.time.owner}>{timeSince(new Date(item.createdAt))}</Text>
                ) : (
                  <Text style={styles.time.shipper}>{timeSince(new Date(item.createdAt))}</Text>
                )}
                <View
                  style={
                    item.userSendModel == 'Shipper'
                      ? [styles.itemChat, { justifyContent: 'flex-end' }]
                      : styles.itemChat
                  }
                >
                  {item.userSendModel == 'Shipper' ? null : (
                    <Image source={{ uri: item.id_sender.avatar }} style={styles.avatar} />
                  )}
                  {item.userSendModel == 'Shipper' ? (
                    <>
                      <View style={styles.view.owner}>
                        <Text style={styles.text.owner}>{item.message}</Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.view.shipper}>
                      <Text style={styles.text.shipper}>{item.message}</Text>
                    </View>
                  )}
                </View>
              </>
            );
          }}
          keyExtractor={(item) => item._id}
        />
        {!item.disable && (
          <View style={styles.viewInput}>
            <View style={styles.input}>
              <TextInput
                value={mess}
                onChangeText={(t) => setMess(t)}
                style={styles.txtInput}
                placeholder="Nhập tin nhắn..."
                numberOfLines={99}
              />
            </View>
            <Ionicons
              name="send"
              size={30}
              color={stylesGlobal.mainGreen}
              style={styles.iconSend}
              onPress={() => handleMessage()}
            />
          </View>
        )}
      </View>
    </>
  );
}
