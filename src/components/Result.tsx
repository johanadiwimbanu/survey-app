import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import useSurveyStore from '@/store/surveyStore';

function Result() {
  const { resetAll } = useSurveyStore();

  const handleRestart = () => {
    resetAll();
  };

  return (
    <div className='w-full bg-gray-50s sm:min-w-md h-screen flex items-center justify-center'>
      <Card className='bg-white w-md shadow-xl'>
        <CardContent className='space-y-6'>
          <div className='text-4xl font-extrabold'>You're a legend!</div>
          <p className='text-xl font-semibold text-gray-700'>
            Thanks a bunch for taking the time to complete our survey.
          </p>
          <p className='text-sm text-gray-500'>
            Your insights are super valuable. We appreciate you! 🙌
          </p>
          <Button onClick={handleRestart} variant={'destructive'}>
            Start Another One?
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Result;
