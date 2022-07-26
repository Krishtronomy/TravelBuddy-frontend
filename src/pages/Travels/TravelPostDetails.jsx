import { useParams } from "react-router-dom";

const TravelPostDetails = () => {
  const {id} = useParams();
  return (
    <>
      <h1>Travel post details - {id}</h1>;
    </>
  );
};

export default TravelPostDetails;
