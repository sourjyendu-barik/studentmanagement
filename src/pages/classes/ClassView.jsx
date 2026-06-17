import React, { useEffect } from "react";
//import axios from "axios";
import SectionContainer from "../../components/SectionContainer";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { fetchClassSummary } from "./classSummary";
import { useDispatch, useSelector } from "react-redux";
const ClassView = () => {
  //const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  const {
    classSummary,
    status,
    error: errorState,
  } = useSelector((state) => state.classSummary);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchClassSummary());
    }
  }, [dispatch, status]);
  //console.log(classSummary, status, errorState);
  // useEffect(() => {
  //   const fetchClasses = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const response = await axios.get(
  //         "https://student-management-system-kappa-blush.vercel.app/classSummary",
  //       );

  //       setClasses(response.data?.data);
  //     } catch (err) {
  //       setError(err.response?.data?.message || err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchClasses();
  // }, []);

  if (status === "loading") {
    return <Loading message={"Class summary  loading"} />;
  }

  if (status === "error") {
    return <ErrorMessage message={errorState} />;
  }
  //console.log(classes, loading, error);
  //console.log(classes);
  //console.log(classSummary);
  return (
    <SectionContainer>
      <h1 className="text-center mb-3">Classes Summary</h1>

      {/* {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        classes.map((item, index) => (
          <div key={`class${index}`}>
            <h4>{item.name}</h4>
          </div>
        ))
      )} */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {classSummary.map((c, index) => (
          <div
            className="col-md-4 mb-2"
            key={`class${index}`}
            style={{ height: "100%" }}
          >
            <div
              className="card mb-3 h-100 d-flex flex-column justify-content-between"
              style={{
                background: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)",
                border: "1px solid #CBD5E1",
                borderRadius: "12px",
                padding: "20px",
                color: "#1E293B",
              }}
            >
              <div className="card-body">
                <h3>{c?.className ? c.className : "Class name not added"}</h3>
                <p>Total Students: {c?.totalStudents}</p>
                <p>Boys : {c?.boys}</p>
                <p>Girls : {c?.girls}</p>
                <p>
                  Topper : {c?.topper?.name}({c?.topper?.marks}%)
                </p>
                <p>Average attendance : {c?.avgAttendance}%</p>
                <Button
                  name={`View students of ${c?.className}`}
                  onClick={() => navigate(`/classStudents/${c?.className}`)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ClassView;
