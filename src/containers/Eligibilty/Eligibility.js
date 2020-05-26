import React, { useEffect, useState } from "react";
import { useFirebase } from "../../hooks";
import { useDomains } from "./eligibility-hooks";

/* Styles */
import "./styles.css";
// import { Parallax } from "react-parallax";
// import BgImg from "../../assets/images/nff-bg-image.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  ParallaxWrapper,
  ParallaxContainer,
  MainTitle,
  Subtitle,
  SubtitleEmphasis,
  HeaderContainer,
} from "./styled-eligibility"

/* Components */
import AutoSuggest from "../../components/AutoSuggest/AutoSuggest";
import Screening from "./Screening/Screening";
import Recommendation from "./Recommendation/Recommendation";
import ContactUsForm from "./ContactUsForm"
import { hideSiteContainers } from "./helpers";

/**
 * Controls the 'flow' of displaying the screeening and various recommendations
 */
const Eligibility = () => {
  const firebase = useFirebase();
  const { pubDomain, devDomain } = useDomains();
  // const { firestoreUser } = useFirestoreUser();

  const [showSearch, setShowSearch] = useState(true);
  const [showScreening, setShowScreening] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false)


  useEffect(() => {
    let hideSurrounding = window.location.href === pubDomain || window.location.href === devDomain;

    if (hideSurrounding) {
      hideSiteContainers();
    }
  }, []);


  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    setSelectedAddress(suggestion);
  }

  function handleCloseContactForm() {
    setShowContactModal(false)
  }
  function handleShowContactForm() {
    setShowContactModal(true)
  }

  function updateParentCountyState(county) {
    setSelectedCounty(county)
  }

  const handleProceedButton = (address) => {
    setSelectedAddress(address)
    setShowSearch(false);
    setShowScreening(true);
  };

  /**
   * Render the recommendations 
   */
  if (showRecommendation) {
    return (
      <Recommendation county={selectedCounty} address={selectedAddress} />
    )
  }

  /**
   * Show the screening form if this value is 'true'
   * Check if the user has filled out the screening form previously in their
   * browser's session.
   * 
   * Skip to recommendations if they're information is cache'd
   */
  if (showScreening) {
    const name = window.sessionStorage.getItem('name')
    const email = window.sessionStorage.getItem('email')
    const phone = window.sessionStorage.getItem('phone')
    const cacheExists = name !== null || email !== null || phone !== null

    if (cacheExists) {
      // show the recommendation
      setShowRecommendation(true)
      // Add to firebase
      let timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
      let screeningFormData = { name, email, phone, timestamp }
      const screeningFormMessageObj = {
        to: 'info@nofloodflorida.com',
        // to: 'kylekaplan50@gmail.com',
        template: {
          name: 'screeningFormTemplate',
          data: {
            address: selectedAddress,
            ...screeningFormData,
          }
        }
      }
      firebase.doFirestoreAdd('screeningForm', screeningFormMessageObj)
    } else {
      return (
        <Screening
          selected={selectedAddress}
          setShowRecommendation={setShowRecommendation}
        />
      );
    }
  }

  /* Render IFrame Landing */
  if (showSearch) {
    return (
      <IFrameLanding
        onSuggestionSelected={onSuggestionSelected}
        updateParentCountyState={updateParentCountyState}
        firebase={firebase}
        handleProceedButton={handleProceedButton}
        selectedCounty={selectedCounty}
        showContactModal={showContactModal}
        handleShowContactForm={handleShowContactForm}
        handleCloseContactForm={handleCloseContactForm}
      />
    );
  }
};

const IFrameLanding = props => {
  const {
    onSuggestionSelected,
    updateParentCountyState,
    firebase,
    handleProceedButton,
    showContactModal,
    handleShowContactForm,
    handleCloseContactForm,
  } = props


  return (
    <ParallaxWrapper>
      <div className="parallax-bg"> {/* removed Parallax because for some reason modal would not work */}
        <ParallaxContainer>
          <MainTitle>
            Best Available Technology <br /> & Flood Risk Models
          </MainTitle>
          <Subtitle>
            Let’s take the first step together and help you save thousands on
            your flood insurance.{" "}
            <SubtitleEmphasis>
              Find out for FREE if your property is eligible.
            </SubtitleEmphasis>
          </Subtitle>
          <div style={{ paddingLeft: "10px", paddingRight: "10px", textAlign: 'center', marginTop: '-40px' }}>
            <Row xs={12} style={{ margin: "0 auto", maxWidth: "800px" }}>
              <Col xs={12} style={{ padding: "0", margin: "0", margin: '0 auto' }}>
                <AutoSuggest
                  autocomplete="off"
                  theme={autosuggestTheme}
                  countySelectStyles={countySelectStyles}
                  updateParentCountyState={updateParentCountyState}
                  onSuggestionSelected={onSuggestionSelected}
                  inputProps={{ id: "eligibilityAddressSuggest" }}
                  firebase={firebase}
                  showProceedButton={true}
                  handleProceedButton={handleProceedButton}
                  showStats
                />
              </Col>
            </Row>
          </div>
          <HeaderContainer>
            <p style={{ margin: "-20px auto", maxWidth: "720px" }}>
              Can’t find your property?{" "}
              <u style={{ color: "#007bff", cursor: 'pointer' }} onClick={handleShowContactForm}>Contact us</u> for a custom
            screening.
          </p>
            <ContactUsForm show={showContactModal} handleClose={handleCloseContactForm} />
          </HeaderContainer>
        </ParallaxContainer>
      </div>
    </ParallaxWrapper>
  );
};

export default Eligibility;

/* Auto Suggest Theme Styles */
const menuStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
  zIndex: '999',
}

const autosuggestTheme = {
  container: {
    width: '100%',
    color: '#666666',
    fontWeight: '500',
    position: 'relative',
    top: '6px',
  },

  containerOpen: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: '999',
    position: 'relative',
  },

  input: {
    fontWeight: '500',
    color: "#666666",
    width: '100%',
    padding: '10px 15px 10px 15px',
    height: '3rem',
    border: 'none',
  },

  inputOpen: {
    fontWeight: '500',
    color: "#666666",
    padding: '10px 15px 10px 15px',
    border: 'none',
  },

  inputFocused: {
    outline: 'none',
  },

  suggestionsContainer: {
    maxHeight: '300px',
    margin: '0',
    padding: '0',
    /* overflow: 'scroll', */
    zIndex: '999',
    textAlign: 'left',
  },

  /**
   * Position absolute here will not push the containers underneath down.
   */
  suggestionsContainerOpen: {
    width: '100%',
    /* overflow: 'scroll', */
    zIndex: '999',
    backgroundColor: '#fff',
    position: 'absolute'
  },

  suggestionsList: {
    listStyleType: 'none',
    borderTop: '1px solid #eee',
    paddingRight: '40px',
    /* overflow: 'scroll', */
    paddingBottom: '10px',
    marginBottom: '0'
  },

  suggestion: {
    paddingTop: '4px',
    paddingBottom: '4px',
    cursor: 'pointer',
  },

  suggestionHighlighted: {
    backgroundColor: '#eeeeee',
    fontWeight: '600',
  },

  suggestionFirst: {},
  sectionContainer: {},
  sectionContainerFirst: {},
  sectionTitle: {},
}

const countySelectStyles = {
  position: 'relative',
  margin: '0 auto',
  width: '50%',
  minWidth: '215px',
  color: 'white'
}
