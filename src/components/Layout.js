"use client";
import { useEffect, useState } from "react";
import { PrismicRichText } from "@prismicio/react";

export const Layout = ({ children, nav }) => {


  return (
    <div className="container">
      

      {children}


    </div>
  );
};
