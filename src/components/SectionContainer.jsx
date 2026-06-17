import React from "react";

const SectionContainer = ({ children }) => {
  return (
    <section className="py-3">
      <div className="container">{children}</div>
    </section>
  );
};

export default SectionContainer;
