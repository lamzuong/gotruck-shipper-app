import Login from "../screen/Login/Login";
import MainScreen from "../screen/MainScreen/MainScreen";

import NewOrderDetail from "../screen/MainScreen/Home/NewOrderDetail/NewOrderDetail";
import ReceiveGoods from "../screen/MainScreen/Home/ReceiveGoods/ReceiveGoods";
import ShippedGoods from "../screen/MainScreen/Home/ShippedGoods/ShippedGoods";
import FinishPage from "../screen/MainScreen/Home/FinishPage/FinishPage";

import OrderDetail from "../screen/MainScreen/Order/OrderDetail/OrderDetail";

import ChatRoom from "../screen/MainScreen/Message/Chat/ChatRoom/ChatRoom";
import InfoDetail from "../screen/MainScreen/Message/Info/InfoDetail/InfoDetail";

import EditProfile from "../screen/MainScreen/Profile/EditProfile/EditProfile";
import Vehicle from "../screen/MainScreen/Profile/Vehicle/Vehicle";
import GoTruckPay from "../screen/MainScreen/Profile/GoTruckPay/GoTruckPay";
import Review from "../screen/MainScreen/Profile/Review/Review";
import Support from "../screen/MainScreen/Profile/Support/Support";
import Feedback from "../screen/MainScreen/Profile/Support/Feedback/Feedback";
import Help from "../screen/MainScreen/Profile/Support/Help/Help";
import FormSupportSent from "../screen/MainScreen/Profile/Support/FormSupportSent/FormSupportSent";

// Không cần đăng nhập
const publicRoutes = [
  { name: "Login", component: Login, header: false },
  { name: "MainScreen", component: MainScreen, header: false },

  // Screen options in Home
  { name: "NewOrderDetail", component: NewOrderDetail, header: false },
  { name: "ReceiveGoods", component: ReceiveGoods, header: false },
  { name: "ShippedGoods", component: ShippedGoods, header: false },
  { name: "FinishPage", component: FinishPage, header: false },

  // Screen options in Order
  {
    name: "OrderDetail",
    component: OrderDetail,
    header: true,
    title: "Chi tiết đơn hàng",
  },

  // Screen options in Message
  { name: "ChatRoom", component: ChatRoom, header: false },
  { name: "InfoDetail", component: InfoDetail, header: false },

  // Screen options in Profile
  { name: "EditProfile", component: EditProfile, header: false },
  { name: "Vehicle", component: Vehicle, header: false },
  { name: "GoTruckPay", component: GoTruckPay, header: false },
  { name: "Review", component: Review, header: false },
  {
    name: "Support",
    component: Support,
    header: false,
    animation: "slide_from_right",
  },
  // Screen options in Support
  {
    name: "Feedback",
    component: Feedback,
    header: true,
    title: "Góp ý & Khiếu nại",
    animation: "slide_from_right",
  },
  {
    name: "Help",
    component: Help,
    header: true,
    title: "Trợ giúp",
    animation: "slide_from_right",
  },
  {
    name: "FormSupportSent",
    component: FormSupportSent,
    header: true,
    title: "Đơn đã gửi",
    animation: "slide_from_right",
  },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
