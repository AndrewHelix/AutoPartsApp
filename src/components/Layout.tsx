import { Outlet } from "react-router-dom"

import Header from "./header/header"
import { Categories } from "./menu/Categories"
import { AddPart } from "./mainArea/AddPart"

export function Layout() {
  return <div className="app">
     
      <Header />
      <Categories />
      <AddPart />
  </div>
}