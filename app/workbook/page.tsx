'use client';

import React, { useState } from 'react';
import { FormInput } from '@/components/FormInput';
import { Label } from '@/components/Label';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FormSuccess } from '@/components/FormSuccess';

interface WorkbookData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    address: string;
    phone: string;
    email: string;
  };
  familyMembers: {
    name: string;
    relationship: string;
    contact: string;
  }[];
  assets: {
    type: string;
    description: string;
    value: string;
  }[];
  insurance: {
    type: string;
    provider: string;
    policyNumber: string;
    coverage: string;
  }[];
}

export default function WorkbookPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [workbookData, setWorkbookData] = useState<WorkbookData>({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      email: '',
    },
    familyMembers: [{ name: '', relationship: '', contact: '' }],
    assets: [{ type: '', description: '', value: '' }],
    insurance: [{ type: '', provider: '', policyNumber: '', coverage: '' }],
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkbookData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const addFamilyMember = () => {
    setWorkbookData(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { name: '', relationship: '', contact: '' }],
    }));
  };

  const addAsset = () => {
    setWorkbookData(prev => ({
      ...prev,
      assets: [...prev.assets, { type: '', description: '', value: '' }],
    }));
  };

  const addInsurance = () => {
    setWorkbookData(prev => ({
      ...prev,
      insurance: [...prev.insurance, { type: '', provider: '', policyNumber: '', coverage: '' }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/workbook/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workbookData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate workbook');
      }

      // Open the workbook in a new tab
      window.open(result.url, '_blank');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Beneficiary Planning Workbook</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <FormInput
                    id="fullName"
                    name="fullName"
                    value={workbookData.personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <FormInput
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={workbookData.personalInfo.dateOfBirth}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <FormInput
                    id="address"
                    name="address"
                    value={workbookData.personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <FormInput
                    id="phone"
                    name="phone"
                    type="tel"
                    value={workbookData.personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <FormInput
                    id="email"
                    name="email"
                    type="email"
                    value={workbookData.personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Family Members */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Family Members</h2>
                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="text-blue-600 hover:text-blue-700"
                >
                  + Add Family Member
                </button>
              </div>
              {workbookData.familyMembers.map((member, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <FormInput
                    id={`family-name-${index}`}
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => {
                      const newMembers = [...workbookData.familyMembers];
                      newMembers[index].name = e.target.value;
                      setWorkbookData(prev => ({ ...prev, familyMembers: newMembers }));
                    }}
                  />
                  <FormInput
                    id={`family-relationship-${index}`}
                    placeholder="Relationship"
                    value={member.relationship}
                    onChange={(e) => {
                      const newMembers = [...workbookData.familyMembers];
                      newMembers[index].relationship = e.target.value;
                      setWorkbookData(prev => ({ ...prev, familyMembers: newMembers }));
                    }}
                  />
                  <FormInput
                    id={`family-contact-${index}`}
                    placeholder="Contact Information"
                    value={member.contact}
                    onChange={(e) => {
                      const newMembers = [...workbookData.familyMembers];
                      newMembers[index].contact = e.target.value;
                      setWorkbookData(prev => ({ ...prev, familyMembers: newMembers }));
                    }}
                  />
                </div>
              ))}
            </section>

            {/* Assets */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Assets</h2>
                <button
                  type="button"
                  onClick={addAsset}
                  className="text-blue-600 hover:text-blue-700"
                >
                  + Add Asset
                </button>
              </div>
              {workbookData.assets.map((asset, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <FormInput
                    id={`asset-type-${index}`}
                    placeholder="Type (e.g., Property, Vehicle)"
                    value={asset.type}
                    onChange={(e) => {
                      const newAssets = [...workbookData.assets];
                      newAssets[index].type = e.target.value;
                      setWorkbookData(prev => ({ ...prev, assets: newAssets }));
                    }}
                  />
                  <FormInput
                    id={`asset-description-${index}`}
                    placeholder="Description"
                    value={asset.description}
                    onChange={(e) => {
                      const newAssets = [...workbookData.assets];
                      newAssets[index].description = e.target.value;
                      setWorkbookData(prev => ({ ...prev, assets: newAssets }));
                    }}
                  />
                  <FormInput
                    id={`asset-value-${index}`}
                    placeholder="Estimated Value"
                    value={asset.value}
                    onChange={(e) => {
                      const newAssets = [...workbookData.assets];
                      newAssets[index].value = e.target.value;
                      setWorkbookData(prev => ({ ...prev, assets: newAssets }));
                    }}
                  />
                </div>
              ))}
            </section>

            {/* Insurance Policies */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Insurance Policies</h2>
                <button
                  type="button"
                  onClick={addInsurance}
                  className="text-blue-600 hover:text-blue-700"
                >
                  + Add Insurance Policy
                </button>
              </div>
              {workbookData.insurance.map((policy, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <FormInput
                    id={`insurance-type-${index}`}
                    placeholder="Type"
                    value={policy.type}
                    onChange={(e) => {
                      const newPolicies = [...workbookData.insurance];
                      newPolicies[index].type = e.target.value;
                      setWorkbookData(prev => ({ ...prev, insurance: newPolicies }));
                    }}
                  />
                  <FormInput
                    id={`insurance-provider-${index}`}
                    placeholder="Provider"
                    value={policy.provider}
                    onChange={(e) => {
                      const newPolicies = [...workbookData.insurance];
                      newPolicies[index].provider = e.target.value;
                      setWorkbookData(prev => ({ ...prev, insurance: newPolicies }));
                    }}
                  />
                  <FormInput
                    id={`insurance-policy-${index}`}
                    placeholder="Policy Number"
                    value={policy.policyNumber}
                    onChange={(e) => {
                      const newPolicies = [...workbookData.insurance];
                      newPolicies[index].policyNumber = e.target.value;
                      setWorkbookData(prev => ({ ...prev, insurance: newPolicies }));
                    }}
                  />
                  <FormInput
                    id={`insurance-coverage-${index}`}
                    placeholder="Coverage Amount"
                    value={policy.coverage}
                    onChange={(e) => {
                      const newPolicies = [...workbookData.insurance];
                      newPolicies[index].coverage = e.target.value;
                      setWorkbookData(prev => ({ ...prev, insurance: newPolicies }));
                    }}
                  />
                </div>
              ))}
            </section>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  'Generate and Download Workbook'
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}

            {success && (
              <FormSuccess message="Your workbook has been generated and should be downloading now. If it doesn't start automatically, click the button above to try again." />
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 