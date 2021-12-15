import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ottList = {
  netflix: 1,
  watcha: 2,
  wavve: 3,
  tving: 4,
  disney: 5,
  prime: 6,
  laftel: 7,
  apple: 8,
  nintendo: 9,
  office: 10,
};
export const getPartyId = (ottName) => {
  return ottList[ottName];
};
