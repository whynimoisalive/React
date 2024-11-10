import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Info, TreeDeciduous } from 'lucide-react';

// Educational components
const Formula = ({ children }) => (
  <div className="bg-gray-50 p-3 rounded-lg my-2 font-mono text-center">
    {children}
  </div>
);

const ConceptCard = ({ title, children }) => (
  <div className="bg-blue-50 p-4 rounded-lg my-3 border-l-4 border-blue-500">
    <div className="flex items-center gap-2 mb-2">
      <Info className="w-5 h-5 text-blue-500" />
      <h4 className="font-bold text-blue-800">{title}</h4>
    </div>
    <div className="text-gray-700">{children}</div>
  </div>
);

const DetailedMathCard = ({ title, children }) => (
  <div className="bg-purple-50 p-4 rounded-lg my-3 border-l-4 border-purple-500">
    <div className="flex items-center gap-2 mb-2">
      <TreeDeciduous className="w-5 h-5 text-purple-500" />
      <h4 className="font-bold text-purple-800">{title}</h4>
    </div>
    <div className="text-gray-700">{children}</div>
  </div>
);

const GradientBoostingViz = () => {
  const [iterations, setIterations] = useState(3);
  const [learningRate, setLearningRate] = useState(0.5);
  const [showMath, setShowMath] = useState(true);

  // Generate sample data for visualization
  const data = useMemo(() => {
    const baseError = 10;
    return Array.from({ length: 20 }, (_, i) => ({
      x: i,
      actual: Math.sin(i * 0.5) * 10 + 20,
      initial: Math.sin(i * 0.5) * 8 + 18,
      ...Array.from({ length: iterations }, (_, iter) => ({
        [`iter${iter + 1}`]: Math.sin(i * 0.5) * (10 - (baseError / Math.pow(2, iter + 1))) +
          20 - (baseError / Math.pow(2, iter + 1)) * learningRate
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
    }));
  }, [iterations, learningRate]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Understanding Gradient Boosting</span>
          <button
            onClick={() => setShowMath(!showMath)}
            className="text-sm bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200"
          >
            {showMath ? "Hide" : "Show"} Math
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ConceptCard title="What is a Weak Learner?">
          A weak learner is like a student who's just slightly better than random guessing - think scoring 60%
          on a test instead of 50%. In machine learning, we often use simple decision trees as weak learners.
          While they're not great on their own, when we combine many of them, they become very powerful - just
          like how a group of average students working together can solve complex problems!
        </ConceptCard>

        {showMath && (
          <div className="space-y-4 mb-6">
            <DetailedMathCard title="The Building Blocks 🔨">
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold">1. Initial Prediction (F₀)</h5>
                  <Formula>F₀(x) = average(y)</Formula>
                  <p className="text-sm mt-1">
                    We start with the simplest guess possible - the average of all target values.
                    For example, if predicting house prices, we'd start with the average house price.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold">2. Weak Learner Training</h5>
                  <Formula>
                    residual = y - F₀(x)
                    <br />
                    train_weak_learner(X, residual)
                  </Formula>
                  <p className="text-sm mt-1">
                    The weak learner (usually a small decision tree) tries to predict the mistakes
                    (residuals) from our previous guess. It's like having a friend point out where
                    you went wrong!
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold">3. Model Update (Fₘ)</h5>
                  <Formula>
                    Fₘ(x) = Fₘ₋₁(x) + η × hₘ(x)
                  </Formula>
                  <p className="text-sm mt-1">
                    Where:
                    <ul className="list-disc list-inside mt-1">
                      <li>Fₘ₋₁(x) is our previous prediction</li>
                      <li>η (eta) is the learning rate ({learningRate} in this demo)</li>
                      <li>hₘ(x) is what our weak learner predicted</li>
                    </ul>
                  </p>
                </div>
              </div>
            </DetailedMathCard>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Weak Learners: {iterations}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={iterations}
                onChange={(e) => setIterations(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-500">
                More weak learners = better combined prediction
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Learning Rate (η): {learningRate.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-500">
                How much we trust each weak learner's prediction
              </p>
            </div>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#2563eb"
                name="Actual Values"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="initial"
                stroke="#dc2626"
                name="Initial Prediction"
                strokeWidth={2}
                dot={false}
              />
              {Array.from({ length: iterations }, (_, i) => (
                <Line
                  key={i}
                  type="monotone"
                  dataKey={`iter${i + 1}`}
                  stroke={`hsl(${120 + (i * 30)}, 70%, 50%)`}
                  name={`Weak Learner ${i + 1}`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-bold text-yellow-800 mb-2">Understanding the Learning Process</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• Start with a simple average prediction (red line)</li>
            <li>• Each weak learner (green lines) tries to fix the remaining errors</li>
            <li>• The learning rate controls how much we trust each correction</li>
            <li>• Watch how we get closer to the true values (blue line) with each iteration!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradientBoostingViz;