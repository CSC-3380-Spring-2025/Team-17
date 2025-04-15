import { AuthProvider } from "@/app/context/AuthContext"
import { Slot } from "expo-router"
import AuthHandler from "@/app/AuthHandler"

export default function Layout() {
 return (
  <AuthProvider>
   <AuthHandler />
   <Slot />
  </AuthProvider>
 )
}