import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/ui/phone-input';

export function GuideDownloadForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        zipCode: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        
        if (formData.phone && !/^\+?1?\d{10,14}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Invalid phone number';
        }
        
        if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
            newErrors.zipCode = 'Invalid ZIP code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please correct the errors in the form');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/guide', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Success! Check your email for the guide.');
                setFormData({ name: '', email: '', phone: '', zipCode: '' });
                
                // Track conversion
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead', {
                        content_name: 'Final Expense Guide Download',
                        status: 'Downloaded'
                    });
                }
            } else {
                if (response.status === 429) {
                    toast.error('You recently requested this guide. Please check your email.');
                } else {
                    toast.error(data.error || 'Something went wrong. Please try again.');
                }
            }
        } catch (error) {
            toast.error('Failed to send guide. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Your Free Final Expense Insurance Guide
                </h2>
                <p className="text-gray-600">
                    Learn everything you need to know about protecting your family's future.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) {
                                setErrors({ ...errors, name: '' });
                            }
                        }}
                        className={errors.name ? 'border-red-500' : ''}
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) {
                                setErrors({ ...errors, email: '' });
                            }
                        }}
                        className={errors.email ? 'border-red-500' : ''}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <PhoneInput
                        id="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(value) => {
                            setFormData({ ...formData, phone: value });
                            if (errors.phone) {
                                setErrors({ ...errors, phone: '' });
                            }
                        }}
                        className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code (Optional)</Label>
                    <Input
                        id="zipCode"
                        placeholder="Enter your ZIP code"
                        value={formData.zipCode}
                        onChange={(e) => {
                            setFormData({ ...formData, zipCode: e.target.value });
                            if (errors.zipCode) {
                                setErrors({ ...errors, zipCode: '' });
                            }
                        }}
                        className={errors.zipCode ? 'border-red-500' : ''}
                        maxLength={10}
                    />
                    {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </div>
                    ) : (
                        'Download Free Guide'
                    )}
                </Button>

                <div className="space-y-2 text-sm text-gray-500">
                    <p className="text-center">
                        By downloading this guide, you'll also receive occasional updates and insurance tips from SafeHaven.
                        You can unsubscribe at any time.
                    </p>
                    <p className="text-center">
                        Your information is secure and will never be shared with third parties.
                    </p>
                </div>
            </form>
        </div>
    );
} 