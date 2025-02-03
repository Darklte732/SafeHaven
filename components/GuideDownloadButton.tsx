'use client';

interface GuideDownloadButtonProps {
  className?: string;
}

export function GuideDownloadButton({ className = '' }: GuideDownloadButtonProps) {
  const handleDownload = async () => {
    try {
      // Track download event
      console.log('Guide download started');
      
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would be a real download
      window.location.href = '/downloads/final-expense-guide.pdf';
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors ${className}`}
    >
      Download Free Guide
    </button>
  );
} 