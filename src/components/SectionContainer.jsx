import React from "react";

const SectionContainer = ({ children }) => {
  return (
    <section>
      <div className="container">{children}</div>
    </section>
  );
};

export default SectionContainer;
