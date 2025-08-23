import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
*{
box-sizing:border-box;
margin:0px;
padding:0px;

body{
background-color:#323334;
color:white;
 font-family: "Exo", sans-serif;min-height:100vh;
}
`

createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyle />
    <App />
  </>
);
