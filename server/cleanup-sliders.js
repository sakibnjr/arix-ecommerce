import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Slider from './src/models/Slider.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arix';

async function cleanupSliders() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove link and buttonText fields from all sliders
    const result = await Slider.updateMany(
      {},
      { 
        $unset: { 
          link: "", 
          buttonText: "" 
        } 
      }
    );

    console.log(`Updated ${result.modifiedCount} slider documents`);
    
    // Verify the cleanup
    const sliders = await Slider.find({}).lean();
    console.log('\nUpdated sliders:');
    sliders.forEach(slider => {
      console.log(`- ${slider.title}: ${slider.description}`);
    });

    console.log('\nCleanup completed successfully!');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

cleanupSliders();
