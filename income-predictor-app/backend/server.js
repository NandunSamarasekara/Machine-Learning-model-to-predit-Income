const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Enable CORS for frontend (localhost:3000)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// POST endpoint for prediction
app.post('/predict', (req, res) => {
  const inputData = req.body;

  // Validate input
  if (!inputData || Object.keys(inputData).length === 0) {
    return res.status(400).json({ error: 'Invalid or empty input data' });
  }

  try {
    // Run Python script with input data
    const pythonProcess = spawn('python', ['predict.py', JSON.stringify(inputData)]);

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0 && stdoutData) {
        try {
          const result = JSON.parse(stdoutData);
          res.json(result); // Send prediction
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          res.status(500).json({ error: 'Failed to parse prediction result' });
        }
      } else {
        console.error('Python script error:', stderrData);
        res.status(500).json({ error: 'Prediction failed', details: stderrData });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error during prediction' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});