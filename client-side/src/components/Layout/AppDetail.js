import Detail from "../Job/Detail";
import { useParams } from "react-router-dom";
import Header from "./Header";
function AppDetail() {
  const { id } = useParams();
  return (
    <div className=" bg-pink-200">
      <Header number="1" />
      <Detail id={id} />
    </div>
  );
}

export default AppDetail;
