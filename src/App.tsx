import SurveyStepper from './components/SurveyStepper';
import UserForm from './components/UserForm';
import Result from './components/Result';
import useSurveyStore from './store/surveyStore';

function App() {
  const step = useSurveyStore((state) => state.step);

  let componentToRender;
  switch (step) {
    case 'user':
      componentToRender = <UserForm />;
      break;
    case 'survey':
      componentToRender = <SurveyStepper />;
      break;
    case 'result':
      componentToRender = <Result />;
      break;
    default:
      componentToRender = <UserForm />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-indigo-50 dark:bg-gray-950'>
      {componentToRender}
    </div>
  );
}

export default App;
