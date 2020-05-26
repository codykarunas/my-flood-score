import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as S from "../StyledComponents";
import ExamineSvg from "../../../../assets/images/Examine.svg";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import HighRiskLearnMore from "./HighRiskLearnMore";
import RecommendationFooter from "../RecommendationFooter";

const NotApplicableHighRisk = ({ selectedAddress, propertyData }) => {
  return (
    <div>
      <div style={{ margin: "0 auto", maxWidth: "1100px", paddingTop: "20px", fontWeight: "500" }}>
        <div style={{ paddingBottom: "20px" }}>
          <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
            It is not recommended to pursue a Letter of Map Amendmend for this property.
        </h3>
        </div>
        {/* <Row lg={12} style={{ padding: "20px 20px 20px 20px" }}> */}
        <Row sm={12} style={{ padding: "30px 0 10px 0" }}>
          <Col sm={6}>
            <ResultsContainer>
              <InfoHeader>A Letter of Map Amendment is not applicable for this property.</InfoHeader>
              <InfoBoxWrapper>
                <div>
                  <FaCheck />
                  <BulletLabel>Property Address:</BulletLabel>
                  <span>{selectedAddress}</span>
                </div>
                <div>
                  <FaCheck />
                  <BulletLabel>FEMA Flood Zone:</BulletLabel>
                  <span>
                    {propertyData.FEMA_ZONE}
                  </span>
                </div>
                <div>
                  <FaCheck />
                  <InfoText>
                    FEMA considers this property to be in a high-risk flood zone, a special flood hazard area.
                </InfoText>
                </div>
                <div>
                  <FaCheck />
                  <InfoText>
                    Flood insurance for this property <B>WILL</B> most likely be required.
                </InfoText>
                </div>
              </InfoBoxWrapper>
            </ResultsContainer>
          </Col>
          <Col sm={6}>
            <HighRiskLearnMore img={ExamineSvg} />
          </Col>
        </Row>
        <div><RecommendationFooter /></div>
      </div>
    </div>
  );
}

export default NotApplicableHighRisk;

const BulletLabel = styled.span`
 font-weight: 700;
 font-size: 18px;
 margin-right: 20px;
`

const InfoHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
`

const InfoText = styled.span`
 font-weight: 500;
 margin-right: 20px;
`

const ResultsContainer = styled.div`
  border-top: 6px solid #C7AE4A;
  border-bottom: 6px solid #C7AE4A;
  padding: 50px 0 130px 0;
`

const B = styled.b`
  font-weight: 600;
  color: #FFF;
`

const InfoBoxWrapper = styled.div`
  /* padding: 20px 0 20px 60px; */
  padding: 20px 0 20px 40px;
  display: grid;
  grid-gap: 20px;
`;