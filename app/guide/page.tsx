import { GuideDownloadForm } from '@/components/GuideDownloadForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Final Expense Insurance Guide | SafeHaven Insurance',
    description: 'Download our comprehensive guide to Final Expense Insurance and learn how to protect your family\'s future. Get expert insights and tips.'
};

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            The Ultimate Guide to Final Expense Insurance
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover how to protect your loved ones and ensure peace of mind with our comprehensive guide.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                What's Inside the Guide?
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Complete overview of Final Expense Insurance</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>How to choose the right coverage amount</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Tips for finding affordable plans</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Common myths and misconceptions</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Expert insights and recommendations</span>
                                </li>
                            </ul>
                        </div>

                        <GuideDownloadForm />
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600">
                            Have questions? Call us at{' '}
                            <a href="tel:+18066212114" className="text-blue-600 font-semibold">
                                +1 806-621-2114
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 