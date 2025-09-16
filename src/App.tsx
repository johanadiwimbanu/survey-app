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
    <div className='bg-indigo-50 w-full flex justify-center'>
      {componentToRender}
    </div>
  );
}

export default App;
