import { RouterProvider } from "react-router-dom"
import { router } from "./routers"
import { AuthContextProvider } from "./context/auth-context"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/tanstack"

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App
