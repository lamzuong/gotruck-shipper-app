import Finished from "../Finished/Finished";
import Cancelled from "../Cancelled/Cancelled";

// Không cần đăng nhập
const publicRoutes = [
  {
    name: "Finished",
    component: Finished,
    header: false,
    title: "Hoàn thành",
  },
  {
    name: "Cancelled",
    component: Cancelled,
    header: false,
    title: "Đã hủy",
  },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
