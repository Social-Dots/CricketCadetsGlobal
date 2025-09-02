import './App.css'
import AppPages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      <AppPages />
      <Toaster />
    </>
  )
}

export default App