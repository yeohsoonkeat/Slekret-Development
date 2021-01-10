import { Route, Switch } from "react-router-dom";
import ForumPage from "../view/ForumPage";

export default function ProfileRoute() {
  return (
    <Switch>
      <Route path="/forum/" component={ForumPage} />
    </Switch>
  );
}
