import { Entypo, FontAwesome } from '@expo/vector-icons';

const options = [
  // {
  //   title: 'Hướng dẫn nạp tiền vào ví GoTruck',
  //   navigateTo: 'PayIntro',
  //   icon: <FontAwesome name="dollar" size={24} color="black" />,
  // },
  {
    title: 'Điều khoản & chính sách',
    navigateTo: 'Help',
    icon: <Entypo name="help-with-circle" size={24} color="black" />,
  },
  {
    title: 'Gọi đến tổng đài GoTruck',
    navigateTo: '',
    icon: <Entypo name="old-phone" size={24} color="red" />,
    color: 'red',
    special: true,
  },
];

export default options;
