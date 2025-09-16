import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useSurveyStore from '@/store/surveyStore';
import { Card } from './ui/card';

interface Question {
  key: string;
  label: string;
  type: 'text' | 'options';
  options?: string[];
}

function SurveyStepper() {
  const {
    user,
    answer,
    setAnswer,
    setStep,
    currentQuestion,
    setCurrentQuestion,
    timeLeft,
    setTimeLeft,
  } = useSurveyStore();

  const questions: Question[] = [
    { key: 'q1', label: 'What is your main hobby?', type: 'text' },
    { key: 'q2', label: 'What is your favorite food?', type: 'text' },
    { key: 'q3', label: 'Dream vacation destination?', type: 'text' },
    {
      key: 'q4',
      label: 'Which movie genre do you watch most?',
      type: 'options',
      options: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'],
    },
    {
      key: 'q5',
      label: 'Do you prefer coffee or tea?',
      type: 'options',
      options: ['Coffee', 'Tea', 'Neither'],
    },
    { key: 'q6', label: 'What sports do you often play?', type: 'text' },
    {
      key: 'q7',
      label: 'How often do you read books per month?',
      type: 'options',
      options: ['Never', '1-2 times', '3-5 times', 'More than 5'],
    },
    {
      key: 'q8',
      label: 'Most used social media platform?',
      type: 'options',
      options: ['Facebook', 'Instagram', 'Twitter', 'TikTok', 'Other'],
    },
    {
      key: 'q9',
      label: 'Do you prefer working from home or office?',
      type: 'options',
      options: ['Home', 'Office', 'Hybrid'],
    },
    { key: 'q10', label: 'Your personal goal this year?', type: 'text' },
  ];

  const showQuestion = questions[currentQuestion];

  useEffect(() => {
    if (timeLeft <= 0) {
      setStep('result');
      return;
    }
    const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, setStep]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('result');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className='p-6 md:p-10 bg-gray-50 min-h-screen flex items-center justify-center'>
      <div className='min-w-md space-y-6'>
        {/* Header */}
        <div className='text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-white'>
            Survey for {user.name || 'Guest'}
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            ({user.age || '?'} y, {user.job || '?'})
          </p>
        </div>

        {/* Question Card */}
        <Card className='relative min-h-80 flex flex-col justify-between px-6 py-16 bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-transform transform hover:scale-[1.01]'>
          <h2 className='absolute top-4 left-4 text-6xl font-extrabold text-teal-200 dark:text-teal-800 opacity-50'>
            {showQuestion.key}
          </h2>
          <p className='text-xl font-bold text-gray-700 dark:text-gray-300 mx-auto'>
            {showQuestion.label}
          </p>

          <div className='flex-1 flex flex-col justify-center'>
            {showQuestion.type === 'text' ? (
              <Input
                placeholder='Type your answer here...'
                value={answer[showQuestion.key] || ''}
                onChange={(e) => setAnswer(showQuestion.key, e.target.value)}
                className='w-full text-lg p-3 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            ) : (
              <RadioGroup
                value={answer[showQuestion.key] || ''}
                onValueChange={(val) => setAnswer(showQuestion.key, val)}
                className='grid gap-1'
              >
                {showQuestion.options!.map((opt) => (
                  <div
                    key={opt}
                    className='flex items-center space-x-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer'
                  >
                    <RadioGroupItem
                      value={opt}
                      id={opt}
                      className='border-indigo-600'
                    />
                    <label
                      htmlFor={opt}
                      className='text-base text-gray-800 dark:text-gray-200 cursor-pointer'
                    >
                      {opt}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </Card>

        {/* Footer */}
        <div className='flex justify-between items-center mt-6'>
          <span className='text-sm font-mono text-gray-600 dark:text-gray-400 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full'>
            {formatTime(timeLeft)}
          </span>
          <Button
            onClick={handleNext}
            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors'
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
          </Button>
        </div>

        {/* Stepper Indicator */}
        <div className='flex justify-center gap-2 mt-4'>
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === currentQuestion
                  ? 'bg-blue-600'
                  : 'bg-gray-400 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyStepper;
