import { Metadata } from 'next';
import { GuideDownloadForm } from '@/components/GuideDownloadForm';

export const metadata: Metadata = {
  title: 'Download Your Free Final Expense Insurance Guide | SafeHaven',
  description: "Get your comprehensive guide to final expense insurance. Learn about coverage options, costs, and how to protect your family's future. Download now!",
};

export default function GuidePage() {
  return (
    <main className="flex-1 py-12 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your Guide to Final Expense Insurance
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Protect your family's future with our comprehensive guide to final expense insurance.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">What's Inside:</h2>
              <ul className="grid gap-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Expert insights on coverage options
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cost comparison and budgeting tips
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Step-by-step application process
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Download Your Free Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below to get instant access to your comprehensive guide.
                </p>
              </div>
              <div className="p-6 pt-0">
                <GuideDownloadForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 