import {Generated} from "./Generated.tsx";
import {ExpProvider} from "@/context/exp";

function App() {

  return <ExpProvider>
    <Generated />
  </ExpProvider>
}

export default App
