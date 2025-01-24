const mongoose = require('mongoose');

const getConnection = async () => {
  try{
      mongoose.connect(process.env.MONGO_URI).then((connection)=>{
        console.log('Connected to MongoDB');
      })
      .catch((error)=>{
        console.error('Failed to connect to MongoDB:', error);
      })
  }
  catch(error){
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = getConnection
