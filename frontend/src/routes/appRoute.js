import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import DashboardHome from "../pages";
import VerificationHome from "../pages/verification";
import InformationHome from "../pages/information";
import StepTwo from "../pages/information/step-2";
import ProductDetailsHome from "../pages/information/product-details";
import ManufacturerLogin from "../pages/manufacturer";
import Home from "../pages/manufacturer/home";
import UserContext from "../context/User";
import { connectWallet, disconnectWallet } from "../utils/hexagon";

const AppRoute = () => {

  return render(
    <BrowserRouter>
      <ChakraProvider theme={theme} resetCSS>
        <Routes>
          <Route index path="/" element={<DashboardHome />} />
          <Route path="/verification" element={<VerificationHome />} />
          <Route path="/information" element={<StepTwo />} />
          {/* <Route path="/information/step-2" element={<StepTwo />} /> */}
          <Route path="/information/product-details/:id" element={<ProductDetailsHome />} />
          <Route path="/manufacturer" element={<ManufacturerLogin />} />
          <Route path="/manufacturer/home" element={<Home />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export default AppRoute;
