
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Send, User, Mail, CheckCircle, Rocket, Star, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { addToWaitlist } from '@/lib/supabase';

export default function RegistrationForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    childAge: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data, error: supabaseError } = await addToWaitlist(formData);
      
      if (supabaseError) {
        throw supabaseError;
      }
      
      console.log('Waitlist entry submitted successfully:', data);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ parentName: '', email: '', childAge: '' });
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Rocket className="w-6 h-6 text-emerald-500" />
            Join the Waitlist
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
          
            <div className="space-y-4">
              <div>
                <Label htmlFor="parentName">Your Name *</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="mt-1"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="childAge">Player's Age *</Label>
                <Select required onValueChange={(value) => handleInputChange('childAge', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select player's age" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 7 }, (_, i) => i + 8).map(age => (
                      <SelectItem key={age} value={age.toString()}>{age} years old</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Get on the Waitlist
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
