import {
  Switch,
  Route,
} from "react-router-dom";
import { Home } from './pages/Home';
import { TagsCloud } from './pages/TagsCloud';

export function App() {
  return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin/callback">
          <Home />
        </Route>
        <Route path="/cloud">
          <TagsCloud />
        </Route>
      </Switch>
  );
}
