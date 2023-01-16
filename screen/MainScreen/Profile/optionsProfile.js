import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';

const options = [
  {
    title: 'Phương tiện',
    navigateTo: 'Vehicle',
    icon: <FontAwesome name="truck" size={30} color="black" />,
  },
  {
    title: 'Xem đánh giá',
    navigateTo: 'Review',
    icon: <Entypo name="star" size={30} color="black" />,
  },
  {
    title: 'Ví GoTruck',
    navigateTo: 'GoTruckPay',
    icon: <Entypo name="wallet" size={30} color="black" />,
  },
  {
    title: 'Trợ giúp',
    navigateTo: 'Help',
    icon: <Ionicons name="help-circle" size={30} color="black" />,
  },
  {
    title: 'Đăng xuất',
    navigateTo: 'Welcome',
    icon: <Ionicons name="log-out-outline" size={30} color="red" />,
    color: 'red',
  },
];

export default options;
