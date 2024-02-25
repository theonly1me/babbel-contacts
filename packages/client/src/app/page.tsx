import Form from '@/components/Form';

export default function Home() {
  return (
    <main className="main-container">
      <div className="mx-32 pt-12 pb-8">
        <span className="font-serif text-4xl">
          Find contacts from enterprises
        </span>
      </div>
      <div className="border-t-slate-200 border-t">
        <div className="mx-32">
          <ul className="h-14 flex flex-row items-center font-semibold">
            <li className="border-b-2 border-b-gray-900 pb-3 cursor-pointer">
              Find
            </li>
          </ul>
          <div className="flex flex-col items-center justify-center">
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
}
