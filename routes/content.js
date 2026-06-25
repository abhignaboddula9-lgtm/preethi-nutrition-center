const express = require('express');
const About = require('../models/About');
const WebConfig = require('../models/WebConfig');

const router = express.Router();

// @desc    Get website configuration (Home, About, Contact, Banners)
// @route   GET /api/content
// @access  Public
router.get('/', async (req, res) => {
  try {
    let config = await WebConfig.findOne();
    
    // If no document exists, return default mock configurations
    if (!config) {
      config = {
        homeHeroTitle: "Transform Your Health, Love Your Body",
        homeHeroSubtitle: "Achieve permanent results through personalized lifestyle guidance, high-energy Zumba sessions, and scientifically backed meal plans.",
        homeHeroImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
        contactPhone: "+91 98765 43210",
        contactEmail: "info@preethinutrition.com",
        contactAddress: "Preethi Nutrition Center, Main Road, Block A, Bangalore, India",
        operatingHours: "Mon - Fri: 6:00 AM - 11:30 AM, 4:30 PM - 8:30 PM | Sat: 6:00 AM - 12:00 PM | Sun: Closed",
        aboutHeroTitle: "Nurturing Healthy Lives",
        aboutHeroSubtitle: "Providing premium, personalized wellness guidance that empowers you to make sustainable health choices.",
        aboutMainContent: "Preethi Nutrition Center was founded on the belief that healthy living should be accessible, enjoyable, and tailored to the individual. Under the leadership of counselor Preethi Ma'am, we have spent over 15 years helping clients reshape their diets, increase energy, and manage chronic conditions.\n\nWe combine premium supplements, localized food habits, and active workouts like Zumba to build a comprehensive fitness profile that yields lifelong transformations.",
        aboutMission: "To deliver evidence-based, customized nutrition guidelines and support structures that enable clients to reach their optimal body weight, boost cardiorespiratory health, and make lifestyle shifts.",
        aboutVision: "To become a trusted community hub for total wellness, where physical movement, optimal cellular nutrition, and personal counseling converge to create vibrant, disease-free lifestyles.",
        aboutExperienceYears: 15
      };
    }

    res.status(200).json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve website configuration content',
      error: error.message
    });
  }
});

module.exports = router;
