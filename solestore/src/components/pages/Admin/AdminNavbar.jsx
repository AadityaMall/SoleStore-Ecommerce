import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardComponent from "./DashboardComponent";
import OrdersList from "./OrdersList";
import {
  Dashboard,
  Person,
  Reviews,
  LocalShipping,
  AddCircle,
  ListAlt,
  Menu,
} from "@mui/icons-material";
import { Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersList from "./UsersList";
import ProductsList from "./ProductsList";
import AllReviews from "./AllReviews";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import UpdateUserRole from "./UpdateUserRole";
import UpdateOrder from "./UpdateOrder";
const drawerWidth = 240;

const AdminNavbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const drawerComponents = [
    { name: "Dashboard", icon: <Dashboard />, path: "" },
    { name: "Orders", icon: <LocalShipping />, path: "orders" },
    { name: "Users", icon: <Person />, path: "users" },
    { name: "Reviews", icon: <Reviews />, path: "reviews" },
  ];
  const drawerComponentsTwo = [
    { name: "All Products", icon: <ListAlt />, path: "all-products" },
    { name: "Add Product", icon: <AddCircle />, path: "add-product" },
  ];
  const drawer = (
    <div>
      <Toolbar />
      <Link to={"/"} className="tw:flex tw:justify-center tw:items-center">
        <img
          src="/images/darkmode_logo.png"
          className="tw:max-w-[150px] tw:rounded-full"
          alt=""
        />
      </Link>
      <Divider sx={{ p: 2, borderColor: "black" }} />
      <List>
        {drawerComponents.map((item, index) => (
          <Link
            to={`/admin/${item.path}`}
            className="tw:no-underline text-reset"
            key={index}
          >
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {drawerComponentsTwo.map((item, index) => (
          <Link
            to={`/admin/${item.path}`}
            className="tw:no-underline text-reset"
            key={index}
          >
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} data-theme = "light">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#343a40",
        }}
      >
        <Toolbar>
          <div className="tw:flex tw:justify-between tw:w-full">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="tw:flex tw:justify-center tw:items-center"
            >
              SoleStore Admin
            </Typography>
            <div className="tw:flex tw:justify-end">
              <Link
                to="/account"
                className={`tw:flex py-2 tw:md:py-0 tw:justify-center`}
              >
                <img
                  src={user.avatar.url}
                  className="tw:w-[40px] tw:min-w-[40px] tw:aspect-square tw:object-contain tw:rounded-full"
                  alt="userProfile"
                />
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <div className="tw:mt-[80px]">
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="users" element={<UsersList />} />
            <Route path="all-products" element={<ProductsList />} />
            <Route path="reviews" element={<AllReviews />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product/:id" element={<UpdateProduct />} />
            <Route path="user/:id" element={<UpdateUserRole />} />
            <Route path="order/:id" element={<UpdateOrder />} />

          </Routes>
        </div>
      </Box>
    </Box>
  );
};

export default AdminNavbar;
