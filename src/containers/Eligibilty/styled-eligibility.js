import styled from 'styled-components'

/**
 * Styled Components
 */

export const SubtitleEmphasis = styled.span`
 font-weight: 700;
 color: #C7AE4A;
`

export const HeaderContainer = styled.div`
  text-align: center;
    color: #fff;
    padding-top: 40px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.5em;
    margin-top: 15px;
`;

export const ParallaxWrapper = styled.div`
  /* overflow: hidden; */
  overflow: inherit !important;
  background-color: #EDEDED;
`

export const ParallaxContainer = styled.div`
  min-height: 100vh !important;
  /* min-height: 640px; */
  /* height: 760px; */
  padding-top: 150px;
  padding-bottom: 50px;
  margin: 0 auto;
  margin-top: 80px;
  max-width: 1080px;
  overflow: auto;
`

export const MainTitle = styled.div`
  color: #ffffff;
  font-family: 'Helvetica', sans-serif;
  font-size: 54px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: 1.2em;
  text-align: center;
  margin: 0 auto;
  max-width: 920px;
`

export const Subtitle = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  padding-top: 40px;
  margin: 0 auto;
  max-width: 820px;
  padding-bottom: 60px;
`

/* AutoSuggest Styles */

export const AutoSuggestWrapper = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  grid-template-columns: minmax(min-content, 400px);
  padding-left: 50px;
  padding-right: 50px;
  margin: 0 auto;
  max-width: 920px;
`

export const AutoSuggestContainer = styled.div`
  position: relative;
  z-index: 999;
`

export const IframeSearchBtn = styled.button`
  &,
  &:link,
  &:visited {
    width: 100%;
    height: 48px;
    text-align: center !important;
    color: white !important;
    cursor: pointer;
    background-color: #55b96a;
    font-size: 0.94rem;
    font-weight: 700;
    border: 1px solid #55b96a;
    border: none;
    /* padding: 0.62rem 1.25rem; */
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
    z-index: 999;
  }

  &:hover {
    background-color: #4ca25e;
    background-position: 100%;
    color: white;
  }

  &:active {
    outline: none;
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #d4d4d4;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;