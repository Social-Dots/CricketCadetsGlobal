
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send, CheckCircle, Rocket, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { addToWaitlist } from '@/lib/supabase';

export default function RegistrationForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    // Child Information
    childName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    suburbPostcode: '',
    cricketExperience: '',
    
    // Parent/Guardian Information
    parentGuardianName: '',
    parentGuardianPhone: '',
    parentGuardianEmail: '',
    
    // Consent
    consentToContact: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const data = await addToWaitlist(formData);
      
      console.log('Waitlist entry submitted successfully:', data);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          childName: '',
          dateOfBirth: '',
          gender: '',
          phoneNumber: '',
          email: '',
          suburbPostcode: '',
          cricketExperience: '',
          parentGuardianName: '',
          parentGuardianPhone: '',
          parentGuardianEmail: '',
          consentToContact: false,
        });
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Failed to submit waitlist entry:", error);
      setError(error.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
            <p className="text-gray-600 mb-4">
              Thanks for your interest! We'll be in touch with priority registration details soon.
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Rocket className="w-6 h-6 text-emerald-500" />
            Join the Cricket Cadets Waitlist
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}
          
          {/* Child Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Player Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="childName">Player's Full Name *</Label>
                <Input
                  id="childName"
                  value={formData.childName}
                  onChange={(e) => handleInputChange('childName', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="e.g. Alex Smith"
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select required onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">Player's Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="e.g. 0412 345 678"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Player's Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="player@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="suburbPostcode">Suburb/Postcode *</Label>
                <Input
                  id="suburbPostcode"
                  value={formData.suburbPostcode}
                  onChange={(e) => handleInputChange('suburbPostcode', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="e.g. Melbourne 3000"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cricketExperience">Cricket Experience Level *</Label>
              <Select required onValueChange={(value) => handleInputChange('cricketExperience', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="club">Club Level</SelectItem>
                  <SelectItem value="representative">Representative Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Parent/Guardian Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Parent/Guardian Information</h3>
            
            <div>
              <Label htmlFor="parentGuardianName">Parent/Guardian Full Name *</Label>
              <Input
                id="parentGuardianName"
                value={formData.parentGuardianName}
                onChange={(e) => handleInputChange('parentGuardianName', e.target.value)}
                required
                className="mt-1"
                placeholder="e.g. John Smith"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentGuardianPhone">Parent/Guardian Phone *</Label>
                <Input
                  id="parentGuardianPhone"
                  type="tel"
                  value={formData.parentGuardianPhone}
                  onChange={(e) => handleInputChange('parentGuardianPhone', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="e.g. 0423 456 789"
                />
              </div>
              
              <div>
                <Label htmlFor="parentGuardianEmail">Parent/Guardian Email *</Label>
                <Input
                  id="parentGuardianEmail"
                  type="email"
                  value={formData.parentGuardianEmail}
                  onChange={(e) => handleInputChange('parentGuardianEmail', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="parent@example.com"
                />
              </div>
            </div>
          </div>
          
          {/* Consent Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Consent</h3>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consentToContact"
                checked={formData.consentToContact}
                onCheckedChange={(checked) => handleInputChange('consentToContact', checked)}
                required
                className="mt-1"
              />
              <Label htmlFor="consentToContact" className="text-sm leading-relaxed">
                I consent to be contacted by Cricket Cadets regarding registration, programs, and updates. 
                I understand that my child is under 18 and I am providing this information as their parent/guardian. *
              </Label>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              disabled={isSubmitting || !formData.consentToContact}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Join Waitlist
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
