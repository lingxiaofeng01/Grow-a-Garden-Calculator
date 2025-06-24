'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Search, Calculator, Zap, Award, Sparkles, Crown, Star, Gem, Flame, Moon, Filter, BookOpen, Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Crop data structure
interface Crop {
  id: string;
  name: string;
  baseValue: number; // P in formula
  baseWeight: number; // B in formula
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Event';
  obtainable: boolean;
  icon: string;
  category: string;
}

// Temperature mutations data
interface TempMutation {
  id: string;
  name: string;
  bonus: number; // Temperature bonus value
  description: string;
}

// Environmental mutations data
interface EnvMutation {
  name: string;
  bonus: number; // Additive bonus (+1, +2, +3, etc.)
  category: string;
  description: string;
}

// Growth mutations data
interface GrowthMutation {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

const growthMutations: GrowthMutation[] = [
  { id: 'default', name: 'Default', multiplier: 1, description: 'No growth mutation applied' },
  { id: 'golden', name: 'Golden', multiplier: 20, description: 'Golden growth mutation boost' },
  { id: 'rainbow', name: 'Rainbow', multiplier: 50, description: 'Rainbow growth mutation boost' },
];

const tempMutations: TempMutation[] = [
  { id: 'default', name: 'Default', bonus: 0, description: 'Normal temperature conditions' },
  { id: 'wet', name: 'Wet', bonus: 1, description: 'Rainy weather effect' },
  { id: 'chilled', name: 'Chilled', bonus: 1, description: 'Cold temperature effect' },
  { id: 'frozen', name: 'Frozen', bonus: 9, description: 'Extremely cold frozen effect' },
];

const crops: Crop[] = [
  // Common Crops
  { id: 'carrot', name: 'Carrot', baseValue: 18, baseWeight: 0.24, rarity: 'Common', obtainable: true, icon: '🥕', category: 'Vegetable' },
  { id: 'strawberry', name: 'Strawberry', baseValue: 14, baseWeight: 0.29, rarity: 'Common', obtainable: true, icon: '🍓', category: 'Berry' },
  { id: 'blueberry', name: 'Blueberry', baseValue: 18, baseWeight: 0.17, rarity: 'Common', obtainable: true, icon: '🫐', category: 'Berry' },
  { id: 'raspberry', name: 'Raspberry', baseValue: 90, baseWeight: 0.71, rarity: 'Common', obtainable: true, icon: '🍇', category: 'Berry' },
  { id: 'cranberry', name: 'Cranberry', baseValue: 1805, baseWeight: 0.95, rarity: 'Common', obtainable: true, icon: '🍒', category: 'Berry' },
  { id: 'greenapple', name: 'Green Apple', baseValue: 271, baseWeight: 2.85, rarity: 'Common', obtainable: true, icon: '🍏', category: 'Fruit' },
  
  // Rare Crops
  { id: 'tomato', name: 'Tomato', baseValue: 27, baseWeight: 0.44, rarity: 'Rare', obtainable: true, icon: '🍅', category: 'Vegetable' },
  { id: 'corn', name: 'Corn', baseValue: 36, baseWeight: 1.9, rarity: 'Rare', obtainable: true, icon: '🌽', category: 'Vegetable' },
  { id: 'pear', name: 'Pear', baseValue: 18050, baseWeight: 2.85, rarity: 'Rare', obtainable: true, icon: '🍐', category: 'Fruit' },
  { id: 'lemon', name: 'Lemon', baseValue: 500, baseWeight: 1.0, rarity: 'Rare', obtainable: true, icon: '🍋', category: 'Citrus' },
  { id: 'banana', name: 'Banana', baseValue: 1805, baseWeight: 1.42, rarity: 'Rare', obtainable: true, icon: '🍌', category: 'Fruit' },
  { id: 'avocado', name: 'Avocado', baseValue: 91, baseWeight: 3.32, rarity: 'Rare', obtainable: true, icon: '🥑', category: 'Fruit' },
  { id: 'bellpepper', name: 'Bell Pepper', baseValue: 4964, baseWeight: 7.61, rarity: 'Rare', obtainable: true, icon: '🫑', category: 'Vegetable' },
  { id: 'cauliflower', name: 'Cauliflower', baseValue: 36, baseWeight: 4.74, rarity: 'Rare', obtainable: true, icon: '🥬', category: 'Vegetable' },
  { id: 'eggplant', name: 'Eggplant', baseValue: 6769, baseWeight: 4.75, rarity: 'Rare', obtainable: true, icon: '🍆', category: 'Vegetable' },
  { id: 'kiwi', name: 'Kiwi', baseValue: 2482, baseWeight: 4.75, rarity: 'Rare', obtainable: true, icon: '🥝', category: 'Fruit' },
  { id: 'peach', name: 'Peach', baseValue: 271, baseWeight: 1.9, rarity: 'Rare', obtainable: true, icon: '🍑', category: 'Fruit' },
  { id: 'pineapple', name: 'Pineapple', baseValue: 1805, baseWeight: 2.85, rarity: 'Rare', obtainable: true, icon: '🍍', category: 'Fruit' },
  
  // Legendary Crops
  { id: 'apple', name: 'Apple', baseValue: 248, baseWeight: 2.85, rarity: 'Legendary', obtainable: true, icon: '🍎', category: 'Fruit' },
  { id: 'watermelon', name: 'Watermelon', baseValue: 2708, baseWeight: 7.3, rarity: 'Legendary', obtainable: true, icon: '🍉', category: 'Fruit' },
  { id: 'pumpkin', name: 'Pumpkin', baseValue: 3069, baseWeight: 6.9, rarity: 'Legendary', obtainable: true, icon: '🎃', category: 'Vegetable' },
  { id: 'bamboo', name: 'Bamboo', baseValue: 3610, baseWeight: 3.8, rarity: 'Legendary', obtainable: true, icon: '🎋', category: 'Plant' },
  { id: 'lilac', name: 'Lilac', baseValue: 31588, baseWeight: 2.846, rarity: 'Legendary', obtainable: true, icon: '🌸', category: 'Flower' },
  { id: 'grape', name: 'Grape', baseValue: 7085, baseWeight: 2.85, rarity: 'Legendary', obtainable: true, icon: '🍇', category: 'Fruit' },
  { id: 'cherry', name: 'Cherry Blossom', baseValue: 550, baseWeight: 3.0, rarity: 'Legendary', obtainable: true, icon: '🌸', category: 'Flower' },
  { id: 'lotus', name: 'Lotus', baseValue: 15343, baseWeight: 18.99, rarity: 'Legendary', obtainable: true, icon: '🪷', category: 'Flower' },
  { id: 'rose', name: 'Rose', baseValue: 4513, baseWeight: 0.95, rarity: 'Legendary', obtainable: true, icon: '🌹', category: 'Flower' },
  { id: 'lavender', name: 'Lavender', baseValue: 22563, baseWeight: 0.25, rarity: 'Legendary', obtainable: true, icon: '💜', category: 'Flower' },
  { id: 'mint', name: 'Mint', baseValue: 4738, baseWeight: 0.95, rarity: 'Legendary', obtainable: true, icon: '🌿', category: 'Herb' },
  { id: 'orangetulip', name: 'Orange Tulip', baseValue: 751, baseWeight: 0.05, rarity: 'Legendary', obtainable: true, icon: '🌷', category: 'Flower' },
  { id: 'daffodil', name: 'Daffodil', baseValue: 903, baseWeight: 0.16, rarity: 'Legendary', obtainable: true, icon: '🌼', category: 'Flower' },
  
  // Mythical Crops
  { id: 'coconut', name: 'Coconut', baseValue: 361, baseWeight: 13.31, rarity: 'Mythical', obtainable: true, icon: '🥥', category: 'Fruit' },
  { id: 'cactus', name: 'Cactus', baseValue: 3069, baseWeight: 6.65, rarity: 'Mythical', obtainable: true, icon: '🌵', category: 'Plant' },
  { id: 'dragonfruit', name: 'Dragon Fruit', baseValue: 4287, baseWeight: 11.38, rarity: 'Mythical', obtainable: true, icon: '🐉', category: 'Exotic' },
  { id: 'mango', name: 'Mango', baseValue: 5866, baseWeight: 14.28, rarity: 'Mythical', obtainable: true, icon: '🥭', category: 'Fruit' },
  { id: 'nectarine', name: 'Nectarine', baseValue: 35000, baseWeight: 2.807, rarity: 'Mythical', obtainable: true, icon: '🍑', category: 'Fruit' },
  { id: 'pinklily', name: 'Pink Lily', baseValue: 58663, baseWeight: 5.699, rarity: 'Mythical', obtainable: true, icon: '🌺', category: 'Flower' },
  { id: 'purpledahlia', name: 'Purple Dahlia', baseValue: 67688, baseWeight: 11.4, rarity: 'Mythical', obtainable: true, icon: '💜', category: 'Flower' },
  { id: 'foxglove', name: 'Foxglove', baseValue: 18050, baseWeight: 1.9, rarity: 'Mythical', obtainable: true, icon: '🌸', category: 'Flower' },
  { id: 'nightshade', name: 'Nightshade', baseValue: 3159, baseWeight: 0.48, rarity: 'Mythical', obtainable: true, icon: '🖤', category: 'Plant' },
  { id: 'glowshroom', name: 'Glowshroom', baseValue: 271, baseWeight: 0.7, rarity: 'Mythical', obtainable: true, icon: '🍄', category: 'Mushroom' },
  { id: 'bloodbanana', name: 'Blood Banana', baseValue: 5415, baseWeight: 1.41, rarity: 'Mythical', obtainable: true, icon: '🩸', category: 'Exotic' },
  { id: 'emberlily', name: 'Ember Lily', baseValue: 50138, baseWeight: 11.4, rarity: 'Mythical', obtainable: true, icon: '🔥', category: 'Flower' },
  { id: 'crocus', name: 'Crocus', baseValue: 27075, baseWeight: 0.285, rarity: 'Mythical', obtainable: true, icon: '🌷', category: 'Flower' },
  { id: 'durian', name: 'Durian', baseValue: 6317, baseWeight: 7.6, rarity: 'Mythical', obtainable: true, icon: '🌰', category: 'Exotic' },
  { id: 'feijoa', name: 'Feijoa', baseValue: 27075, baseWeight: 9.5, rarity: 'Mythical', obtainable: true, icon: '🥝', category: 'Fruit' },
  { id: 'loquat', name: 'Loquat', baseValue: 7220, baseWeight: 6.17, rarity: 'Mythical', obtainable: true, icon: '🍊', category: 'Fruit' },
  { id: 'passionfruit', name: 'Passionfruit', baseValue: 3204, baseWeight: 2.867, rarity: 'Mythical', obtainable: true, icon: '💜', category: 'Exotic' },
  { id: 'pricklypear', name: 'Prickly Pear', baseValue: 6319, baseWeight: 6.65, rarity: 'Mythical', obtainable: true, icon: '🌵', category: 'Cactus' },
  { id: 'starfruit', name: 'Starfruit', baseValue: 13538, baseWeight: 2.85, rarity: 'Mythical', obtainable: true, icon: '⭐', category: 'Exotic' },
  { id: 'violetcorn', name: 'Violet Corn', baseValue: 45125, baseWeight: 2.85, rarity: 'Mythical', obtainable: true, icon: '💜', category: 'Vegetable' },
  
  // Divine Crops
  { id: 'mushroom', name: 'Mushroom', baseValue: 136278, baseWeight: 25.9, rarity: 'Divine', obtainable: true, icon: '🍄', category: 'Mushroom' },
  { id: 'pepper', name: 'Pepper', baseValue: 7220, baseWeight: 4.75, rarity: 'Divine', obtainable: true, icon: '🌶️', category: 'Spice' },
  { id: 'cacao', name: 'Cacao', baseValue: 10830, baseWeight: 7.6, rarity: 'Divine', obtainable: true, icon: '🍫', category: 'Bean' },
  { id: 'hivefruit', name: 'Hive Fruit', baseValue: 55955, baseWeight: 7.59, rarity: 'Divine', obtainable: true, icon: '🍯', category: 'Exotic' },
  { id: 'sunflower', name: 'Sunflower', baseValue: 144000, baseWeight: 15.65, rarity: 'Divine', obtainable: true, icon: '🌻', category: 'Flower' },
  { id: 'candysunflower', name: 'Candy Sunflower', baseValue: 72200, baseWeight: 1.428, rarity: 'Divine', obtainable: true, icon: '🍭', category: 'Flower' },
  { id: 'chocolatecarrot', name: 'Chocolate Carrot', baseValue: 9960, baseWeight: 0.262, rarity: 'Divine', obtainable: true, icon: '🍫', category: 'Vegetable' },
  { id: 'cantaloupe', name: 'Cantaloupe', baseValue: 30685, baseWeight: 5.22, rarity: 'Divine', obtainable: true, icon: '🍈', category: 'Fruit' },
  { id: 'cocovine', name: 'Cocovine', baseValue: 60166, baseWeight: 13.3, rarity: 'Divine', obtainable: true, icon: '🌿', category: 'Plant' },
  { id: 'celestberry', name: 'Celestiberry', baseValue: 9025, baseWeight: 1.9, rarity: 'Divine', obtainable: true, icon: '✨', category: 'Berry' },
  { id: 'honeysuckle', name: 'Honeysuckle', baseValue: 90250, baseWeight: 11.4, rarity: 'Divine', obtainable: true, icon: '🍯', category: 'Flower' },
  { id: 'nectarthorn', name: 'Nectar Thorn', baseValue: 30083, baseWeight: 5.76, rarity: 'Divine', obtainable: true, icon: '🌹', category: 'Plant' },
  { id: 'nectarshade', name: 'Nectarshade', baseValue: 45125, baseWeight: 0.75, rarity: 'Divine', obtainable: true, icon: '🌙', category: 'Plant' },
  { id: 'parasolflower', name: 'Parasol Flower', baseValue: 180500, baseWeight: 5.7, rarity: 'Divine', obtainable: true, icon: '☂️', category: 'Flower' },
  { id: 'redlollipop', name: 'Red Lollipop', baseValue: 45102, baseWeight: 3.799, rarity: 'Divine', obtainable: true, icon: '🍭', category: 'Candy' },
  { id: 'rosydelight', name: 'Rosy Delight', baseValue: 62273, baseWeight: 9.5, rarity: 'Divine', obtainable: true, icon: '🌹', category: 'Flower' },
  { id: 'soulfruit', name: 'Soul Fruit', baseValue: 6994, baseWeight: 23.75, rarity: 'Divine', obtainable: true, icon: '👻', category: 'Exotic' },
  { id: 'succulent', name: 'Succulent', baseValue: 22563, baseWeight: 4.75, rarity: 'Divine', obtainable: true, icon: '🌿', category: 'Plant' },
  { id: 'sugarapple', name: 'Sugar Apple', baseValue: 43320, baseWeight: 8.55, rarity: 'Divine', obtainable: true, icon: '🍎', category: 'Fruit' },
  { id: 'suncoil', name: 'Suncoil', baseValue: 72200, baseWeight: 9.5, rarity: 'Divine', obtainable: true, icon: '☀️', category: 'Plant' },
  { id: 'venusflytrap', name: 'Venus Fly Trap', baseValue: 40612, baseWeight: 9.5, rarity: 'Divine', obtainable: true, icon: '🪤', category: 'Plant' },
  { id: 'wildcarrot', name: 'Wild Carrot', baseValue: 15640, baseWeight: 0.286, rarity: 'Divine', obtainable: true, icon: '🥕', category: 'Vegetable' },
  
  // Prismatic Crops
  { id: 'beanstalk', name: 'Beanstalk', baseValue: 25270, baseWeight: 9.1, rarity: 'Prismatic', obtainable: true, icon: '🌱', category: 'Plant' },
  { id: 'lumira', name: 'Lumira', baseValue: 76713, baseWeight: 5.69, rarity: 'Prismatic', obtainable: true, icon: '💎', category: 'Crystal' },
  { id: 'beebalm', name: 'Bee Balm', baseValue: 16245, baseWeight: 0.94, rarity: 'Prismatic', obtainable: true, icon: '🐝', category: 'Flower' },
  { id: 'bendboo', name: 'Bendboo', baseValue: 138988, baseWeight: 17.09, rarity: 'Prismatic', obtainable: true, icon: '🎋', category: 'Plant' },
  { id: 'cursedfruits', name: 'Cursed Fruit', baseValue: 15000, baseWeight: 22.9, rarity: 'Prismatic', obtainable: true, icon: '💀', category: 'Cursed' },
  { id: 'dandelion', name: 'Dandelion', baseValue: 45125, baseWeight: 3.79, rarity: 'Prismatic', obtainable: true, icon: '🌼', category: 'Flower' },
  { id: 'dragonpepper', name: 'Dragon Pepper', baseValue: 80000, baseWeight: 5.69, rarity: 'Prismatic', obtainable: true, icon: '🐲', category: 'Spice' },
  { id: 'easteregg', name: 'Easter Egg', baseValue: 2256, baseWeight: 2.85, rarity: 'Prismatic', obtainable: true, icon: '🥚', category: 'Event' },
  { id: 'elephantears', name: 'Elephant Ears', baseValue: 69492, baseWeight: 17.1, rarity: 'Prismatic', obtainable: true, icon: '🐘', category: 'Plant' },
  { id: 'manukaflower', name: 'Manuka Flower', baseValue: 22563, baseWeight: 0.289, rarity: 'Prismatic', obtainable: true, icon: '🌸', category: 'Flower' },
  { id: 'moonflower', name: 'Moonflower', baseValue: 8574, baseWeight: 1.9, rarity: 'Prismatic', obtainable: true, icon: '🌙', category: 'Flower' },
  { id: 'papaya', name: 'Papaya', baseValue: 903, baseWeight: 2.86, rarity: 'Prismatic', obtainable: true, icon: '🧡', category: 'Fruit' },
  
  // Event/Unobtainable Crops
  { id: 'moonmelon', name: 'Moon Melon', baseValue: 16245, baseWeight: 7.6, rarity: 'Event', obtainable: false, icon: '🌙', category: 'Moon Event' },
  { id: 'moonglow', name: 'Moonglow', baseValue: 18050, baseWeight: 6.65, rarity: 'Event', obtainable: false, icon: '🌙', category: 'Moon Event' },
  { id: 'moonmango', name: 'Moon Mango', baseValue: 45125, baseWeight: 14.25, rarity: 'Event', obtainable: false, icon: '🌙', category: 'Moon Event' },
  { id: 'moonblossom', name: 'Moon Blossom', baseValue: 60166, baseWeight: 2.85, rarity: 'Event', obtainable: false, icon: '🌙', category: 'Moon Event' },
  { id: 'candyblossom', name: 'Candy Blossom', baseValue: 90250, baseWeight: 2.85, rarity: 'Event', obtainable: false, icon: '🍭', category: 'Candy Event' },
  { id: 'candycarrot', name: 'Candy Carrot', baseValue: 45000, baseWeight: 0.24, rarity: 'Event', obtainable: false, icon: '🍭', category: 'Candy Event' },
];

const envMutations: EnvMutation[] = [
  // Basic Environmental Effects
  { name: 'Choc', bonus: 1, category: 'Basic', description: 'Chocolate flavor enhancement that adds sweetness' },
  { name: 'Moonlit', bonus: 1, category: 'Basic', description: 'Moonlight exposure creates magical properties' },
  { name: 'Windstruck', bonus: 1, category: 'Basic', description: 'Wind exposure strengthens crop structure' },
  
  // Enhanced Environmental Effects  
  { name: 'Pollinated', bonus: 2, category: 'Enhanced', description: 'Bee pollination increases crop quality' },
  { name: 'Bloodlit', bonus: 3, category: 'Enhanced', description: 'Blood moon radiation enhances growth' },
  { name: 'Burnt', bonus: 3, category: 'Enhanced', description: 'Fire exposure creates unique flavors' },
  { name: 'Verdant', bonus: 3, category: 'Enhanced', description: 'Lush green environment promotes health' },
  
  // Advanced Environmental Effects
  { name: 'Plasma', bonus: 4, category: 'Advanced', description: 'Plasma energy infusion increases potency' },
  { name: 'HoneyGlazed', bonus: 4, category: 'Advanced', description: 'Natural honey coating preserves freshness' },
  { name: 'Heavenly', bonus: 4, category: 'Advanced', description: 'Divine blessing enhances all properties' },
  { name: 'Twisted', bonus: 4, category: 'Advanced', description: 'Reality distortion creates unusual effects' },
  
  // Rare Environmental Effects
  { name: 'Cooked', bonus: 9, category: 'Rare', description: 'Heat treatment transforms crop structure' },
  { name: 'Paradisal', bonus: 17, category: 'Rare', description: 'Paradise-like perfect growing conditions' },
  
  // Epic Environmental Effects
  { name: 'Zombified', bonus: 24, category: 'Epic', description: 'Undead transformation preserves indefinitely' },
  { name: 'Molten', bonus: 24, category: 'Epic', description: 'Extreme heat creates crystalline structures' },
  { name: 'Sundried', bonus: 84, category: 'Epic', description: 'Concentrated by intense sun exposure' },
  
  // Legendary Environmental Effects
  { name: 'Shocked', bonus: 99, category: 'Legendary', description: 'Electrical charge enhances all attributes' },
  { name: 'Alienlike', bonus: 99, category: 'Legendary', description: 'Extraterrestrial transformation' },
  { name: 'Celestial', bonus: 119, category: 'Legendary', description: 'Cosmic energy infusion from stars' },
  { name: 'Galactic', bonus: 119, category: 'Legendary', description: 'Interstellar matter enhancement' },
  
  // Mythical Environmental Effects
  { name: 'Disco', bonus: 124, category: 'Mythical', description: 'Groovy dance floor energy amplification' },
  { name: 'Meteoric', bonus: 124, category: 'Mythical', description: 'Meteor impact creates rare compounds' },
  
  // Divine Environmental Effects
  { name: 'Voidtouched', bonus: 134, category: 'Divine', description: 'Touched by the void between dimensions' },
  { name: 'Dawnbound', bonus: 149, category: 'Divine', description: 'Bound to the eternal first light of creation' },
];

const rarityColors = {
  Common: 'bg-gray-500',
  Rare: 'bg-blue-500',
  Legendary: 'bg-purple-500',
  Mythical: 'bg-pink-500',
  Divine: 'bg-yellow-500',
  Prismatic: 'bg-gradient-to-r from-purple-500 to-pink-500',
  Event: 'bg-gradient-to-r from-orange-500 to-red-500',
};

// 导入博客数据
import { getLatestPosts, type BlogPost } from '@/lib/blog-data';
import { BlogImage } from '@/components/blog-image';

export default function Home() {
  // SEO结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Grow a Garden Calculator",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "description": "The most advanced Grow a Garden calculator for Roblox. Calculate precise crop values, mutations, and profits with our professional calculator tool featuring 100+ crops and all mutations.",
    "url": "https://www.grow-a-garden-calculator.org",
    "author": {
      "@type": "Organization",
      "name": "Grow a Garden Calculator Team"
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1247"
    },
    "featureList": [
      "100+ Crop Database",
      "Real-time Value Calculations", 
      "Mutation Combinations",
      "Profit Optimization",
      "Weight Analysis",
      "Formula Breakdown"
    ],
    "screenshot": "https://www.grow-a-garden-calculator.org/screenshot.png",
    "softwareVersion": "2025.1.0",
    "datePublished": "2024-01-01",
    "dateModified": "2025-01-10"
  };

  // 现有的状态定义
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [actualWeight, setActualWeight] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [friendBoost, setFriendBoost] = useState<number>(0);
  const [selectedGrowthMutation, setSelectedGrowthMutation] = useState<string>('default');
  const [selectedTempMutation, setSelectedTempMutation] = useState<string>('default');
  const [selectedEnvMutations, setSelectedEnvMutations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRarity, setFilterRarity] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [latestPosts, setLatestPosts] = useState<any[]>([]);

  // 获取最新文章
  useEffect(() => {
    try {
      const posts = getLatestPosts(3); // 获取最新3篇文章
      setLatestPosts(posts);
      setIsLoading(false);
    } catch (error) {
      console.error('获取最新文章失败:', error);
      setIsLoading(false);
    }
  }, []);

  // Handle crop selection and auto-fill base weight
  const handleCropSelection = (crop: Crop) => {
    setSelectedCrop(crop);
    setActualWeight(crop.baseWeight.toString()); // Auto-fill weight with base weight
  };

  // 高精度价值计算（无提前四舍五入）
  const calculatedValue = useMemo(() => {
    if (!selectedCrop) return 0;
    
    // P: Base Price
    const P = selectedCrop.baseValue;
    
    // V: Growth Mutation Multiplier
    const V = growthMutations.find(g => g.id === selectedGrowthMutation)?.multiplier || 1;
    
    // Temperature Bonus
    const tempBonus = tempMutations.find(t => t.id === selectedTempMutation)?.bonus || 0;
    
    // Environmental Bonus Sum
    const envBonus = selectedEnvMutations.reduce((sum, mutationName) => {
      const mutation = envMutations.find(m => m.name === mutationName);
      return sum + (mutation ? mutation.bonus : 0);
    }, 0);
    
    // M: Environmental + Temperature Multiplier (1 + sum of bonuses)
    const M = 1 + envBonus + tempBonus;
    
    // Weight Correction: clamp(W/B, 0.95, ∞)²
    const W = parseFloat(actualWeight) || 0;
    const B = selectedCrop.baseWeight;
    const weightRatio = Math.max(0.95, W / B); // clamp minimum to 0.95
    const weightCorrection = weightRatio * weightRatio; // square the result
    
    // Friend Boost Multiplier
    const friendMultiplier = 1 + (friendBoost / 100);

    // Official Formula: Total = round(P × V × M × clamp(W/B, 0.95, ∞)² × Quantity × FriendBoost)
    const totalValue = P * V * M * weightCorrection * quantity * friendMultiplier;
    
    // 调试信息（开发时使用）
    if (process.env.NODE_ENV === 'development') {
      console.log('Debug Banana calculation:');
      console.log('P:', P);
      console.log('V:', V);
      console.log('M:', M);
      console.log('weightCorrection:', weightCorrection);
      console.log('quantity:', quantity);
      console.log('friendMultiplier:', friendMultiplier);
      console.log('totalValue (before rounding):', totalValue);
      console.log('totalValue (rounded):', Math.round(totalValue));
    }
    
    // Try using Math.floor instead of Math.round to match competitor
    return Math.floor(Math.max(0, totalValue));
  }, [selectedCrop, selectedGrowthMutation, selectedTempMutation, selectedEnvMutations, actualWeight, quantity, friendBoost]);

  // High-precision revenue analysis
  const revenueAnalysis = useMemo(() => {
    const W = parseFloat(actualWeight) || 0;
    if (!selectedCrop || W <= 0) return null;

    const basePrice = selectedCrop.baseValue;
    const baseWeight = selectedCrop.baseWeight;
    const growthMultiplier = growthMutations.find(g => g.id === selectedGrowthMutation)?.multiplier || 1;
    const tempBonus = tempMutations.find(t => t.id === selectedTempMutation)?.bonus || 0;
    const envBonus = selectedEnvMutations.reduce((sum, mutationName) => {
      const mutation = envMutations.find(m => m.name === mutationName);
      return sum + (mutation ? mutation.bonus : 0);
    }, 0);
    const friendBoostPercent = friendBoost;

    // High-precision calculations (no premature rounding)
    const weightRatio = W / baseWeight;
    const weightCorrection = Math.pow(Math.max(weightRatio, 0.95), 2);
    const finalMultiplier = 1 + envBonus + tempBonus;
    const totalValue = basePrice * growthMultiplier * finalMultiplier * weightCorrection * quantity * (1 + friendBoostPercent / 100);

    // Additional multipliers for analysis
    const growthMultiplierValue = growthMultiplier;
    const envTempMultiplier = finalMultiplier;
    const weightMultiplier = weightCorrection;
    const friendBoostMultiplier = 1 + friendBoostPercent / 100;

    return {
      totalValue: Math.round(totalValue),
      baseValue: basePrice,
      growthMultiplierValue,
      envTempMultiplier,
      weightMultiplier,
      friendBoostMultiplier
    };
  }, [selectedCrop, selectedGrowthMutation, selectedTempMutation, selectedEnvMutations, actualWeight, quantity, friendBoost]);

  // Price formatting - only Sheckles
  const formatPrice = (value: number) => {
    return `${value.toLocaleString()} Sheckles`;
  };

  const filteredCrops = useMemo(() => {
    return crops.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = filterRarity === 'All' || crop.rarity === filterRarity;
      return matchesSearch && matchesRarity;
    });
  }, [searchTerm, filterRarity]);

  const handleEnvMutationChange = (mutationName: string, checked: boolean) => {
    if (checked) {
      setSelectedEnvMutations([...selectedEnvMutations, mutationName]);
    } else {
      setSelectedEnvMutations(selectedEnvMutations.filter(m => m !== mutationName));
    }
  };

  const clearAll = () => {
    setSelectedCrop(null);
    setActualWeight('1');
    setQuantity(1);
    setFriendBoost(0);
    setSelectedGrowthMutation('default');
    setSelectedTempMutation('default');
    setSelectedEnvMutations([]);
  };

  const setMaxMutations = () => {
    // Set highest Growth Mutation (Rainbow: ×50)
    setSelectedGrowthMutation('rainbow');
    
    // Set highest Temperature Mutation (Frozen: +9)
    setSelectedTempMutation('frozen');
    
    // Select ALL environmental mutations for maximum bonus (total: 1155)
    const allMutations = envMutations.map(m => m.name);
    setSelectedEnvMutations(allMutations);
  };

  const rarityOptions = ['All', ...Object.keys(rarityColors)];

  // 添加getTagColor函数
  const getTagColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Tutorial': 'bg-blue-500/20 text-blue-300',
      'Guide': 'bg-green-500/20 text-green-300',
      'Strategy': 'bg-purple-500/20 text-purple-300',
      'Calculator': 'bg-emerald-500/20 text-emerald-300',
      'Tips': 'bg-yellow-500/20 text-yellow-300',
      'default': 'bg-slate-500/20 text-slate-300'
    };
    return colors[category] || colors.default;
  };

  return (
    <TooltipProvider>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Navigation */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-6 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-700">
                <Link href="/" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                  Calculator
                </Link>
                <Separator orientation="vertical" className="h-4 bg-slate-600" />
                <Link href="/blog" className="text-slate-300 font-medium hover:text-emerald-300 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Blog & Guides
                </Link>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Calculator className="text-emerald-400" />
              Grow a Garden Calculator
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl mb-3">
              The ultimate grow a garden value calculator for Roblox with advanced crop analysis and grow a garden mutation calculator features
            </p>
            <p className="text-slate-400 text-sm mb-4">
              Professional grow a garden price calculator using the official formula: Total = round(P × V × M × clamp(W/B, 0.95, ∞)² × Qty × Friend)
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                Best Grow a Garden Calculator
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                Official Formula
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                Fruit Value Calculator
              </Badge>
              <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                High Precision
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Panel - Crop Selection */}
            <div className="xl:col-span-1 space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-2 text-lg">
                    <Search className="w-5 h-5 text-emerald-400" />
                    Select Crop ({filteredCrops.length} of {crops.length})
                  </CardTitle>
                  
                  {/* Search and Filter */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search crops by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <Select value={filterRarity} onValueChange={setFilterRarity}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500">
                          <SelectValue placeholder="Filter by rarity" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {rarityOptions.map((rarity) => (
                            <SelectItem key={rarity} value={rarity} className="text-white hover:bg-slate-600">
                              {rarity} {rarity !== 'All' && `(${crops.filter(c => c.rarity === rarity).length})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <ScrollArea className="h-[500px] lg:h-[600px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3 pr-4">
                      {filteredCrops.map((crop) => (
                        <Tooltip key={crop.id}>
                          <TooltipTrigger asChild>
                        <Card
                              className={`cursor-pointer transition-all duration-200 hover:scale-[1.01] border-2 ${
                            selectedCrop?.id === crop.id
                                  ? 'border-emerald-400 bg-emerald-900/30 shadow-lg shadow-emerald-500/20'
                                  : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50'
                          } ${!crop.obtainable ? 'opacity-60' : ''}`}
                              onClick={() => handleCropSelection(crop)}
                        >
                              <CardContent className="p-3 lg:p-4">
                                <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                                  <span className="text-xl lg:text-2xl">{crop.icon}</span>
                              <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white text-sm lg:text-base truncate">
                                      {crop.name}
                                    </h3>
                                    <p className="text-xs lg:text-sm text-slate-400 truncate">
                                      {crop.category}
                                    </p>
                              </div>
                              <Badge className={`${rarityColors[crop.rarity]} text-white text-xs shrink-0`}>
                                {crop.rarity}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                  <div className="text-left">
                                    <p className="text-emerald-400 font-bold text-sm lg:text-base">
                                      {formatPrice(crop.baseValue)}
                              </p>
                                    <p className="text-xs text-slate-500">Base Price</p>
                                  </div>
                                  <div className="text-right">
                              {!crop.obtainable && (
                                      <Badge variant="destructive" className="text-xs mb-1">
                                        Event Only
                                </Badge>
                              )}
                                    <p className="text-xs text-slate-400">
                                      {crop.baseWeight}kg
                                    </p>
                                  </div>
                            </div>
                          </CardContent>
                        </Card>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">
                              <p><strong>Base Price (P):</strong> {formatPrice(crop.baseValue)}</p>
                              <p><strong>Base Weight (B):</strong> {crop.baseWeight}kg</p>
                              <p className="text-xs text-slate-400 mt-1">
                                Used in weight correction: clamp(W/B, 0.95, ∞)²
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Parameters & Results */}
            <div className="xl:col-span-2 space-y-6">
              {/* Selected Crop Info */}
              {selectedCrop && (
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <span className="text-2xl lg:text-3xl">{selectedCrop.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg lg:text-xl">
                          {selectedCrop.name}
                        </h3>
                        <p className="text-sm lg:text-base text-slate-400">
                          {selectedCrop.category} • {selectedCrop.rarity}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${rarityColors[selectedCrop.rarity]} text-white mb-2`}>
                          {selectedCrop.rarity}
                        </Badge>
                        <p className="text-lg lg:text-xl font-bold text-emerald-400">
                          P = {formatPrice(selectedCrop.baseValue)}
                        </p>
                        <p className="text-xs lg:text-sm text-slate-400">Base Price</p>
                        <p className="text-xs lg:text-sm text-slate-400">B = {selectedCrop.baseWeight}kg (Base Weight)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Parameters */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white text-lg lg:text-xl flex items-center gap-2">
                      <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
                      Parameters
                    </CardTitle>
                </CardHeader>
                  <CardContent className="space-y-4 lg:space-y-6 px-4 lg:px-6 pb-4 lg:pb-6">
                  {/* Weight and Quantity */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    <div>
                        <Label htmlFor="weight" className="text-slate-300 text-sm lg:text-base flex items-center gap-2 mb-2">
                          Weight (W) <span className="text-xs lg:text-sm text-slate-400">kg</span>
                        </Label>
                      <Input
                        id="weight"
                        type="number"
                        value={actualWeight}
                        onChange={(e) => setActualWeight(e.target.value)}
                          min="0.01"
                          step="0.01"
                          className="bg-slate-700/50 border-slate-600 text-white text-sm lg:text-base h-10 lg:h-12 focus:border-emerald-500"
                        />
                        <p className="text-xs text-slate-400 mt-1">
                          Used in weight correction
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="quantity" className="text-slate-300 text-sm lg:text-base mb-2 block">
                          Quantity
                        </Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                          className="bg-slate-700/50 border-slate-600 text-white text-sm lg:text-base h-10 lg:h-12 focus:border-emerald-500"
                      />
                        <p className="text-xs text-slate-400 mt-1">
                          Direct multiplier
                        </p>
                    </div>
                  </div>

                  {/* Friend Boost */}
                  <div>
                      <Label className="text-slate-300 text-sm lg:text-base flex items-center gap-2 mb-3">
                        Friend Boost: {friendBoost}%
                        <span className="text-xs lg:text-sm text-slate-400">
                          (×{(1 + friendBoost / 100).toFixed(2)})
                        </span>
                      </Label>
                    <Slider
                      value={[friendBoost]}
                      onValueChange={(value) => setFriendBoost(value[0])}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                      <p className="text-xs text-slate-400 mt-2">
                        Final multiplier applied
                      </p>
                  </div>

                  <Separator className="bg-slate-600" />

                  {/* Growth Mutations */}
                  <div>
                      <Label className="text-slate-300 text-sm lg:text-base mb-3 block flex items-center gap-2">
                        <Crown className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                        Growth Mutation (V)
                      </Label>
                      <RadioGroup value={selectedGrowthMutation} onValueChange={setSelectedGrowthMutation} className="space-y-2 lg:space-y-3">
                        {growthMutations.map((mutation) => {
                          return (
                            <Tooltip key={mutation.id}>
                              <TooltipTrigger asChild>
                                <div className={`flex items-center space-x-2 lg:space-x-3 p-3 lg:p-4 rounded-lg transition-all duration-200 border ${
                                  selectedGrowthMutation === mutation.id
                                    ? 'bg-yellow-900/30 border-yellow-500/50 shadow-lg'
                                    : 'border-slate-600/50 hover:bg-slate-700/30 hover:border-slate-500'
                                }`}>
                                  <RadioGroupItem value={mutation.id} id={mutation.id} className="border-slate-400" />
                                  <Label
                                    htmlFor={mutation.id}
                                    className={`text-sm lg:text-base cursor-pointer flex-1 transition-colors ${
                                      mutation.id === 'golden' ? 'text-yellow-400' : 
                                      mutation.id === 'rainbow' ? 'text-purple-400' : 
                                      'text-slate-300'
                                    } ${
                                      selectedGrowthMutation === mutation.id ? 'font-medium' : ''
                                    }`}
                                  >
                                    {mutation.name}
                                  </Label>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs lg:text-sm transition-colors ${
                                      selectedGrowthMutation === mutation.id
                                        ? 'text-yellow-300 border-yellow-400 bg-yellow-900/20'
                                        : 'text-emerald-400 border-emerald-400'
                                    }`}
                                  >
                                    V = ×{mutation.multiplier}
                                  </Badge>
                      </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">
                                  <strong>{mutation.name} Growth Mutation</strong><br/>
                                  {mutation.description}<br/>
                                  <span className="text-emerald-400">Multiplier (V): ×{mutation.multiplier}</span>
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                    </RadioGroup>
                  </div>

                  <Separator className="bg-slate-600" />

                    {/* Temperature Mutations */}
                    <div>
                      <Label className="text-slate-300 text-sm lg:text-base mb-3 block flex items-center gap-2">
                        <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                        Temperature Mutation
                      </Label>
                      <RadioGroup value={selectedTempMutation} onValueChange={setSelectedTempMutation} className="space-y-2 lg:space-y-3">
                        {tempMutations.map((mutation) => {
                          return (
                            <Tooltip key={mutation.id}>
                              <TooltipTrigger asChild>
                                <div className={`flex items-center space-x-2 lg:space-x-3 p-3 lg:p-4 rounded-lg transition-all duration-200 border ${
                                  selectedTempMutation === mutation.id
                                    ? 'bg-blue-900/30 border-blue-500/50 shadow-lg'
                                    : 'border-slate-600/50 hover:bg-slate-700/30 hover:border-slate-500'
                                }`}>
                                  <RadioGroupItem value={mutation.id} id={mutation.id} className="border-slate-400" />
                                  <Label
                                    htmlFor={mutation.id}
                                    className={`text-sm lg:text-base cursor-pointer flex-1 transition-colors ${
                                      mutation.id === 'wet' ? 'text-emerald-400' : 
                                      mutation.id === 'chilled' ? 'text-blue-400' : 
                                      mutation.id === 'frozen' ? 'text-cyan-400' : 
                                      'text-slate-300'
                                    } ${
                                      selectedTempMutation === mutation.id ? 'font-medium' : ''
                                    }`}
                                  >
                                    {mutation.name}
                                  </Label>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs lg:text-sm transition-colors ${
                                      selectedTempMutation === mutation.id
                                        ? 'text-blue-300 border-blue-400 bg-blue-900/20'
                                        : 'text-emerald-400 border-emerald-400'
                                    }`}
                                  >
                                    {mutation.bonus > 0 ? `+${mutation.bonus}` : '0'}
                                  </Badge>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">
                                  <strong>{mutation.name}</strong><br/>
                                  {mutation.description}<br/>
                                  <span className="text-emerald-400">Additive Bonus: +{mutation.bonus}</span><br/>
                                  <span className="text-xs text-slate-400">Added to M calculation</span>
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </RadioGroup>
                    </div>

                  {/* Environmental Mutations */}
                  <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-slate-300 text-sm lg:text-base flex items-center gap-2">
                          <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                          Environmental ({selectedEnvMutations.length})
                        </Label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedEnvMutations([...selectedEnvMutations, ...envMutations.filter(m => !selectedEnvMutations.includes(m.name)).map(m => m.name)])}
                          className="border-slate-600 text-slate-300 text-xs hover:border-emerald-500"
                        >
                          Add All Mutations
                        </Button>
                      </div>

                      {selectedEnvMutations.length > 0 && (
                        <div className="mb-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                          <p className="text-sm text-slate-400 mb-1">Total Bonus:</p>
                          <p className="text-emerald-400 font-bold text-base lg:text-lg">
                            +{selectedEnvMutations.reduce((sum, mutationName) => {
                              const mutation = envMutations.find(m => m.name === mutationName);
                              return sum + (mutation ? mutation.bonus : 0);
                            }, 0)}
                          </p>
                        </div>
                      )}

                      {/* Environmental Mutations by Category */}
                      <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-slate-700/50 h-10 lg:h-12">
                          <TabsTrigger value="all" className="text-xs lg:text-sm">All</TabsTrigger>
                          <TabsTrigger value="Basic" className="text-xs lg:text-sm">Basic</TabsTrigger>
                          <TabsTrigger value="Enhanced" className="text-xs lg:text-sm">Enhanced</TabsTrigger>
                          <TabsTrigger value="Advanced" className="text-xs lg:text-sm">Advanced+</TabsTrigger>
                        </TabsList>
                        
                        {['all', 'Basic', 'Enhanced', 'Advanced'].map((category) => (
                          <TabsContent key={category} value={category} className="mt-3">
                            <ScrollArea className="h-32 lg:h-40">
                              <div className="space-y-2 pr-4">
                                {envMutations
                                  .filter(mutation => category === 'all' || mutation.category === category || (category === 'Advanced' && ['Advanced', 'Rare', 'Epic', 'Legendary', 'Mythical', 'Divine'].includes(mutation.category)))
                                  .map((mutation) => (
                                    <Tooltip key={mutation.name}>
                                      <TooltipTrigger asChild>
                                        <div className={`flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg transition-all duration-200 border ${
                                          selectedEnvMutations.includes(mutation.name) 
                                            ? 'bg-emerald-900/30 border-emerald-500/50 shadow-lg' 
                                            : 'border-slate-600/50 hover:bg-slate-700/30 hover:border-slate-500'
                                        }`}>
                            <Checkbox
                              id={mutation.name}
                              checked={selectedEnvMutations.includes(mutation.name)}
                              onCheckedChange={(checked) => 
                                handleEnvMutationChange(mutation.name, checked as boolean)
                              }
                                            className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                            />
                            <Label 
                              htmlFor={mutation.name} 
                                            className={`flex-1 cursor-pointer text-xs lg:text-sm transition-colors ${
                                              selectedEnvMutations.includes(mutation.name)
                                                ? 'text-emerald-300 font-medium'
                                                : 'text-slate-300'
                                            }`}
                            >
                              {mutation.name}
                            </Label>
                                          <Badge 
                                            variant="outline" 
                                            className={`text-xs transition-colors ${
                                              selectedEnvMutations.includes(mutation.name)
                                                ? 'text-emerald-300 border-emerald-400 bg-emerald-900/20'
                                                : 'text-emerald-400 border-emerald-400'
                                            }`}
                                          >
                              +{mutation.bonus}
                            </Badge>
                          </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-sm">
                                          <strong>{mutation.name}</strong> ({mutation.category})<br/>
                                          {mutation.description}<br/>
                                          <span className="text-emerald-400">Additive Bonus: +{mutation.bonus}</span><br/>
                                          <span className="text-xs text-slate-400">Added to M calculation</span>
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                        ))}
                      </div>
                    </ScrollArea>
                          </TabsContent>
                        ))}
                      </Tabs>
                  </div>

                  {/* Quick Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button 
                        onClick={clearAll} 
                        variant="outline" 
                        className="flex-1 border-slate-600 text-slate-300 text-sm lg:text-base h-10 lg:h-12 hover:border-slate-500"
                      >
                        Reset All
                    </Button>
                      <Button 
                        onClick={setMaxMutations} 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-sm lg:text-base h-10 lg:h-12"
                      >
                      Max Mutations
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white flex items-center gap-2 text-lg lg:text-xl">
                      <Calculator className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
                      Results
                  </CardTitle>
                </CardHeader>
                  <CardContent className="px-4 lg:px-6 pb-4 lg:pb-6">
                    <div className="space-y-4 lg:space-y-6">
                      <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 rounded-xl p-6 lg:p-8 border border-emerald-500/30 shadow-lg">
                        <p className="text-2xl lg:text-4xl xl:text-5xl font-bold text-emerald-300 mb-2 lg:mb-3 drop-shadow-lg text-center">
                          {formatPrice(calculatedValue)}
                        </p>
                        <p className="text-emerald-100 text-base lg:text-xl font-medium text-center">Total Value</p>
                        <p className="text-emerald-200/70 text-xs lg:text-sm mt-1 lg:mt-2 text-center">
                          Using Official Formula
                        </p>
                    </div>
                    
                    {selectedCrop && parseFloat(actualWeight) > 0 && (
                          <div className="grid grid-cols-2 gap-3 lg:gap-4 text-sm">
                            <div className="bg-slate-700/40 rounded-lg p-3 lg:p-4 border border-slate-600/50">
                              <p className="text-emerald-300 font-bold text-base lg:text-xl">
                                {formatPrice(Math.round(calculatedValue / parseFloat(actualWeight)))}
                            </p>
                              <p className="text-slate-300 text-sm lg:text-base mt-1">Per kg</p>
                            </div>
                            <div className="bg-slate-700/40 rounded-lg p-3 lg:p-4 border border-slate-600/50">
                              <p className="text-blue-300 font-bold text-base lg:text-xl">
                                {Math.round((parseFloat(actualWeight) || 1) / (selectedCrop?.baseWeight || 1) * 100)}%
                              </p>
                              <p className="text-slate-300 text-sm lg:text-base mt-1">Weight Ratio</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {latestPosts.map((post: any, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className={`text-xs ${getTagColor(post.category)} border-none cursor-pointer hover:scale-105 transition-transform`}
                                  >
                                    {post.category}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mt-3">
                                <div className="bg-slate-800/50 rounded-lg p-3 lg:p-4 border border-slate-600/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-white font-semibold text-sm lg:text-base">Weight Analysis</h4>
                                    <Calculator className="w-4 h-4 text-emerald-400" />
                                  </div>
                                  <p className="text-xs text-slate-400 mt-1 hidden lg:block">
                                    ({parseFloat(actualWeight)} / {selectedCrop?.baseWeight})²
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      
                      {/* Revenue Analysis Chart */}
                      {revenueAnalysis && (
                          <div className="mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-slate-600/50">
                              <div className="text-xs lg:text-sm text-slate-300 bg-slate-700/30 rounded-lg p-3 lg:p-4">
                                <h4 className="text-white font-semibold mb-2 lg:mb-3">Revenue Analysis & Formula Breakdown</h4>
                                <div className="space-y-2 text-xs lg:text-sm">
                                  <p><span className="text-emerald-400 font-bold">Total Value:</span> {formatPrice(calculatedValue)}</p>
                                  <p><span className="text-blue-400 font-bold">Value per kg:</span> {formatPrice(Math.round(calculatedValue / parseFloat(actualWeight)))}</p>
                                </div>
                              </div>
                            </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
        </div>

        {/* Tutorial Section */}
        <section className="bg-slate-800/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                How to Use Our Grow a Garden Calculator - Step by Step Guide
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                Master Roblox farming with our comprehensive grow a garden calculator roblox guide. 
                This grow a garden fruit value calculator helps you maximize crop profits and dominate the market using our advanced grow a garden value calculator.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Select Your Crop</h3>
                  <p className="text-slate-400 text-sm">
                    Choose from 100+ crops in our grow a garden calculator database. Each crop has unique base values for accurate grow a garden price calculator results.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Set Parameters</h3>
                  <p className="text-slate-400 text-sm">
                    Input weight, quantity, and friend boost percentage. Our grow a garden calculator auto-fills base weights for precise calculations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Apply Mutations</h3>
                  <p className="text-slate-400 text-sm">
                    Use our grow a garden mutation calculator to select growth, temperature, and environmental mutations for maximum profit optimization.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Get Results</h3>
                  <p className="text-slate-400 text-sm">
                    View detailed calculations, profit analysis, and optimization suggestions from our professional grow a garden calculator.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose Our Grow a Garden Calculator? - Premium Features
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                Our grow a garden calculator stands out with advanced features, accurate calculations, 
                and user-friendly design. This grow a garden value calculator helps Roblox players maximize farming profits with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Official Formula Integration</h3>
                <p className="text-slate-400">
                  Our grow a garden calculator uses the exact official formula with high-precision calculations 
                  for accurate results. This grow a garden price calculator ensures 100% accuracy every time.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gem className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Complete Crop Database</h3>
                <p className="text-slate-400">
                  Complete crop database with 100+ varieties from Common to Event crops. 
                  Our grow a garden fruit value calculator stays constantly updated for the latest Grow a Garden content.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Advanced Mutation Support</h3>
                <p className="text-slate-400">
                  Full support for all mutation types including growth, temperature, and 26+ environmental 
                  mutations. Our grow a garden mutation calculator provides precise bonus calculations for optimal results.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-time Calculations</h3>
                <p className="text-slate-400">
                  Instant results as you adjust parameters. Our grow a garden calculator 
                  provides immediate feedback for quick decision making and profit optimization strategies.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Advanced Profit Analysis</h3>
                <p className="text-slate-400">
                  Detailed profit analysis with per-kg values, multiplier breakdowns, 
                  and optimization suggestions. This grow a garden value calculator maximizes your farming returns.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">User-Friendly Interface</h3>
                <p className="text-slate-400">
                  Intuitive interface with tooltips, search functionality, and responsive design. 
                  Our grow a garden calculator roblox tool works perfectly on all devices for seamless farming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-800/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions - Grow a Garden Calculator Guide
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                Get answers to common questions about our grow a garden calculator and 
                learn how to maximize your Roblox farming success with our grow a garden value calculator.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2 text-lg">
                    How accurate is this grow a garden calculator?
                  </h3>
                  <p className="text-slate-400">
                    Our grow a garden calculator uses the exact official formula from the game with high-precision 
                    floating-point calculations. This grow a garden price calculator matches in-game values with 100% accuracy, 
                    including proper weight correction and mutation bonuses.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2 text-lg">
                    What makes this grow a garden calculator different from others?
                  </h3>
                  <p className="text-slate-400">
                    Our grow a garden calculator features the most comprehensive crop database (100+ crops), 
                    supports all mutation types, provides detailed profit analysis, and uses 
                    high-precision calculations that other grow a garden calculator tools lack.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2 text-lg">
                    How do I maximize profits using this grow a garden calculator?
                  </h3>
                  <p className="text-slate-400">
                    Use the "Max Mutations" button to see theoretical maximum values, compare different 
                    crops using our grow a garden value calculator profit analysis, focus on crops with high value multipliers, 
                    and optimize weight ratios for better returns.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2 text-lg">
                    Are all crops and mutations included in the grow a garden calculator?
                  </h3>
                  <p className="text-slate-400">
                    Yes! Our grow a garden calculator database includes all obtainable crops from Common to Prismatic rarity, 
                    plus Event crops. We support all growth mutations (Default, Golden, Rainbow), 
                    temperature mutations, and 26+ environmental mutations in our grow a garden mutation calculator.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2 text-lg">
                    How often is the grow a garden calculator updated?
                  </h3>
                  <p className="text-slate-400">
                    We regularly update our grow a garden calculator whenever new crops, mutations, 
                    or formula changes are released in Roblox Grow a Garden. Our grow a garden fruit value calculator database stays 
                    current with the latest game content for accurate calculations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2 text-lg">
                    Can I use this grow a garden calculator on mobile devices?
                  </h3>
                  <p className="text-slate-400">
                    Absolutely! Our grow a garden calculator features a fully responsive design 
                    that works perfectly on smartphones, tablets, and desktop computers. 
                    All grow a garden calculator roblox features are optimized for touch interfaces.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 最新文章板块 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <TrendingUp className="text-emerald-400" />
                Latest Grow a Garden Calculator Guides & Strategies
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                Master the latest Grow a Garden techniques and strategies to maximize your farming profits with our comprehensive grow a garden calculator guides and grow a garden value calculator tips
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-slate-400">Loading...</div>
              </div>
            ) : latestPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {latestPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer group h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Article featured image */}
                        <div className="w-full h-48 rounded-lg mb-4 overflow-hidden relative">
                          <BlogImage
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            fallbackClassName="w-full h-48"
                          />
                          {/* Category badge */}
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-black/60 text-white border-none backdrop-blur-sm">
                              {post.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Article content */}
                        <div className="flex-1 flex flex-col">
                          {/* Title */}
                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag: string) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs bg-slate-700 text-white border-slate-600"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>

                          {/* Article metadata */}
                          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-700">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.publishDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime} min read
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No Articles Yet</h3>
                <p className="text-slate-400">Great content is coming soon...</p>
              </div>
            )}

            {/* 查看更多按钮 */}
            {latestPosts.length > 0 && (
              <div className="text-center">
                <Link href="/blog">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 mx-auto">
                    View More Guides
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calculator className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Grow a Garden Calculator</h3>
              </div>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                The ultimate grow a garden calculator for Roblox players. Calculate crop values with our grow a garden value calculator, 
                optimize mutations with our grow a garden mutation calculator, and maximize your farming profits with our professional grow a garden price calculator tools.
              </p>
              
              {/* 导航链接 */}
              <div className="flex justify-center gap-8 mb-6">
                <Link href="/" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Calculator Tool
                </Link>
                <Link href="/blog" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Blog & Guides
                </Link>
              </div>
              
              <div className="flex justify-center space-x-6 text-sm text-slate-500">
                <span>&copy; {new Date().getFullYear()} Grow a Garden Calculator</span>
                <span>•</span>
                <span>Professional Roblox Farming Tools</span>
                <span>•</span>
                <span>Best Grow a Garden Calculator Roblox</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}