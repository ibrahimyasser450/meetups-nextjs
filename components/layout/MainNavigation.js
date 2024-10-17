import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./MainNavigation.module.css";

// static navigation for the app
function MainNavigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch(event) {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push("/?search=" + searchQuery); // Redirect to home with search query
      setSearchQuery(""); // make search query empty
    }
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <form onSubmit={handleSearch} className={classes.searchForm}>
        <input
          type="text"
          placeholder="Search Meetups"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={classes.searchInput}
        />
        <button type="submit" className={classes.searchButton}>
          Search
        </button>
      </form>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
