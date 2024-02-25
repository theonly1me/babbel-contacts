'use client';

import { findOrCreateContact } from '@/actions';
import { useFormState } from 'react-dom';

const Form: React.FC = () => {
  const [formState, action] = useFormState(findOrCreateContact, {
    name: '',
    domain: '',
  });

  return (
    <form className="flex flex-col gap-4" action={action}>
      <div className="flex flex-col items-start justify-center gap-2">
        <label htmlFor="name">Name</label>
        <input
          className="w-96 h-10 border border-gray-200 rounded-lg p-2 focus:border-gray-400 focus:outline-none"
          autoComplete="off"
          type="text"
          name="name"
          id="name"
        />
        {formState.errors?.name && (
          <span className="text-red-500 break-words max-w-96">
            {formState.errors.name}
          </span>
        )}
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <label htmlFor="domain">Domain</label>
        <input
          className="w-96 h-10 border border-gray-200 rounded-lg p-2 focus:border-gray-400 focus:outline-none"
          autoComplete="off"
          type="text"
          name="domain"
          id="domain"
        />
        {formState.errors?.domain && (
          <span className="text-red-500 break-words max-w-96">
            {formState.errors.domain}
          </span>
        )}
      </div>
      {formState.errors?.onboard && (
        <div className="flex flex-col">
          <span className="text-red-500 break-words max-w-96">
            Organization is not onboarded
          </span>
          <div className="self-start flex gap-2">
            <label htmlFor="onboard">
              {' '}
              Onboard organization and add contact?{' '}
            </label>
            <input type="checkbox" name="onboard" id="onboard" />
          </div>
        </div>
      )}
      <button
        type="submit"
        className="w-96 text-white text-xl h-12 bg-orange-600 rounded-lg hover:bg-orange-500 active:bg-orange-400 transition-all duration-100"
      >
        {formState.errors?.onboard ? 'Onboard' : 'Search'}
      </button>
      {formState.email && (
        <div className=" max-w-96 break-words">
          <span className="text-lg">
            The derived email is{' '}
            <span className="text-lg text-orange-500">{formState.email}</span>
          </span>
        </div>
      )}
    </form>
  );
};

export default Form;
