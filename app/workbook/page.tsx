'use client';

import React, { useState } from 'react';
import { FormInput } from '@/components/FormInput';
import { Label } from '@/components/Label';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FormSuccess } from '@/components/FormSuccess';

interface FamilyMember {
  name: string;
  relationship: string;
  contact: string;
}

interface Asset {
  type: string;
  description: string;
  value: string;
}

interface InsurancePolicy {
  type: string;
  provider: string;
  policyNumber: string;
  coverage: string;
}

interface WorkbookData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    address: string;
    phone: string;
    email: string;
    ssn: string;
  };
  familyMembers: FamilyMember[];
  assets: Asset[];
  insurancePolicies: InsurancePolicy[];
  notes: string;
}

export default function WorkbookPage() {
  const [workbookData, setWorkbookData] = useState<WorkbookData>({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      email: '',
      ssn: ''
    },
    familyMembers: [{ name: '', relationship: '', contact: '' }],
    assets: [{ type: '', description: '', value: '' }],
    insurancePolicies: [{ type: '', provider: '', policyNumber: '', coverage: '' }],
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkbookData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleAddFamilyMember = () => {
    setWorkbookData(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { name: '', relationship: '', contact: '' }]
    }));
  };

  const handleAddAsset = () => {
    setWorkbookData(prev => ({
      ...prev,
      assets: [...prev.assets, { type: '', description: '', value: '' }]
    }));
  };

  const handleAddInsurancePolicy = () => {
    setWorkbookData(prev => ({
      ...prev,
      insurancePolicies: [...prev.insurancePolicies, { type: '', provider: '', policyNumber: '', coverage: '' }]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Save to Google Drive
      const response = await fetch('/api/workbook/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workbookData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save workbook');
      }

      // Open the saved document in Google Drive
      window.open(result.driveUrl, '_blank');
      setSuccess(true);
    } catch (err: any) {
      console.error('Workbook save error:', err);
      setError(err.message || 'Failed to save workbook. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Beneficiary Planning Workbook</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
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
            <div>
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
                value={workbookData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Family Members Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Family Members</h2>
          {workbookData.familyMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor={`family-name-${index}`}>Name</Label>
                <FormInput
                  id={`family-name-${index}`}
                  value={member.name}
                  onChange={(e) => {
                    const newFamilyMembers = [...workbookData.familyMembers];
                    newFamilyMembers[index].name = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      familyMembers: newFamilyMembers
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`family-relationship-${index}`}>Relationship</Label>
                <FormInput
                  id={`family-relationship-${index}`}
                  value={member.relationship}
                  onChange={(e) => {
                    const newFamilyMembers = [...workbookData.familyMembers];
                    newFamilyMembers[index].relationship = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      familyMembers: newFamilyMembers
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`family-contact-${index}`}>Contact Information</Label>
                <FormInput
                  id={`family-contact-${index}`}
                  value={member.contact}
                  onChange={(e) => {
                    const newFamilyMembers = [...workbookData.familyMembers];
                    newFamilyMembers[index].contact = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      familyMembers: newFamilyMembers
                    }));
                  }}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFamilyMember}
            className="mt-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Add Family Member
          </button>
        </section>

        {/* Assets Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Assets</h2>
          {workbookData.assets.map((asset, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor={`asset-type-${index}`}>Asset Type</Label>
                <FormInput
                  id={`asset-type-${index}`}
                  value={asset.type}
                  onChange={(e) => {
                    const newAssets = [...workbookData.assets];
                    newAssets[index].type = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      assets: newAssets
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`asset-description-${index}`}>Description</Label>
                <FormInput
                  id={`asset-description-${index}`}
                  value={asset.description}
                  onChange={(e) => {
                    const newAssets = [...workbookData.assets];
                    newAssets[index].description = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      assets: newAssets
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`asset-value-${index}`}>Value</Label>
                <FormInput
                  id={`asset-value-${index}`}
                  value={asset.value}
                  onChange={(e) => {
                    const newAssets = [...workbookData.assets];
                    newAssets[index].value = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      assets: newAssets
                    }));
                  }}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAsset}
            className="mt-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Add Asset
          </button>
        </section>

        {/* Insurance Policies Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Insurance Policies</h2>
          {workbookData.insurancePolicies.map((policy, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor={`insurance-type-${index}`}>Type</Label>
                <FormInput
                  id={`insurance-type-${index}`}
                  value={policy.type}
                  onChange={(e) => {
                    const newPolicies = [...workbookData.insurancePolicies];
                    newPolicies[index].type = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      insurancePolicies: newPolicies
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`insurance-provider-${index}`}>Provider</Label>
                <FormInput
                  id={`insurance-provider-${index}`}
                  value={policy.provider}
                  onChange={(e) => {
                    const newPolicies = [...workbookData.insurancePolicies];
                    newPolicies[index].provider = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      insurancePolicies: newPolicies
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`insurance-policy-${index}`}>Policy Number</Label>
                <FormInput
                  id={`insurance-policy-${index}`}
                  value={policy.policyNumber}
                  onChange={(e) => {
                    const newPolicies = [...workbookData.insurancePolicies];
                    newPolicies[index].policyNumber = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      insurancePolicies: newPolicies
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`insurance-coverage-${index}`}>Coverage Amount</Label>
                <FormInput
                  id={`insurance-coverage-${index}`}
                  value={policy.coverage}
                  onChange={(e) => {
                    const newPolicies = [...workbookData.insurancePolicies];
                    newPolicies[index].coverage = e.target.value;
                    setWorkbookData(prev => ({
                      ...prev,
                      insurancePolicies: newPolicies
                    }));
                  }}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddInsurancePolicy}
            className="mt-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Add Insurance Policy
          </button>
        </section>

        {/* Notes Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Additional Notes</h2>
          <textarea
            value={workbookData.notes}
            onChange={(e) => setWorkbookData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full h-32 p-2 border rounded-lg resize-y"
            placeholder="Add any additional notes or information here..."
          />
        </section>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-md bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              'Save and Download Workbook'
            )}
          </button>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {success && (
            <FormSuccess message="Your workbook has been saved! You can now access it from Google Drive." />
          )}
        </div>
      </form>
    </div>
  );
} 