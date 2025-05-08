import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

export default function AuthHandler() {
 const { user } = useAuth()
 const router = useRouter()
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
  setMounted(true)
 }, [])

 useEffect(() => {
  if (mounted) {
   if (!user) {
    router.replace("/loginPage")
   } else {
    router.replace("/(tabs)/home")
   }
  }
 }, [user, router, mounted])

 return null
}