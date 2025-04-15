import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

export default function AuthHandler() {
 const { user } = useAuth()
 const router = useRouter()
 const [mounted, setMounted] = useState(false)

 // Set the mounted state to true once the component has rendered
 useEffect(() => {
  setMounted(true) // Set mounted to true once the component has rendered
 }, [])

 // Redirect based on user state only after the layout has mounted
 useEffect(() => {
  if (mounted) {
   // Ensure navigation only after mounted
   if (!user) {
    router.replace("/account") // Redirect to login if unauthenticated
   } else {
    router.replace("/(tabs)/home") // Redirect to main tabs if authenticated
   }
  }
 }, [user, router, mounted]) // Depend on mounted to avoid early navigation

 return null // No UI for this component, it only handles navigation
}