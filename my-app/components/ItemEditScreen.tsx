'use client'
import React, { useState } from 'react';
import { ArrowLeft, Package, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Item } from '../types';

interface ItemEditScreenProps {
  onBack: () => void;
  onSave: (itemData: Item) => void;
  initialData?: Item;
}

export function ItemEditScreen({ onBack, onSave, initialData }: ItemEditScreenProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [size, setSize] = useState(initialData?.size || '');
  const [weight, setWeight] = useState(initialData?.weight || '');

  const handleSave = () => {
    onSave({ title, description, category, size, weight });
  };

  const canSave = title && description && category && size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f2f2f] via-[#1a1a1a] to-[#2f2f2f] flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bg-[#2f2f2f] border-b border-white/10 p-6 sticky top-0 z-20 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
          <div>
            <h1 className="text-lg font-semibold text-white">Edit Item Details</h1>
            <p className="text-sm text-gray-400">Update item information</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Item Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Electronics Package"
              className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Description *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item..."
              rows={4}
              className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Category *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-[#2f2f2f] border-white/20 text-white">
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Size *</label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-[#2f2f2f] border-white/20 text-white">
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Weight</label>
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 2kg"
                className="bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-blue-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={canSave ? { scale: 1.02 } : {}}
          whileTap={canSave ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Save size={20} />
          <span>Save Changes</span>
        </motion.button>
      </div>
    </div>
  );
}
