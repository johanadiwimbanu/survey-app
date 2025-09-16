import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useSurveyStore from '@/store/surveyStore';
import { type User } from '@/types/survey';

function UserForm() {
  const setUser = useSurveyStore((state) => state.setUser);
  const setStep = useSurveyStore((state) => state.setStep);

  const [form, setForm] = useState<User>({
    name: '',
    age: '',
    job: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name === '' || form.age === '' || form.job === '')
      return alert('please fill out the form!');
    setUser(form);
    setStep('survey');
  };

  return (
    <div className='w-full bg-grays-50 sm:min-w-md h-screen flex items-center justify-center'>
      <Card className='bg-white dark:bg-gray-800 min-w-md shadow-xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold text-gray-800 dark:text-white'>
            Hello!
          </CardTitle>
          <CardDescription className='text-sm text-gray-500 dark:text-gray-400'>
            Please fill in your details to start the survey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              name='name'
              placeholder='Your Name'
              value={form.name}
              onChange={handleChange}
              className='w-full text-lg p-3 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
            />
            <Input
              name='age'
              type='number'
              placeholder='Your Age'
              value={form.age}
              onChange={handleChange}
              className='w-full text-lg p-3 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
            />
            <Input
              name='job'
              placeholder='Your Job'
              value={form.job}
              onChange={handleChange}
              className='w-full text-lg p-3 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
            />
            <Button variant={'default'} type='submit' className='w-full'>
              Start Survey
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserForm;
