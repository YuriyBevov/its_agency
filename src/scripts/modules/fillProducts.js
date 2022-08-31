import { mock } from "../utils/mockData.js";
import { init as catalogInit } from "./catalog/init.js";
import { ls, catalogStorageField } from "../utils/localStorageHelper.js";

ls('update', catalogStorageField, mock);
catalogInit(mock);
