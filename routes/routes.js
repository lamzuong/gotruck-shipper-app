import Login from '../screen/Login/Login';
import MainScreen from '../screen/MainScreen/MainScreen';

import NewOrderDetail from '../screen/MainScreen/Home/NewOrderDetail/NewOrderDetail';
import ReceiveGoods from '../screen/MainScreen/Home/ReceiveGoods/ReceiveGoods';
import ShippedGoods from '../screen/MainScreen/Home/ShippedGoods/ShippedGoods';
import FinishPage from '../screen/MainScreen/Home/FinishPage/FinishPage';

import OrderDetail from '../screen/MainScreen/Order/OrderDetail/OrderDetail';

import ChatRoom from '../screen/MainScreen/Message/Chat/ChatRoom/ChatRoom';
import InfoDetail from '../screen/MainScreen/Message/Info/InfoDetail/InfoDetail';

import EditProfile from '../screen/MainScreen/Profile/EditProfile/EditProfile';
import Review from '../screen/MainScreen/Profile/Review/Review';
import Support from '../screen/MainScreen/Profile/Support/Support';
import Help from '../screen/MainScreen/Profile/Support/Help/Help';

import GoTruckPay from '../screen/MainScreen/Profile/GoTruckPay/GoTruckPay';
import HistoryMoney from '../screen/MainScreen/Profile/GoTruckPay/HistoryMoney/HistoryMoney';
import Withdraw from '../screen/MainScreen/Profile/GoTruckPay/Withdraw/Withdraw';
import WithdrawSuccess from '../screen/MainScreen/Profile/GoTruckPay/Withdraw/WithdrawSuccess/WithdrawSuccess';

import Vehicle from '../screen/MainScreen/Profile/Vehicle/Vehicle';
import FormVehicle from '../screen/MainScreen/Profile/Vehicle/FormVehicle/FormVehicle';
import SendFormSuccess from '../screen/MainScreen/Profile/Vehicle/SendFormSuccess/SendFormSuccess';
import ExpectedAddress from '../screen/MainScreen/Home/ExpectedAddress/ExpectedAddress';
import OrderDetailForNotification from '../screen/MainScreen/Home/OrderDetailForNotification/OrderDetailForNotification';
import SelectLocationOnMap from '../screen/MainScreen/Home/ExpectedAddress/SelectLocationOnMap/SelectLocationOnMap';

// Không cần đăng nhập
const publicRoutes = [
  { name: 'Login', component: Login, header: false },
  { name: 'MainScreen', component: MainScreen, header: false },

  // Screen options in Home
  { name: 'NewOrderDetail', component: NewOrderDetail, header: false },
  { name: 'ExpectedAddress', component: ExpectedAddress, header: false },
  { name: 'SelectLocationOnMap', component: SelectLocationOnMap, header: false },
  {
    name: 'ReceiveGoods',
    component: ReceiveGoods,
    header: true,
    title: 'Chụp ảnh khi nhận hàng',
    animation: 'slide_from_right',
  },
  {
    name: 'ShippedGoods',
    component: ShippedGoods,
    header: true,
    title: 'Chụp ảnh khi giao hàng',
    animation: 'slide_from_right',
  },
  { name: 'FinishPage', component: FinishPage, header: false },

  ,
  {
    name: 'OrderDetailForNotification',
    component: OrderDetailForNotification,
    header: true,
    title: 'Chi tiết đơn hàng',
  },
  // Screen options in Order
  {
    name: 'OrderDetail',
    component: OrderDetail,
    header: true,
    title: 'Chi tiết đơn hàng',
  },

  // Screen options in Message
  { name: 'ChatRoom', component: ChatRoom, header: false },
  { name: 'InfoDetail', component: InfoDetail, header: false },

  // Screen options in Profile
  { name: 'EditProfile', component: EditProfile, header: false },
  {
    name: 'Vehicle',
    component: Vehicle,
    header: true,
    title: 'Phương tiện',
    animation: 'slide_from_right',
  },
  {
    name: 'GoTruckPay',
    component: GoTruckPay,
    header: true,
    title: 'Ví GoTruck',
    animation: 'slide_from_right',
  },
  {
    name: 'Review',
    component: Review,
    header: true,
    title: 'Đánh giá của tôi',
    animation: 'slide_from_right',
  },
  {
    name: 'Support',
    component: Support,
    header: true,
    title: 'Hỗ trợ',
    animation: 'slide_from_right',
  },
  {
    name: 'Help',
    component: Help,
    header: true,
    title: 'Điều khoản & chính sách',
    animation: 'slide_from_right',
  },

  // Screen options in GoTruckPay
  {
    name: 'HistoryMoney',
    component: HistoryMoney,
    header: true,
    title: 'Lịch sử giao dịch',
    animation: 'slide_from_right',
  },
  {
    name: 'Withdraw',
    component: Withdraw,
    header: true,
    title: 'Rút tiền',
    animation: 'slide_from_right',
  },
  {
    name: 'WithdrawSuccess',
    component: WithdrawSuccess,
    header: false,
    animation: 'slide_from_right',
  },

  // Screen options in Vehicle
  {
    name: 'FormVehicle',
    component: FormVehicle,
    header: true,
    title: 'Thông tin phương tiện',
    animation: 'slide_from_right',
  },
  {
    name: 'SendFormSuccess',
    component: SendFormSuccess,
    header: false,
    animation: 'slide_from_right',
  },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
