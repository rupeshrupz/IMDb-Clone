import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import MonthlyReleases from "./components/MonthlyReleases";
import moment from "moment";
import MoviePage from "./components/MoviePage";
import TvPage from "./components/TvPage";

export default function App() {
  let month = moment().format('MMMM')
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={`/${month}-releases`} element={<MonthlyReleases />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/tv/:id" element={<TvPage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
