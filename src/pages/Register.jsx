import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, CheckCircle, Rocket, Loader2, AlertCircle, User, Users, Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { addToWaitlist } from '@/lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
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
    consentToMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const validateForm = () => {
    const errors = {};

    // Child Information Validation
    if (!formData.childName.trim()) {
      errors.childName = 'Player name is required';
    } else if (formData.childName.trim().length < 2) {
      errors.childName = 'Player name must be at least 2 characters';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = validateAge(formData.dateOfBirth);
      if (age < 5 || age > 18) {
        errors.dateOfBirth = 'Player must be between 5 and 18 years old';
      }
    }

    if (!formData.gender) {
      errors.gender = 'Gender selection is required';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.suburbPostcode.trim()) {
      errors.suburbPostcode = 'Suburb/Postcode is required';
    }

    if (!formData.cricketExperience) {
      errors.cricketExperience = 'Cricket experience level is required';
    }

    // Parent/Guardian Information Validation
    if (!formData.parentGuardianName.trim()) {
      errors.parentGuardianName = 'Parent/Guardian name is required';
    } else if (formData.parentGuardianName.trim().length < 2) {
      errors.parentGuardianName = 'Parent/Guardian name must be at least 2 characters';
    }

    if (!formData.parentGuardianPhone.trim()) {
      errors.parentGuardianPhone = 'Parent/Guardian phone is required';
    } else if (!validatePhone(formData.parentGuardianPhone)) {
      errors.parentGuardianPhone = 'Please enter a valid phone number';
    }

    if (!formData.parentGuardianEmail.trim()) {
      errors.parentGuardianEmail = 'Parent/Guardian email is required';
    } else if (!validateEmail(formData.parentGuardianEmail)) {
      errors.parentGuardianEmail = 'Please enter a valid email address';
    }

    // Consent Validation
    if (!formData.consentToContact) {
      errors.consentToContact = 'Consent to contact is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      setError('Please correct the errors below and try again.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addToWaitlist(formData);
      
      console.log('Registration submitted successfully');
      setSubmitted(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error("Failed to submit registration:", error);
      setError(error.message || 'Failed to submit registration. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto">
              <CardContent className="py-12">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Thank you for registering with Cricket Cadets! We've received your application and will be in touch soon with next steps.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-emerald-800 mb-2">What happens next?</h3>
                  <ul className="text-emerald-700 text-left space-y-2">
                    <li>• We'll review your application within 2-3 business days</li>
                    <li>• You'll receive a confirmation email with program details</li>
                    <li>• Our team will contact you to discuss available programs</li>
                    <li>• We'll help you find the perfect cricket program for your child</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleBackToHome} className="bg-emerald-600 hover:bg-emerald-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Register Another Player
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 mb-4">
            🏏 Player Registration
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Join Cricket Cadets
            <span className="block text-emerald-600">Register Today</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start your cricket journey with Australia's premier youth development program. 
            Complete the registration form below to secure your spot.
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 mb-8"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Rocket className="w-6 h-6 text-emerald-500" />
                Player Registration Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Player Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <User className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Player Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="childName">Player's Full Name *</Label>
                      <Input
                        id="childName"
                        value={formData.childName}
                        onChange={(e) => handleInputChange('childName', e.target.value)}
                        className={`mt-2 ${validationErrors.childName ? 'border-red-500' : ''}`}
                        placeholder="e.g. Alex Smith"
                      />
                      {validationErrors.childName && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.childName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className={`mt-2 ${validationErrors.dateOfBirth ? 'border-red-500' : ''}`}
                      />
                      {validationErrors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.dateOfBirth}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger className={`mt-2 ${validationErrors.gender ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.gender && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.gender}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneNumber">Player's Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className={`mt-2 ${validationErrors.phoneNumber ? 'border-red-500' : ''}`}
                        placeholder="e.g. 0412 345 678"
                      />
                      {validationErrors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Player's Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`mt-2 ${validationErrors.email ? 'border-red-500' : ''}`}
                        placeholder="player@example.com"
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="suburbPostcode">Suburb/Postcode *</Label>
                      <Input
                        id="suburbPostcode"
                        value={formData.suburbPostcode}
                        onChange={(e) => handleInputChange('suburbPostcode', e.target.value)}
                        className={`mt-2 ${validationErrors.suburbPostcode ? 'border-red-500' : ''}`}
                        placeholder="e.g. Melbourne 3000"
                      />
                      {validationErrors.suburbPostcode && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.suburbPostcode}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cricketExperience">Cricket Experience Level *</Label>
                    <Select onValueChange={(value) => handleInputChange('cricketExperience', value)}>
                      <SelectTrigger className={`mt-2 ${validationErrors.cricketExperience ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner - New to cricket</SelectItem>
                        <SelectItem value="club">Club Level - Some experience</SelectItem>
                        <SelectItem value="representative">Representative Level - Advanced player</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.cricketExperience && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.cricketExperience}</p>
                    )}
                  </div>
                </div>
                
                {/* Parent/Guardian Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Parent/Guardian Information</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="parentGuardianName">Parent/Guardian Full Name *</Label>
                    <Input
                      id="parentGuardianName"
                      value={formData.parentGuardianName}
                      onChange={(e) => handleInputChange('parentGuardianName', e.target.value)}
                      className={`mt-2 ${validationErrors.parentGuardianName ? 'border-red-500' : ''}`}
                      placeholder="e.g. John Smith"
                    />
                    {validationErrors.parentGuardianName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.parentGuardianName}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="parentGuardianPhone">Parent/Guardian Phone *</Label>
                      <Input
                        id="parentGuardianPhone"
                        type="tel"
                        value={formData.parentGuardianPhone}
                        onChange={(e) => handleInputChange('parentGuardianPhone', e.target.value)}
                        className={`mt-2 ${validationErrors.parentGuardianPhone ? 'border-red-500' : ''}`}
                        placeholder="e.g. 0423 456 789"
                      />
                      {validationErrors.parentGuardianPhone && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.parentGuardianPhone}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="parentGuardianEmail">Parent/Guardian Email *</Label>
                      <Input
                        id="parentGuardianEmail"
                        type="email"
                        value={formData.parentGuardianEmail}
                        onChange={(e) => handleInputChange('parentGuardianEmail', e.target.value)}
                        className={`mt-2 ${validationErrors.parentGuardianEmail ? 'border-red-500' : ''}`}
                        placeholder="parent@example.com"
                      />
                      {validationErrors.parentGuardianEmail && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.parentGuardianEmail}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Consent Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Consent & Privacy</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consentToContact"
                        checked={formData.consentToContact}
                        onCheckedChange={(checked) => handleInputChange('consentToContact', checked)}
                        className={`mt-1 ${validationErrors.consentToContact ? 'border-red-500' : ''}`}
                      />
                      <div className="flex-1">
                        <Label htmlFor="consentToContact" className="text-sm leading-relaxed cursor-pointer">
                          I consent to be contacted by Cricket Cadets regarding registration, programs, and updates. 
                          I understand that my child is under 18 and I am providing this information as their parent/guardian. *
                        </Label>
                        {validationErrors.consentToContact && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.consentToContact}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consentToMarketing"
                        checked={formData.consentToMarketing}
                        onCheckedChange={(checked) => handleInputChange('consentToMarketing', checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="consentToMarketing" className="text-sm leading-relaxed cursor-pointer">
                        I would like to receive marketing communications about special offers, events, and cricket programs. (Optional)
                      </Label>
                    </div>
                  </div>
                </div>
                
                {/* Submit Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
                  <p className="text-sm text-gray-600">
                    * Required fields. All information is securely stored and protected.
                  </p>
                  <Button 
                    type="submit" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting Registration...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Complete Registration
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}