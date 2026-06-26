const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Blog = require('../models/Blog');
const Product = require('../models/Product');
const SuccessStory = require('../models/SuccessStory');
const About = require('../models/About');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('CRITICAL CONFIGURATION ERROR: MONGO_URI environment variable is not defined.');
  process.exit(1);
}

const sampleBlogs = [
  {
    title: "10 Simple Ways to Boost Your Metabolism Daily",
    category: "Nutrition & Metabolism",
    summary: "Discover actionable dietary tips and habits that can naturally elevate your metabolic rate and enhance fat burning throughout the day.",
    content: "Metabolism is the process by which your body converts what you eat and drink into energy. While genetics play a role, you can influence your metabolic rate through specific dietary choices and lifestyle changes. Here are 10 proven ways:\n\n1. Eat Plenty of Protein at Every Meal: Protein causes the largest rise in the thermic effect of food (TEF), increasing your metabolic rate by 15-30%.\n2. Drink More Cold Water: Drinking water can temporarily speed up your metabolism. Cold water is even better as your body uses energy to heat it to body temperature.\n3. Do a High-Intensity Workout: High-intensity interval training (HIIT) involves quick and very intense bursts of activity, helping you burn more fat.\n4. Lift Heavy Things: Muscle is more metabolically active than fat, and building muscle can help increase your metabolism.\n5. Stand Up More: Sitting too much is bad for your health. Standing up can burn more calories and boost metabolism.\n6. Drink Green Tea or Oolong Tea: These teas have been shown to increase metabolism by 4-5%.\n7. Eat Spicy Foods: Peppers contain capsaicin, a substance that can boost your metabolism and help you maintain a healthy weight.\n8. Get a Good Night's Sleep: Lack of sleep is linked to a major increase in the risk of obesity, partly due to negative effects on metabolism.\n9. Drink Coffee: Coffee can significantly increase metabolism and promote fat burning.\n10. Avoid Crash Diets: Eating too few calories slows down metabolism, making it harder to keep weight off in the long run.",
    author: "Counselor Preethi",
    readTime: "4 min read"
  },
  {
    title: "The Importance of Hydration in Weight Management",
    category: "Weight Loss",
    summary: "Learn why drinking enough water is a critical, yet often overlooked, component of successful weight loss and muscle recovery.",
    content: "Water is essential for life, and it plays a vital role in weight management. Many people confuse thirst with hunger, leading to overeating. Staying well-hydrated helps your body run efficiently and assists in burning fat. Here's why water is your best friend during weight loss:\n\n- It acts as a natural appetite suppressant. When the stomach senses that it is full, it sends signals to the brain to stop eating. Water can take up space in the stomach, leading to a feeling of fullness and reducing hunger.\n- It increases calorie burning. In a small study, people who drank 500ml of cold water increased their resting energy expenditure by 24-30% within 10 minutes of drinking.\n- It helps remove waste from the body. When the body is dehydrated, it cannot correctly remove waste (urine or feces), leading to bloating and water retention.\n- It is necessary to burn fat. Without water, the body cannot properly metabolize stored fat or carbohydrates. The process of metabolizing fat is called lipolysis. The first step of this process is hydrolysis, which occurs when water molecules interact with fats (triglycerides) to create glycerol and fatty acids.\n\nMake sure to drink at least 3-4 liters of water daily, especially if you are active or working out!",
    author: "Counselor Preethi",
    readTime: "5 min read"
  },
  {
    title: "Zumba Workouts vs Traditional Cardio: Which is Better?",
    category: "Fitness & Zumba",
    summary: "A detailed comparison between high-energy Zumba classes and traditional jogging or cycling workouts for calorie burn and heart health.",
    content: "When choosing a workout, the best option is always the one you enjoy and stick to. Traditional cardio, like running or cycling, is excellent, but Zumba offers unique benefits that make it a favorite for weight loss. Let's compare them:\n\n- Calorie Burn: A high-energy Zumba class can burn between 500 to 800 calories per hour, depending on your intensity. Traditional cardio like moderate jogging burns about 400-600 calories.\n- Full Body Workout: Zumba is both a dance and a fitness class. It moves your arms, legs, core, and glutes, offering a full-body toning effect, whereas running primarily uses the lower body.\n- Fun and Social: Zumba feels like a dance party. The upbeat Latin and international music makes the time fly by. Traditional cardio can sometimes feel monotonous.\n- Stress Relief: The rhythm and coordination required in Zumba distracts your mind from daily worries, making it an incredible stress buster.\n\nAt Preethi Nutrition Center, we combine both nutritional plans and active Zumba sessions to get the best of both worlds!",
    author: "Counselor Preethi",
    readTime: "6 min read"
  }
];

const sampleProducts = [
  {
    name: "Herbalife Formula 1 Nutritional Shake Mix",
    imageUrl: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",
    details: "A delicious and healthy meal replacement shake that provides an ideal balance of protein, fiber, vitamins, and minerals to support weight management and daily wellness.",
    buyLink: "https://www.herbalife.co.in/products/formula-1-nutritional-shake-mix-kulfi-500g/",
    price: 2100
  },
  {
    name: "Herbalife Personalized Protein Powder (Formula 3)",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop",
    details: "High-quality protein blend of soy and whey protein that helps build lean muscle mass, satisfies hunger, and keeps you feeling full longer.",
    buyLink: "https://www.herbalife.co.in/products/personalized-protein-powder-200g/",
    price: 1300
  },
  {
    name: "Herbalife Afresh Energy Drink Mix",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    details: "A refreshing energy drink mix infused with orange pekoe extract, green tea extract, and natural caffeine. Boosts energy, alertness, and metabolism.",
    buyLink: "https://www.herbalife.co.in/products/afresh-energy-drink-mix-ginger-50g/",
    price: 850
  }
];

const sampleSuccessStories = [
  {
    clientName: "Sneha Reddy",
    clientDetails: "Lost 18 kg in 6 months",
    beforeImageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    afterImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    testimonial: "Preethi Ma'am completely changed my life. I had struggle with thyroid issues for years and couldn't lose weight. Her custom diet plans and Zumba classes helped me lose 18 kg safely and keep it off!"
  },
  {
    clientName: "Rahul Sharma",
    clientDetails: "Lost 22 kg in 8 months",
    beforeImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    afterImageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    testimonial: "Being overweight was affecting my health and confidence. With the personalized Herbalife plans and support from Preethi Nutrition Center, I managed to lose 22 kg. My energy levels are at an all-time high!"
  }
];

const sampleAbout = {
  heroTitle: "Meet Counselor Preethi",
  heroSubtitle: "Certified Nutritionist, Zumba Trainer, & Wellness Coach",
  mainContent: "At Preethi Nutrition Center, we believe that health is not just about weight loss; it is about building a sustainable and vibrant lifestyle. With over 15 years of active counseling, we specialize in body transformations, personalized weight-management guides, active Zumba fitness workouts, and curated Herbalife supplement plans. Our approach is personalized, evidence-based, and focused on helping you build long-term healthy habits.",
  mission: "To empower individuals to take control of their health through holistic nutrition, active movement, and personalized coaching, creating a community of happier and healthier lives.",
  vision: "To be the leading wellness destination that inspires structural, sustainable physical and mental transformations across all generations.",
  experienceYears: 15
};

async function seedData() {
  try {
    const connStrLog = MONGO_URI.replace(/mongodb(\+srv)?:\/\/([^@]+)@/, 'mongodb$1://***:***@');
    console.log(`Connecting to MongoDB at: ${connStrLog}`);
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully for data seeding.');

    // Seed Blogs
    await Blog.deleteMany({});
    await Blog.insertMany(sampleBlogs);
    console.log('Sample blogs seeded successfully.');

    // Seed Products
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products seeded successfully.');

    // Seed Success Stories
    await SuccessStory.deleteMany({});
    await SuccessStory.insertMany(sampleSuccessStories);
    console.log('Sample success stories seeded successfully.');

    // Seed About Content
    await About.deleteMany({});
    await About.create(sampleAbout);
    console.log('Default About page content seeded successfully.');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
}

seedData();
