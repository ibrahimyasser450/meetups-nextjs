import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

// contains the header and the main content of the page which the _app.js send it.
function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
