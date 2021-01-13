import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import IconAnnotation from '../../icons/ic_annotation';
import IconGlobe from '../../icons/ic_globe';
import IconHome from '../../icons/ic_home';
import IconQuestion from '../../icons/ic_question';
import IconButton from './components/IconButton';
import QuestionDetail from './view/QuestionDetail';
import Questions from './view/Questions';

const Forum = (props) => {
  const { match } = props;
  const current_url = match.url;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-8xl flex-1 flex my-8">
      <ul className="w-48 divide-y hidden lg:block mr-8">
        {[
          { title: 'Home', icon: IconHome },
          { title: 'Explore Topics', icon: IconGlobe },
          { title: 'My Questions', icon: IconQuestion },
          { title: 'My Answers', icon: IconAnnotation },
        ].map((category, index) => {
          return (
            <IconButton
              key={index}
              title={category.title}
              icon={category.icon}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </ul>

      <Switch>
        <Route exact path={current_url} component={Questions} />
        <Route path={`${current_url}/:id/:title`} component={QuestionDetail} />
      </Switch>
    </div>
  );
};

export default Forum;
