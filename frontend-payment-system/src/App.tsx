import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { httpClient } from "./utils/http";
import { fecthUser } from "./redux/user.slice";
import Load from "./components/Load";

export default function App() {
  const [load, setLoad] = useState(true)
  const dispatch = useDispatch()
  const token = localStorage.getItem("paymentsToken")
  const user = useSelector((user: RootState) => user.user.user)

  useEffect(() => {
      if(user.id === "" && token){
          httpClient("user", "GET", {})
          .then((res) => 
            dispatch(fecthUser(res.data[0])))
          .catch(() => localStorage.removeItem("paymentsToken"))
          setLoad(false)
      } else {
        setLoad(false)
    }
  }, [])

  return <Load load={load} />
}