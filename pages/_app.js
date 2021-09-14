import "../styles/globals.scss";
import Container from "../components/Container/Container";
import BasketContextProvider from "../components/Container/Context";

function MyApp({ Component, pageProps }) {
  return (
    <BasketContextProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </BasketContextProvider>
  );
}

export default MyApp;
