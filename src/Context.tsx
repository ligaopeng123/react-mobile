/**********************************************************************
 *
 * @模块名称: Store
 *
 * @模块用途: Store
 *
 * @创建人: ligaoming
 *
 * @date: 2021/6/23 11:29
 *
 * @版权所有: PGLI
 *
 **********************************************************************/
import React, {createContext} from "react";
import {UserProps} from "./interface";

const MainContext: UserProps = {};
export default createContext(MainContext);