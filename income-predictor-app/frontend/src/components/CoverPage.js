import React from 'react';
import { Link } from 'react-router-dom';

const CoverPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-center text-white p-8 rounded-lg shadow-lg max-w-2xl mx-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Income Prediction Tool</h1>
        <p className="text-lg md:text-xl mb-6">
          Discover whether your income is likely to exceed $50,000 using our AI-powered prediction model, built with XGBoost and trained on the Adult dataset.
        </p>
        <Link
          to="/predict"
          className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
        >
          Try the Predictor
        </Link>
      </div>
    </div>
  );
};

export default CoverPage;