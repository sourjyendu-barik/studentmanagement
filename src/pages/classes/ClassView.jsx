import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionContainer from "../../components/SectionContainer";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
const ClassView = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://student-management-system-kappa-blush.vercel.app/classSummary",
        );

        setClasses(response.data?.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <Loading message={"Class data loading"} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }
  //console.log(classes, loading, error);
  console.log(classes);
  return (
    <SectionContainer>
      <h2>Classes</h2>

      {/* {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        classes.map((item, index) => (
          <div key={`class${index}`}>
            <h4>{item.name}</h4>
          </div>
        ))
      )} */}
      <div className="row">
        {classes.map((c, index) => (
          <div
            className="col-md-4 mb-2"
            key={`class${index}`}
            style={{ height: "100%" }}
          >
            <div className="card">
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
