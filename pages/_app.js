import Layout from "@/components/layout/Layout";
import "../styles/globals.css";

// this is the main page of our app containing content of our different pages and the header
function MyApp({ Component, pageProps }) {
  {
    /* <Layout></Layout> => this is the header of our app, if the pages are changed, will still same header */
  }
  return (
    <Layout>
      {/* actual page content of our different pages, it will change whenever we navigate from page A to page B. [ page content will change depending on the page] */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
