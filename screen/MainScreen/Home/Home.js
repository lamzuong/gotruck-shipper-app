import styles from './stylesHome';
import stylesGlobal from '../../../global/stylesGlobal';
import NewOrderDetail from './NewOrderDetail/NewOrderDetail';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AntDesign, Entypo, FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import SwipeUpDown from 'react-native-swipe-up-down';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../../../global/keyGG';
import { AuthContext } from '../../../context/AuthContext';

import { socketClient } from '../../../global/socket';
import axiosClient from '../../../api/axiosClient';
import { getLocationCurrentOfUser, getDistanceTwoLocation } from '../../../global/ultilLocation';
import MyInput from '../../../components/MyInput/MyInput';
import MyButton from '../../../components/MyButton/MyButton';

export default function Home({ navigation, route }) {
  const { dispath, user, locationNow } = useContext(AuthContext);
  const [status, setStatus] = useState(false);
  const [expand, setExpand] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [addressExpected, setAddressExpected] = useState(
    '336/15/14 Lê Văn Quới, P. Bình Trị Đông, Q. Bình Tân',
  );
  const [haveOrder, setHaveOrder] = useState(false);
  const [received, setReceived] = useState(false);
  const [listOrderNotify, setListOrderNotify] = useState([]);
  const [heightSwip, setHeightSwip] = useState(250);
  const [orderItem, setOrderItem] = useState();
  const [showDetail, setshowDetail] = useState(true);

  const [locationShipper, setLocationShipper] = useState(locationNow);
  const [showModal, setShowModal] = useState(false);
  const [valid, setValid] = useState(false);
  const [reason, setReason] = useState('');

  const stopZoomRef = useRef(false);
  const mapRef = useRef();
  const swipeUpDownRef = useRef();

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  let INITIAL_POSITION = {
    latitude: locationNow?.latitude || 10.820685,
    longitude: locationNow?.longitude || 106.687631,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  //Test
  // let INITIAL_POSITION = {
  //   latitude: 10.820685,
  //   longitude: 106.687631,
  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  // };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const zoomMap = (typeZoom) => {
    console.log('zom');
    if (typeZoom === 'from' && orderItem) {
      console.log(1);
      mapRef.current?.fitToCoordinates([locationShipper, orderItem?.from_address], {
        edgePadding,
      });
    } else if (typeZoom === 'to' && orderItem) {
      mapRef.current?.fitToCoordinates([locationShipper, orderItem?.to_address], {
        edgePadding,
      });
      console.log(2);
    }
  };
  const getTruckDefault = () => {
    const truckDefault = user.infoAllTruck.find((tr) => tr.default === true);
    return truckDefault.type_truck.name + '';
  };

  const getTruckDefault2 = () => {
    const truckDefault = user.infoAllTruck.find((tr) => tr.default === true);
    return truckDefault._id;
  };
  const onSocketReceiveOrder = () => {
    socketClient.off(getTruckDefault());
    socketClient.on(getTruckDefault(), async (data) => {
      console.log(locationShipper.address);
      const distanceTwoLocation = await getDistanceTwoLocation(locationShipper, data.from_address);
      const distanceReceiveOrder = await axiosClient.get('gotruck/ordershipper/distancereceive');
      if (
        distanceTwoLocation >= 0 &&
        distanceTwoLocation <= distanceReceiveOrder.distance_receive_order
      ) {
        setListOrderNotify((prev) => {
          return [...prev, data];
        });
      } else if (distanceTwoLocation < 0) {
        console.log('Không có đường tới nơi nhận hàng');
      } else {
        console.log('Đơn hàng quá xa');
      }
    });
  };

  useEffect(() => {
    if (status) {
      onSocketReceiveOrder();
    } else {
      socketClient.off(getTruckDefault());
      setListOrderNotify([]);
    }
  }, [status]);

  useEffect(() => {
    if (route.params != null) {
      if (route.params.itemCancel) {
        setListOrderNotify((prev) => {
          const index = prev.findIndex((e) => e.id_order === route.params.itemCancel.id_order);
          if (index > -1) {
            prev.splice(index, 1);
          }
          return [...prev];
        });
      } else if (route.params.checkHaveOrder) {
        (async function () {
          const updateNewOrder = route.params.itemOrder;
          const truckId = getTruckDefault2();
          updateNewOrder.shipper = {
            id_shipper: user._id,
            truck: truckId,
          };
          updateNewOrder.status = 'Đã nhận';
          const res = await axiosClient.put('gotruck/ordershipper/', updateNewOrder);
          if (res.status === 'Đã nhận' && res.shipper.id_shipper === user._id) {
            socketClient.off(getTruckDefault());
            socketClient.off(getTruckDefault() + 'cancel');
            setOrderItem((prev) => route.params.itemOrder);
            setHaveOrder(true);
            socketClient.emit('shipper_receive', res);
          } else if (res.status == 'Đã hủy' && res.reason_cancel.user_cancel === 'AutoDelete') {
            Alert.alert('Thông báo', 'Đơn hàng đã quá hạn');
          } else if (res.status == 'Đã hủy' && res.reason_cancel.user_cancel === 'Customer') {
            Alert.alert('Thông báo', 'Đơn hàng đã bị khách hàng hủy');
          } else {
            Alert.alert('Thông báo', 'Đơn hàng đã được nhận bởi shipper khác');
          }
        }.call(this));
      } else if (route.params.receivedGoods) {
        stopZoomRef.current = false;
        setHeightSwip(120);
        setReceived(true);
      } else if (route.params.completed) {
        setHaveOrder(false);
        setReceived(false);
        setShowMessage(false);
        setListOrderNotify([]);
        onSocketReceiveOrder();
        onSocketCancel();
        stopZoomRef.current = false;
      } else {
        console.log('err Home' + route.params);
      }
    }
  }, [route]);

  useEffect(() => {
    socketClient.off(getTruckDefault() + 'received');
    socketClient.on(getTruckDefault() + 'received', (data) => {
      setListOrderNotify((prev) => {
        const index = prev.findIndex((e) => e.id_order === data.id_order);
        if (index > -1) {
          prev.splice(index, 1);
        }
        return [...prev];
      });
    });
    onSocketCancel();
    socketClient.off(getTruckDefault() + 'cancel_received');
    socketClient.on(getTruckDefault() + 'cancel_received', async (data) => {
      Alert.alert('Thông báo', 'Đơn hàng đã bị hủy bởi khách hàng');
      setReason('');
      setValid(false);
      setShowModal(false);
      setShowMessage(false);
      setListOrderNotify([]);
      setHaveOrder(false);
      onSocketReceiveOrder();
    });
  }, []);

 

  const onSocketCancel = () => {
    socketClient.off(getTruckDefault() + 'cancel');
    socketClient.on(getTruckDefault() + 'cancel', async (data) => {
      if (data.status === 'Đã hủy') {
        setListOrderNotify((prev) => {
          const index = prev.findIndex((e) => e.id_order === data.id_order);
          if (index > -1) {
            prev.splice(index, 1);
          }
          return [...prev];
        });
      } else {
        data.status = 'Đã hủy';
        data.reason_cancel = {
          user_cancel: 'AutoDelete',
          content: 'Đơn hàng trong 15 phút không ai nhận',
        };
        const resOrderCancel = await axiosClient.put('gotruck/ordershipper/', data);
        setListOrderNotify((prev) => {
          const index = prev.findIndex((e) => e.id_order === data.id_order);
          if (index > -1) {
            prev.splice(index, 1);
          }
          return [...prev];
        });
      }
    });
  };

  const handleCancelOrder = async (item) => {
    item.status = 'Đã hủy';
    item.reason_cancel = {
      user_cancel: 'Shipper',
      content: reason,
    };
    const resOrderCancel = await axiosClient.put('gotruck/ordershipper/', item);
    if (resOrderCancel.status === 'Đã hủy') {
      if (resOrderCancel.reason_cancel.user_cancel === 'Shipper') {
        socketClient.emit('shipper_cancel', resOrderCancel);
      }
      if (resOrderCancel.reason_cancel.user_cancel === 'Customer') {
        Alert.alert('Thông báo', 'Đơn hàng đã bị hủy bởi khách hàng');
      }
      setReason('');
      setValid(false);
      setShowModal(false);
      setShowMessage(false);
      setListOrderNotify([]);
      setHaveOrder(false);
      onSocketReceiveOrder();
    }
  };



  useEffect(() => {
    console.log('Start');
    const timeId = setInterval(async () => {
      console.log('10s');
      const location = await getLocationCurrentOfUser();
      socketClient.emit('location_shipper', {
        id_order: orderItem?.id_order || "",
        locationShipper: location,
      });
      setLocationShipper(location);
    }, 10000);
    return () => {
      clearInterval(timeId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        zoomEnabled={true}
        addressForCoordinate={(e) => {
          console.log(e);
        }}
      >
        {haveOrder && (
          <MapViewDirections
            origin={locationShipper}
            destination={received ? orderItem.to_address : orderItem.from_address}
            apikey={GOOGLE_API_KEY}
            strokeColor="rgb(0,176,255)"
            strokeWidth={4}
            mode="DRIVING"
            onReady={() => {
              if (stopZoomRef.current === false) {
                if (received) {
                  zoomMap('from');
                } else {
                  zoomMap('to');
                }
                stopZoomRef.current = true;
              }
            }}
            onError={(e) => {
              console.log(e);
              Alert.alert(
                'Thông báo',
                'Không tìm thấy đường đi tới nơi lấy hàng\nĐơn hàng sẽ bị hủy',
              );
            }}
          />
        )}
        {haveOrder &&
          (received ? (
            <Marker
              coordinate={orderItem.to_address}
              onPress={() => {
                setshowDetail(!showDetail);
              }}
            >
              {showDetail && (
                <View style={styles.coordinate}>
                  <Text style={styles.title}>Vị trí giao hàng</Text>
                  <Text style={styles.description}>{orderItem?.to_address?.address}</Text>
                </View>
              )}
              <Ionicons name="location" size={30} color={'red'} style={styles.marker} />
            </Marker>
          ) : (
            <Marker
              coordinate={orderItem.from_address}
              onPress={() => {
                setshowDetail(!showDetail);
              }}
            >
              {showDetail && (
                <View style={styles.coordinate}>
                  <Text style={styles.title}>Vị trí nhận hàng</Text>
                  <Text style={styles.description}>{orderItem?.from_address?.address}</Text>
                </View>
              )}
              <Ionicons
                name="location"
                size={30}
                color={stylesGlobal.mainGreen}
                style={styles.marker}
              />
            </Marker>
          ))}

        <Marker coordinate={locationShipper}>
          <MaterialIcons
            name="local-shipping"
            style={styles.marker}
            size={30}
            color={stylesGlobal.mainGreen}
          />
        </Marker>
      </MapView>
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
              <Text style={styles.numberMess}>{listOrderNotify.length}</Text>
            </TouchableOpacity>

            {showMessage ? (
              listOrderNotify.length > 0 ? (
                <View style={styles.viewMessage}>
                  <ScrollView style={{ maxHeight: 200 }}>
                    {listOrderNotify.map((e, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[stylesGlobal.inline, styles.itemMess]}
                        onPress={() => {
                          setShowMessage(false);
                          navigation.navigate('OrderDetailForNotification', { item: e });
                        }}
                      >
                        <View style={styles.viewIcon}>
                          <FontAwesome name="truck" size={24} color={stylesGlobal.darkGreen} />
                        </View>
                        <View>
                          <Text style={styles.to_ad}>Đơn giao tới {e.to_address.address}</Text>
                          <View style={styles.txtContent}>
                            <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
                              <Text numberOfLines={1}>{e.note ? e.note : 'Không có ghi chú'}</Text>
                            </ReadMore>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <View style={styles.viewMessage}>
                  <View style={[stylesGlobal.inline, styles.itemMess]}>
                    <View style={styles.viewIcon}>
                      <FontAwesome name="truck" size={24} color={stylesGlobal.darkGreen} />
                    </View>
                    <Text style={styles.to_ad}>Không có đơn hàng</Text>
                  </View>
                </View>
              )
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableWithoutFeedback>
                <NewOrderDetail
                  setShowModal={() => setShowModal(true)}
                  item={orderItem}
                  show={'mini'}
                  locationShipper={locationShipper}
                  received={received}
                />
              </TouchableWithoutFeedback>
            </ScrollView>
          )}
          itemFull={(hide) => (
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableWithoutFeedback>
                <View>
                  <NewOrderDetail
                    setShowModal={() => setShowModal(true)}
                    item={orderItem}
                    show={'full'}
                    locationShipper={locationShipper}
                    received={received}
                  />
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          )}
          disablePressToShow={false}
          ref={swipeUpDownRef}
          animation="easeInEaseOut"
          disableSwipeIcon={false}
          iconColor="black"
          iconSize={30}
          style={styles.swiper}
          swipeHeight={heightSwip}
          onShowMini={() => {
            setHeightSwip(120);
          }}
          onShowFull={() => {
            setHeightSwip(270);
          }}
          extraMarginTop={20}
        />
      )}
      {showModal && (
        <View style={styles.centeredView}>
          <View style={styles.close}>
            <AntDesign
              onPress={() => setShowModal(!showModal)}
              name="close"
              size={30}
              color="black"
            />
          </View>
          <View style={styles.contentCancel}>
            <View style={styles.viewInput}>
              <Text style={styles.label}>Lý do hủy</Text>
              <MyInput
                borderWidth={1}
                value={setReason}
                valid={setValid}
                regex={/^.+/}
                multiline={true}
                inputName={true}
                error={'Không được để trống'}
              />
            </View>
          </View>
          {valid ? (
            <View style={styles.btnCancel}>
              <MyButton
                type={'medium'}
                btnColor={'red'}
                txtColor={'white'}
                text="Hủy"
                action={() => handleCancelOrder(orderItem)}
              />
            </View>
          ) : (
            <View style={styles.btnCancel}>
              <MyButton
                type={'medium'}
                btnColor={'rgb(240,128,128)'}
                txtColor={'white'}
                text="Hủy"
                disable={true}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}
