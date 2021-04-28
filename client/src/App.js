import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  Home,
  Movies,
  Series,
  DetailMovie,
  DetailSeries,
  AddMovie,
  AddSeries,
  EditMovie,
  EditSeries,
  Favorites,
} from "./pages";
import { ApolloProvider } from "@apollo/client/react";
import client from "./config/graphql";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/series/:id/edit">
              <EditSeries />
            </Route>
            <Route path="/movies/:id/edit">
              <EditMovie />
            </Route>
            <Route path="/series/add">
              <AddSeries />
            </Route>
            <Route path="/movies/add">
              <AddMovie />
            </Route>
            <Route path="/series/:id">
              <DetailSeries />
            </Route>
            <Route path="/movies/:id">
              <DetailMovie />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/series">
              <Series />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
