import React from "react";

const IntregratedApis = ({ onRouteChange }) => {
  return (
    <div>

    <div className="ph3 ph2-ns pv2 mv5">
  <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
    <div className="dt-ns dt--fixed-ns w-100">
      <div className="pa3 pa4-ns dtc-ns v-mid">
        <div>
          <h2 className="fw4 blue mt0 mb3">Smart face detection application</h2>
          <p className="black-70 measure lh-copy mv0">
            This is a face detection application. Here face detection REST API has been intregated.
          </p>
        </div>
      </div>
      <div className="pa3 pa4-ns dtc-ns v-mid">
      <input
            className="b input-reset ba bg-animate bg-blue hover-bg-dark-blue grow pointer f5 dib pa2"
            type="submit"
            value="Face recognition API test"
            onClick={() => onRouteChange('face')}
          />
      </div>
    </div>
  </article>
</div>

<div className="ph3 ph2-ns pv2 mv5">
  <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
    <div className="dt-ns dt--fixed-ns w-100">
      <div className="pa3 pa4-ns dtc-ns v-mid">
        <div>
          <h2 className="fw4 blue mt0 mb3">Smart voice to text application</h2>
          <p className="black-70 measure lh-copy mv0">
            This is a voice to text application. Here speech to text has been intregated.
          </p>
        </div>
      </div>
      <div className="pa3 pa4-ns dtc-ns v-mid">
      <input
            className="b input-reset ba bg-animate bg-blue hover-bg-dark-blue grow pointer f5 dib pa2"
            type="submit"
            value="Speech to text API test"
            onClick={() => onRouteChange('voice')}
          />
      </div>
    </div>
  </article>
</div>

    </div>




    
  );
};

export default IntregratedApis;
