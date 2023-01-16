import styles from './stylesHome';
import stylesGlobal from '../../../global/stylesGlobal';
import NewOrderDetail from './NewOrderDetail/NewOrderDetail';

import { View, Text, StatusBar, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AntDesign, Entypo, FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import SwipeUpDown from 'react-native-swipe-up-down';

export default function Home({ navigation, route }) {
  const [status, setStatus] = useState(true);
  const [expand, setExpand] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [addressExpected, setAddressExpected] = useState(
    '336/15/14 Lê Văn Quới, P. Bình Trị Đông, Q. Bình Tân',
  );
  const [haveOrder, setHaveOrder] = useState(true);
  const [received, setReceived] = useState(false);

  const swipeUpDownRef = useRef();
  useEffect(() => {
    if (route.params != null) {
      if (route.params.received) setReceived(true);
      swipeUpDownRef.current.showMini();
    }
  }, [route.params]);

  const order = [
    {
      id: 1,
      title: 'Đơn giao tới TP.HCM',
      content:
        'Đơn hàng giao từ Khóm 6C, Thị Trấn Sông Đốc, Huyện Trần Văn Thời, Tỉnh Cà Mau tới Số 8 Lê Lợi, Gò Vấp, TP.HCM',
    },
    {
      id: 2,
      title: 'Đơn giao trong nội thành',
      content:
        'Đơn hàng giao từ Khóm 6C, Thị Trấn Sông Đốc, Huyện Trần Văn Thời, Tỉnh Cà Mau tới  Số 90E, đường Lê Lợi, Khóm 2, Phường 2, Thành phố Cà Mau, Tỉnh Cà Mau.',
    },
  ];

  const orderItem = {
    id: 'HD2023001',
    from: '456 Lê Văn Quới, P. Bình Trị Đông, Q. Bình Tân TP.HCM',
    to: 'Số 12 Nguyễn Văn Bảo P.4, Q.Gò Vấp, TP.HCM',
    note: 'Trường Đại học Công Nghiệp TPHCM',
    peopleSend: 'Nguyễn Văn Bình',
    phoneSend: '0909152365',
    peopleReceive: 'Nguyễn Văn An',
    phoneReceive: '0794812125',
    shipper: {
      id: null,
      name: null,
      numberTruck: null,
    },
    distance: '50km',
    expectedTime: '3-5 ngày',
    price: 2500000,
    status: 'Đã nhận',
    review: {
      star: null,
      comment: null,
    },
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      {!haveOrder ? (
        status ? (
          <View>
            {/* Đang hoạt động */}
            <View style={styles.isOnline}>
              <Collapse
                onToggle={() => {
                  setExpand(!expand);
                  setShowMessage(false);
                }}
                isExpanded={expand}
              >
                <CollapseHeader>
                  <View style={styles.header}>
                    <Text style={styles.txtHeader}>Đang hoạt động</Text>
                    {expand ? (
                      <Entypo name="chevron-up" size={24} color="black" />
                    ) : (
                      <Entypo name="chevron-down" size={24} color="black" />
                    )}
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <View style={styles.body}>
                    <Text>Địa điểm đến mong muốn</Text>
                    <View>
                      <Pressable style={styles.input} onPress={() => {}}>
                        <View style={stylesGlobal.inline}>
                          <Ionicons name="location-sharp" size={20} color="red" />
                          {addressExpected ? (
                            <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
                              <Text style={{ fontSize: 16 }} numberOfLines={1}>
                                {addressExpected}
                              </Text>
                            </ReadMore>
                          ) : (
                            <Text style={styles.txtAddressNull}>Chưa có</Text>
                          )}
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                      </Pressable>
                    </View>
                  </View>
                </CollapseBody>
              </Collapse>
            </View>
            {/* Thông báo */}
            <TouchableOpacity
              style={styles.viewBell}
              onPress={() => {
                setShowMessage(!showMessage);
                setExpand(false);
              }}
            >
              <FontAwesome5 name="bell" size={24} color="white" />
              <Text style={styles.numberMess}>10</Text>
            </TouchableOpacity>

            {showMessage ? (
              <View style={styles.viewMessage}>
                <ScrollView style={{ maxHeight: 200 }}>
                  {order.map((e, i) => (
                    <View key={i} style={[stylesGlobal.inline, styles.itemMess]}>
                      <View style={styles.viewIcon}>
                        <FontAwesome name="truck" size={24} color={stylesGlobal.darkGreen} />
                      </View>
                      <View>
                        <Text style={styles.txtTitle}>{e.title}</Text>
                        <View style={styles.txtContent}>
                          <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
                            <Text numberOfLines={1}>{e.content}</Text>
                          </ReadMore>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : null}

            {/* Online, Offline */}
            <TouchableOpacity
              style={styles.btnPower}
              onPress={() => {
                setStatus(!status);
              }}
            >
              <AntDesign name="poweroff" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.btnPower, { backgroundColor: 'red' }]}
            onPress={() => {
              setStatus(!status);
            }}
          >
            <AntDesign name="poweroff" size={24} color="white" />
          </TouchableOpacity>
        )
      ) : (
        <SwipeUpDown
          itemMini={(show) => (
            <View>
              <NewOrderDetail item={orderItem} show={'mini'} received={received} />
            </View>
          )}
          itemFull={(hide) => (
            <View>
              <NewOrderDetail item={orderItem} show={'full'} received={received} />
            </View>
          )}
          ref={swipeUpDownRef}
          animation="spring"
          disableSwipeIcon
          iconColor="yellow"
          iconSize={30}
          style={styles.swiper}
          swipeHeight={250}
        />
      )}
    </View>
  );
}
