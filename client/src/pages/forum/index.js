import { Route, Switch } from "react-router-dom";
import routes from "../../constant/routes";
import DefaultLayout from "../../layout/default";
import ForumHome from "./view/ForumHome";

const Forum = () => {
  return (
    <DefaultLayout>
      <Switch>
        <Route path={routes.forum} component={ForumHome} />
      </Switch>
    </DefaultLayout>
  );
};

export default Forum;
