const mongoose = require('mongoose');

const WebConfigSchema = new mongoose.Schema({
  homeHeroTitle: {
    type: String,
    trim: true,
    default: "Transform Your Health, Love Your Body"
  },
  homeHeroSubtitle: {
    type: String,
    trim: true,
    default: "Achieve permanent results through personalized lifestyle guidance, high-energy Zumba sessions, and scientifically backed meal plans."
  },
  homeHeroImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
  },
  contactPhone: {
    type: String,
    trim: true,
    default: "+91 98765 43210"
  },
  contactEmail: {
    type: String,
    trim: true,
    default: "info@preethinutrition.com"
  },
  contactAddress: {
    type: String,
    trim: true,
    default: "Preethi Nutrition Center, Main Road, Block A, Bangalore, India"
  },
  operatingHours: {
    type: String,
    trim: true,
    default: "Mon - Fri: 6:00 AM - 11:30 AM, 4:30 PM - 8:30 PM | Sat: 6:00 AM - 12:00 PM | Sun: Closed"
  },
  aboutHeroTitle: {
    type: String,
    trim: true,
    default: "Nurturing Healthy Lives"
  },
  aboutHeroSubtitle: {
    type: String,
    trim: true,
    default: "Providing premium, personalized wellness guidance that empowers you to make sustainable health choices."
  },
  aboutMainContent: {
    type: String,
    trim: true,
    default: "Preethi Nutrition Center was founded on the belief that healthy living should be accessible, enjoyable, and tailored to the individual. Under the leadership of counselor Preethi Ma'am, we have spent over 15 years helping clients reshape their diets, increase energy, and manage chronic conditions.\n\nWe combine premium supplements, localized food habits, and active workouts like Zumba to build a comprehensive fitness profile that yields lifelong transformations."
  },
  aboutMission: {
    type: String,
    trim: true,
    default: "To deliver evidence-based, customized nutrition guidelines and support structures that enable clients to reach their optimal body weight, boost cardiorespiratory health, and make lifestyle shifts."
  },
  aboutVision: {
    type: String,
    trim: true,
    default: "To become a trusted community hub for total wellness, where physical movement, optimal cellular nutrition, and personal counseling converge to create vibrant, disease-free lifestyles."
  },
  aboutExperienceYears: {
    type: Number,
    default: 15
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

WebConfigSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('WebConfig', WebConfigSchema);
