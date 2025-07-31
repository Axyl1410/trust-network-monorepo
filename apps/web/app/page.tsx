import { Button } from '@workspace/ui/components/button';

const a = () => {
  console.log('a');
};

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        {/* This button has unsorted classes that will be automatically sorted */}
        <Button
          size="sm"
          className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
        >
          Sorted Button
        </Button>

        {/* Complex layout with multiple utilities */}
        <div className="ml-4 flex h-24 border-2 border-gray-300 p-3 text-gray-700 shadow-md">
          Complex Layout
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          Grid Layout
        </div>
      </div>
    </div>
  );
}
