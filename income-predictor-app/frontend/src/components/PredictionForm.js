import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    workclass: 'Private',
    education: 'HS-grad',
    marital_status: 'Never-married',
    occupation: 'Other-service',
    relationship: 'Not-in-family',
    race: 'White',
    sex: 'Male',
    hours_per_week: '',
    native_country: 'United-States'
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const educationToNum = {
    'Preschool': 1, '1st-4th': 2, '5th-6th': 3, '7th-8th': 4, '9th': 5,
    '10th': 6, '11th': 7, '12th': 8, 'HS-grad': 9, 'Some-college': 10,
    'Assoc-voc': 11, 'Assoc-acdm': 12, 'Bachelors': 13, 'Masters': 14,
    'Prof-school': 15, 'Doctorate': 16
  };

  const categoricalOptions = {
    education: Object.keys(educationToNum),
    workclass: [
      'Private', 'Self-emp-not-inc', 'Self-emp-inc', 'Federal-gov', 'Local-gov',
      'State-gov', 'Without-pay', 'Never-worked', '?'
    ],
    marital_status: [
      'Married-civ-spouse', 'Divorced', 'Never-married', 'Separated', 'Widowed',
      'Married-spouse-absent', 'Married-AF-spouse'
    ],
    occupation: [
      'Tech-support', 'Craft-repair', 'Other-service', 'Sales', 'Exec-managerial',
      'Prof-specialty', 'Handlers-cleaners', 'Machine-op-inspct', 'Adm-clerical',
      'Farming-fishing', 'Transport-moving', 'Priv-house-serv', 'Protective-serv',
      'Armed-Forces', '?'
    ],
    relationship: [
      'Wife', 'Own-child', 'Husband', 'Not-in-family', 'Other-relative', 'Unmarried'
    ],
    race: ['White', 'Asian-Pac-Islander', 'Amer-Indian-Eskimo', 'Other', 'Black'],
    sex: ['Male', 'Female'],
    native_country: [
      'United-States', 'Cambodia', 'England', 'Puerto-Rico', 'Canada', 'Germany',
      'Outlying-US(Guam-USVI-etc)', 'India', 'Japan', 'Greece', 'South', 'China',
      'Cuba', 'Iran', 'Honduras', 'Philippines', 'Italy', 'Poland', 'Jamaica',
      'Vietnam', 'Mexico', 'Portugal', 'Ireland', 'France', 'Dominican-Republic',
      'Laos', 'Ecuador', 'Taiwan', 'Haiti', 'Columbia', 'Hungary', 'Guatemala',
      'Nicaragua', 'Scotland', 'Thailand', 'Yugoslavia', 'El-Salvador',
      'Trinadad&Tobago', 'Peru', 'Hong', 'Holand-Netherlands', '?'
    ]
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const validateInputs = () => {
    const age = parseInt(formData.age);
    const hours_per_week = parseInt(formData.hours_per_week);
    if (!age || age < 17 || age > 90) return 'Age must be between 17 and 90';
    if (!hours_per_week || hours_per_week < 1 || hours_per_week > 99) return 'Hours per Week must be between 1 and 99';
    if (!formData.education || !educationToNum[formData.education]) return 'Please select a valid education level';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setLoading(true);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const submitData = {
      ...formData,
      education_num: educationToNum[formData.education],
      education: undefined
    };

    try {
      const response = await axios.post('http://localhost:5000/predict', submitData);
      setPrediction(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Income Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age (17-90)</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="17"
              max="90"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Workclass</label>
            <select
              name="workclass"
              value={formData.workclass}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categoricalOptions.workclass.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Education Level</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categoricalOptions.education.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categoricalOptions.marital_status.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categoricalOptions.occupation.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship</label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categoricalOptions.relationship.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Race</label>
            <select
              name="race"
              value={formData.race}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categoricalOptions.race.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categoricalOptions.sex.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hours per Week (1-99)</label>
            <input
              type="number"
              name="hours_per_week"
              value={formData.hours_per_week}
              onChange={handleChange}
              required
              min="1"
              max="99"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Native Country</label>
            <select
              name="native_country"
              value={formData.native_country}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categoricalOptions.native_country.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Predicting...' : 'Predict Income'}
          </button>
        </form>
        {prediction && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-green-600">Predicted Income: {prediction}</h3>
          </div>
        )}
        {error && (
          <div className="mt-6 text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;