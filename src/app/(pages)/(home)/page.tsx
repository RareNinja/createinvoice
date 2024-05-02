"use client";
import React, { useState, useRef, useEffect } from "react";
import withAuth from "@/app/components/WithAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
const Home = () => {
  return (
    <div className="container max-w-100 mx-auto flex p-5 flex-col text-xs gap-2">
      <div className="flex flex-row justify-end items-center">
        <div
          className="bg-blue-500 text-white px-5 py-2 rounded-md"
          onClick={() => signOut(auth)}
        >
          Sair
        </div>
      </div>
      <div className="bg-white p-5 gap-5 rounded-lg flex flex-col w-full overflow-hidden">
        <div className="flex flex-wrap justify-center">
          <span className="text-xl font-semibold">
            Seja bem vindo {`Leonardo`}
          </span>
        </div>
        <div className="flex flex-auto justify-center">
          <div className="flex flex-col m-5 p-5 gap-2">
            <p className="text-xl font-semibold">
              Voce deseja criar qual documento neste momento?
            </p>
            <div className="flex flex-row gap-5 justify-center">
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                <a href="/document">Proforma</a>
              </button>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                <a href="/">Invoice</a>
              </button>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                <a href="/">PackList</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
