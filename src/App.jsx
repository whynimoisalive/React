import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Info, TreeDeciduous } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';
// Add these imports if not already present
import { ArrowRight, Database, Cpu, CheckCircle2, HelpCircle, RefreshCcw } from 'lucide-react';


// Helper component for mathematical formulas
const Formula = ({ children }) => (
  <div className="bg-blue-50 p-4 rounded-lg my-2 font-mono text-sm border-l-4 border-blue-500">
    {children}
  </div>
);

// Helper component for term definitions
const Definition = ({ term, children }) => (
  <div className="bg-green-50 p-3 rounded-lg my-2 border-l-4 border-green-500">
    <span className="font-bold text-green-700">{term}: </span>
    <span className="text-gray-700">{children}</span>
  </div>
);

// Helper component for educational tooltips
const EducationalTooltip = ({ children }) => (
  <div className="bg-white p-4 border rounded-lg shadow-lg max-w-sm">
    {children}
  </div>
);

const Explanation = ({ title, children, formula }) => (
  <div className="bg-blue-50 p-4 rounded-lg my-3 border-l-4 border-blue-500">
    <h4 className="font-bold text-blue-800 mb-2">{title}</h4>
    <div className="text-gray-700">{children}</div>
    {formula && <Formula>{formula}</Formula>}
  </div>
);

const Example = ({ title, children }) => (
  <div className="bg-green-50 p-3 rounded-lg my-2 border-l-4 border-green-500">
    <span className="font-bold text-green-700">{title}: </span>
    <span className="text-gray-700">{children}</span>
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

const Concept = ({ title, children }) => (
  <div className="bg-blue-50 p-4 rounded-lg my-3 border-l-4 border-blue-500">
    <h4 className="font-bold text-blue-800 mb-2">{title}</h4>
    <div className="text-gray-700">{children}</div>
  </div>
);

const LibraryDependencyViz = () => {
  const dependencies = {
    nodes: [
      {
        id: 'core',
        label: 'Core Machine Learning',
        count: 5,
        description: "Think of this as the brain of our system! It contains the main programs that help computers learn from data. Just like how you learn patterns from studying, these programs learn patterns from numbers and information.",
        examples: "Examples: Programs that predict house prices, identify spam emails, or recommend movies you might like."
      },
      {
        id: 'preprocessing',
        label: 'Data Preprocessing',
        count: 3,
        description: "Before a computer can learn, we need to clean and organize our data - just like how you'd organize your study notes before an exam. This part handles all the cleaning and organizing work.",
        examples: "Examples: Fixing missing information, converting text to numbers, making sure all numbers are on the same scale."
      },
      {
        id: 'visualization',
        label: 'Data Visualization',
        count: 2,
        description: "This helps us create pictures and graphs from our data. It's like turning a spreadsheet full of numbers into charts that are easy to understand.",
        examples: "Examples: Creating bar charts, line graphs, or pie charts to show patterns in data."
      },
      {
        id: 'metrics',
        label: 'Performance Metrics',
        count: 4,
        description: "These are like test scores for our computer programs. They tell us how well our machine learning models are performing at their tasks.",
        examples: "Examples: Accuracy scores, error rates, prediction precision."
      },
      {
        id: 'ensemble',
        label: 'Ensemble Methods',
        count: 3,
        description: "This is like getting opinions from multiple experts and combining them. Instead of using just one program to make predictions, we use several and combine their answers.",
        examples: "Examples: Random Forests, Voting Systems, Multiple Model Combinations."
      }
    ]
  };

  return (
    <Card className="w-full max-w-4xl mb-8">
      <CardHeader>
        <CardTitle>Understanding Machine Learning Components</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">What are we looking at?</h3>
          <p className="text-gray-700 mb-4">
            Imagine building a robot that can learn. Just like how your brain has different parts for memory, thinking, and learning,
            our machine learning system has different parts too. Let's explore each part!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {dependencies.nodes.map((node) => (
            <div
              key={node.id}
              className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-xl text-blue-800 mb-2">{node.label}</h3>
              <p className="text-gray-600 mb-3">{node.description}</p>
              <p className="text-gray-700 italic">{node.examples}</p>
              <div className="mt-2 bg-blue-50 p-2 rounded">
                <span className="font-semibold">Number of Tools: </span>
                {node.count}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const DataAnalysisViz = () => {
  const [selectedMetric, setSelectedMetric] = useState('missing');
  const dataMetrics = [
    {
      column: 'Age',
      missing: 12,
      unique: 45,
      dtype: 'number',
      description: "This is like when some students don't write their age on a form",
      example: "Missing value example: Age = ___ (left blank)",
      importance: "We need age to understand if our data represents different age groups fairly"
    },
    {
      column: 'Favorite Color',
      missing: 8,
      unique: 23,
      dtype: 'text',
      description: "When students skip the favorite color question",
      example: "Missing value example: Color = (no answer)",
      importance: "Helps us understand color preferences in our data"
    },
    {
      column: 'Grade Score',
      missing: 15,
      unique: 67,
      dtype: 'number',
      description: "Test scores that weren't recorded",
      example: "Missing value example: Score = Not Recorded",
      importance: "Important for calculating average class performance"
    },
    {
      column: 'Study Hours',
      missing: 5,
      unique: 12,
      dtype: 'number',
      description: "When students forget to log their study hours",
      example: "Missing value example: Hours = ???",
      importance: "Helps us understand study patterns"
    }
  ];

  return (
    <Card className="w-full max-w-4xl mb-8">
      <CardHeader>
        <CardTitle>Understanding Data Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">What's Data Quality?</h3>
          <p className="text-gray-700 mb-4">
            Imagine you're collecting responses from a school survey. Sometimes students skip questions (missing data)
            or give unique answers. Let's see how we can understand this!
          </p>

          <Definition term="Missing Values">
            These are like blank answers on a survey. When someone skips a question, we have a missing value.
          </Definition>

          <Definition term="Unique Values">
            These are like different possible answers. If you ask 100 students their favorite color and get 23 different colors,
            that's 23 unique values!
          </Definition>

          <Formula>
            Missing Data Percentage = (Number of Missing Values ÷ Total Number of Responses) × 100
          </Formula>

          <Formula>
            Unique Value Percentage = (Number of Different Answers ÷ Total Number of Responses) × 100
          </Formula>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">What do you want to explore?</label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="p-2 border rounded-md shadow-sm w-full max-w-xs"
          >
            <option value="missing">Missing Answers</option>
            <option value="unique">Different Types of Answers</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <BarChart width={600} height={400} data={dataMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="column" />
            <YAxis />
            <Tooltip content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <EducationalTooltip>
                    <h4 className="font-bold mb-2">{data.column}</h4>
                    <p className="mb-2">{data.description}</p>
                    <p className="mb-2 italic">{data.example}</p>
                    <p className="text-sm text-gray-600">{data.importance}</p>
                  </EducationalTooltip>
                );
              }
              return null;
            }} />
            <Bar
              dataKey={selectedMetric}
              fill="#60a5fa"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
};

const FeatureEngineeringViz = () => {
  const [selectedFeature, setSelectedFeature] = useState('age_groups');

  const features = {
    age_groups: {
      title: "Age Grouping",
      description: "Converting exact ages into meaningful groups",
      original: [25, 32, 18, 45, 60, 28, 19],
      transformed: ["Young Adult", "Adult", "Young Adult", "Middle Age", "Senior", "Young Adult", "Young Adult"],
      explanation: "Instead of using exact ages, we group them into categories that make more sense for our analysis."
    },
    income_brackets: {
      title: "Income Brackets",
      description: "Converting income into meaningful ranges",
      original: [35000, 72000, 48000, 120000, 65000],
      transformed: ["Low", "Medium", "Low", "High", "Medium"],
      explanation: "Rather than exact income numbers, we use brackets to better understand income levels."
    },
    time_features: {
      title: "Time Features",
      description: "Extracting useful information from dates",
      original: ["2024-01-15", "2024-06-30", "2024-12-25"],
      transformed: ["Winter", "Summer", "Winter"],
      explanation: "We can extract seasons, days of week, or other time-based features from dates."
    }
  };

  return (
    <Card className="w-full max-w-4xl mb-8">
      <CardHeader>
        <CardTitle>Feature Engineering Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">What is Feature Engineering?</h3>
          <p className="text-gray-700 mb-4">
            Feature engineering is like being a detective with data! We take raw information and transform it into more meaningful features
            that help our machine learning models understand patterns better.
          </p>

          <div className="bg-green-50 p-3 rounded-lg my-2 border-l-4 border-green-500">
            <span className="font-bold text-green-700">Feature: </span>
            <span className="text-gray-700">A characteristic or piece of information we use to make predictions. Like using temperature, humidity, and wind speed to predict weather.</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Select Feature Type:</label>
          <select
            value={selectedFeature}
            onChange={(e) => setSelectedFeature(e.target.value)}
            className="p-2 border rounded-md shadow-sm w-full max-w-xs"
          >
            <option value="age_groups">Age Grouping</option>
            <option value="income_brackets">Income Brackets</option>
            <option value="time_features">Time Features</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="font-bold text-xl mb-4">{features[selectedFeature].title}</h4>
          <p className="text-gray-600 mb-4">{features[selectedFeature].description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Original Data:</h5>
              <pre className="text-sm">{JSON.stringify(features[selectedFeature].original, null, 2)}</pre>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Transformed Data:</h5>
              <pre className="text-sm">{JSON.stringify(features[selectedFeature].transformed, null, 2)}</pre>
            </div>
          </div>

          <p className="mt-4 text-gray-700 italic">{features[selectedFeature].explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const TargetEncoderViz = () => {
  const [selectedExample, setSelectedExample] = useState('categorical');

  const examples = {
    categorical: {
      title: "Categorical Encoding",
      description: "Converting text categories into numbers",
      original: ["Red", "Blue", "Green", "Red", "Blue"],
      encoded: [0, 1, 2, 0, 1],
      explanation: "We assign a unique number to each category to help our model understand the data."
    },
    ordinal: {
      title: "Ordinal Encoding",
      description: "Converting ordered categories into numbers",
      original: ["Beginner", "Expert", "Intermediate", "Beginner"],
      encoded: [0, 2, 1, 0],
      explanation: "We maintain the natural order of categories when converting to numbers."
    },
    binary: {
      title: "Binary Encoding",
      description: "Converting yes/no answers into 1s and 0s",
      original: ["Yes", "No", "Yes", "Yes", "No"],
      encoded: [1, 0, 1, 1, 0],
      explanation: "Simple conversion of binary categories into numerical values."
    }
  };

  return (
    <Card className="w-full max-w-4xl mb-8">
      <CardHeader>
        <CardTitle>Target Encoding Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">What is Target Encoding?</h3>
          <p className="text-gray-700 mb-4">
            Target encoding is like creating a dictionary that helps our computer understand different types of information.
            We convert text and categories into numbers that our models can work with.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Select Encoding Type:</label>
          <select
            value={selectedExample}
            onChange={(e) => setSelectedExample(e.target.value)}
            className="p-2 border rounded-md shadow-sm w-full max-w-xs"
          >
            <option value="categorical">Categorical</option>
            <option value="ordinal">Ordinal</option>
            <option value="binary">Binary</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="font-bold text-xl mb-4">{examples[selectedExample].title}</h4>
          <p className="text-gray-600 mb-4">{examples[selectedExample].description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Original Data:</h5>
              <pre className="text-sm">{JSON.stringify(examples[selectedExample].original, null, 2)}</pre>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Encoded Data:</h5>
              <pre className="text-sm">{JSON.stringify(examples[selectedExample].encoded, null, 2)}</pre>
            </div>
          </div>

          <p className="mt-4 text-gray-700 italic">{examples[selectedExample].explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const PipelineFlowViz = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const pipelineSteps = [
    {
      title: "Data Collection",
      description: "Gathering raw data from various sources",
      example: {
        input: "Multiple data sources (CSV files, databases, APIs)",
        output: "Combined raw dataset"
      },
      tips: "Always document your data sources and collection methods!"
    },
    {
      title: "Data Cleaning",
      description: "Handling missing values and removing duplicates",
      example: {
        input: "Dataset with missing values and duplicates",
        output: "Clean dataset ready for processing"
      },
      tips: "Keep track of how many records were modified or removed"
    },
    {
      title: "Feature Engineering",
      description: "Creating new features and transforming existing ones",
      example: {
        input: "Clean basic features",
        output: "Enhanced feature set"
      },
      tips: "Think about what information would help make better predictions"
    },
    {
      title: "Model Training",
      description: "Training the machine learning model",
      example: {
        input: "Processed features and target variable",
        output: "Trained model ready for predictions"
      },
      tips: "Always split your data into training and testing sets"
    },
    {
      title: "Model Evaluation",
      description: "Assessing model performance",
      example: {
        input: "Model predictions on test data",
        output: "Performance metrics and insights"
      },
      tips: "Use multiple metrics to evaluate your model thoroughly"
    }
  ];

  return (
    <Card className="w-full max-w-4xl mb-8">
      <CardHeader>
        <CardTitle>ML Pipeline Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">What is a Machine Learning Pipeline?</h3>
          <p className="text-gray-700 mb-4">
            A machine learning pipeline is like a recipe that takes raw data and transforms it into useful predictions.
            Each step in the pipeline has a specific job to do!
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            {pipelineSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`px-4 py-2 rounded-lg transition-all ${currentStep === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                Step {index + 1}
              </button>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-bold text-xl mb-4">{pipelineSteps[currentStep].title}</h4>
            <p className="text-gray-600 mb-4">{pipelineSteps[currentStep].description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-bold mb-2">Input:</h5>
                <p className="text-gray-700">{pipelineSteps[currentStep].example.input}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-bold mb-2">Output:</h5>
                <p className="text-gray-700">{pipelineSteps[currentStep].example.output}</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-bold mb-2">Pro Tips:</h5>
              <p className="text-gray-700">{pipelineSteps[currentStep].tips}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            Previous Step
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(pipelineSteps.length - 1, currentStep + 1))}
            disabled={currentStep === pipelineSteps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            Next Step
          </button>
        </div>
      </CardContent>
    </Card>
  );
};


const RandomForestViz = () => {
  // State management for visualization controls
  const [treeDepth, setTreeDepth] = useState(3);
  const [showExplanations, setShowExplanations] = useState(true);
  const [numberOfTrees, setNumberOfTrees] = useState(3);

  // Calculate Gini impurity for node splits
  const calculateGiniImpurity = (yes, no) => {
    const total = yes + no;
    if (total === 0) return 0;
    const pYes = yes / total;
    const pNo = no / total;
    return 1 - (pYes * pYes + pNo * pNo);
  };

  // Generate tree data with enhanced metrics
  const treeData = useMemo(() => {
    const nodes = Array.from({ length: Math.pow(2, treeDepth) - 1 }, (_, i) => {
      const level = Math.floor(Math.log2(i + 1));
      const yesCount = Math.floor(Math.random() * 50) + 25;
      const noCount = Math.floor(Math.random() * 50) + 25;
      const totalSamples = yesCount + noCount;

      return {
        id: i,
        level,
        // Information gain calculation
        entropyBefore: -(yesCount / totalSamples * Math.log2(yesCount / totalSamples) +
          noCount / totalSamples * Math.log2(noCount / totalSamples)),
        giniImpurity: calculateGiniImpurity(yesCount, noCount),
        confidence: (Math.max(yesCount, noCount) / totalSamples).toFixed(2),
        samples: totalSamples,
        feature: ['Age', 'Income', 'Education', 'Experience'][Math.floor(Math.random() * 4)],
        decision: yesCount > noCount ? 'Yes' : 'No',
        yesCount,
        noCount
      };
    });
    return { nodes };
  }, [treeDepth]);

  return (
    <Card className="w-full max-w-4xl mb-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Random Forest: Advanced Decision Tree Analysis</span>
          <button
            onClick={() => setShowExplanations(!showExplanations)}
            className="text-sm bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200"
          >
            {showExplanations ? "Hide" : "Show"} Explanations
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showExplanations && (
          <div className="mb-6 space-y-4">
            <Explanation
              title="Mathematical Foundation of Random Forests"
              formula="Gini Impurity = 1 - Σ(pi²) where pi is the probability of class i"
            >
              Random Forests use ensemble learning through bagging (Bootstrap Aggregating):
              1. Each tree sees a random subset of data (bootstrap sample)
              2. At each node, only a random subset of features is considered
              3. Final prediction uses majority voting: P(class) = 1/N * Σ(predictions)"
            </Explanation>

            <Explanation
              title="Information Gain and Split Quality"
              formula="Information Gain = Entropy(parent) - Σ(wi * Entropy(child_i))"
            >
              Each split in the tree is chosen to maximize information gain:
              • Entropy measures the uncertainty in the data
              • Gini impurity is an alternative to entropy
              • Lower values indicate better splits
            </Explanation>

            <div className="grid grid-cols-2 gap-4 bg-purple-50 p-4 rounded-lg">
              <div>
                <h4 className="font-bold text-purple-800 mb-2">Tree Metrics:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Depth: Controls model complexity</li>
                  <li>Gini: Measures node purity</li>
                  <li>Samples: Data points at node</li>
                  <li>Confidence: Prediction strength</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-purple-800 mb-2">Ensemble Properties:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Variance ↓ with more trees</li>
                  <li>Bias ↑ with less depth</li>
                  <li>Robustness ↑ with diversity</li>
                  <li>Accuracy ↑ with balance</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tree Depth: {treeDepth} (Complexity vs. Overfitting)
            </label>
            <input
              type="range"
              min="2"
              max="4"
              value={treeDepth}
              onChange={(e) => setTreeDepth(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of Trees: {numberOfTrees} (Ensemble Size)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={numberOfTrees}
              onChange={(e) => setNumberOfTrees(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {Array.from({ length: treeDepth }).map((_, level) => (
            <div
              key={level}
              className="flex justify-center gap-4"
              style={{
                marginLeft: `${level * 20}px`
              }}
            >
              {treeData.nodes
                .filter(node => node.level === level)
                .map(node => (
                  <div
                    key={node.id}
                    className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-sm font-medium mb-1">Feature: {node.feature}</div>
                    <div className="text-xs text-gray-500">
                      Gini: {node.giniImpurity.toFixed(3)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Samples: {node.samples} (Y:{node.yesCount}/N:{node.noCount})
                    </div>
                    <div className="text-xs text-gray-500">
                      Confidence: {node.confidence}
                    </div>
                    <div className={`text-xs mt-1 px-2 py-1 rounded ${node.decision === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      Decision: {node.decision}
                    </div>
                  </div>
                ))
              }
            </div>
          ))}
        </div>

        {showExplanations && (
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-2">Understanding the Metrics:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Gini Impurity</strong>: Measures node purity (0 = pure, 0.5 = maximum impurity)</li>
              <li>• <strong>Samples</strong>: Total data points reaching this node (Y/N shows class distribution)</li>
              <li>• <strong>Confidence</strong>: Proportion of majority class (higher = more certain)</li>
              <li>• <strong>Feature</strong>: Variable used for splitting at this node</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

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

// Educational components
const FormulaCard = ({ title, formula, explanation }) => (
  <div className="bg-purple-50 p-4 rounded-lg my-2">
    <h4 className="font-bold text-purple-800">{title}</h4>
    <div className="bg-white p-2 rounded my-1 font-mono text-sm">{formula}</div>
    <p className="text-gray-700 text-sm">{explanation}</p>
  </div>
);

const MetricCard = ({ title, value, explanation, goodRange }) => (
  <div className="bg-blue-50 p-4 rounded-lg">
    <h4 className="font-bold text-blue-800">{title}</h4>
    <div className="text-2xl font-bold my-2">{value}%</div>
    <p className="text-sm text-gray-700">{explanation}</p>
    <p className="text-sm text-green-600 mt-1">Good range: {goodRange}</p>
  </div>
);

const ModelMetricsEducational = () => {
  // Sample training history data
  const [trainingHistory] = useState([
    { epoch: 1, accuracy: 75, validation: 73 },
    { epoch: 2, accuracy: 82, validation: 79 },
    { epoch: 3, accuracy: 86, validation: 82 },
    { epoch: 4, accuracy: 89, validation: 84 },
    { epoch: 5, accuracy: 91, validation: 85 },
  ]);

  // Sample metrics
  const [metrics] = useState({
    accuracy: 87.5,
    precision: 86.2,
    recall: 84.8,
    f1Score: 85.5
  });

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Understanding Model Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Educational Introduction */}
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-green-800 mb-2">👋 Hey there!</h3>
          <p className="text-gray-700">
            Welcome to Model Metrics! Think of these numbers like your test scores in school,
            but for our AI model. They help us know how well our model is learning and where
            it might need some extra study time. Let's break down each metric!
          </p>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <MetricCard
            title="Accuracy"
            value={metrics.accuracy}
            explanation="How often our model gets the right answer. Like getting 87 out of 100 questions correct on a test!"
            goodRange="Above 80%"
          />
          <MetricCard
            title="Precision"
            value={metrics.precision}
            explanation="When our model says 'Yes', how often is it really 'Yes'? Like how many times you correctly predicted it would rain."
            goodRange="Above 85%"
          />
          <MetricCard
            title="Recall"
            value={metrics.recall}
            explanation="Out of all the actual 'Yes' cases, how many did we catch? Like finding all the spelling mistakes in an essay."
            goodRange="Above 80%"
          />
          <MetricCard
            title="F1 Score"
            value={metrics.f1Score}
            explanation="A balanced score between Precision and Recall. Like getting a combined score for both your homework and tests!"
            goodRange="Above 85%"
          />
        </div>

        {/* Mathematical Formulas Section */}
        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-lg">The Math Behind the Magic 🔢</h3>

          <FormulaCard
            title="Accuracy"
            formula="Accuracy = (True Positives + True Negatives) / Total Predictions × 100"
            explanation="Add up all the correct predictions (both Yes and No), then divide by total predictions. Like calculating your test percentage!"
          />

          <FormulaCard
            title="Precision"
            formula="Precision = True Positives / (True Positives + False Positives) × 100"
            explanation="Out of all the times we predicted Yes, how many were actually Yes? Helps avoid false alarms!"
          />

          <FormulaCard
            title="Recall"
            formula="Recall = True Positives / (True Positives + False Negatives) × 100"
            explanation="Out of all the actual Yes cases, how many did we catch? Helps us not miss important things!"
          />

          <FormulaCard
            title="F1 Score"
            formula="F1 Score = 2 × (Precision × Recall) / (Precision + Recall)"
            explanation="A special average that balances Precision and Recall. It's like getting a final grade that considers both your quiz and exam scores!"
          />
        </div>

        {/* Training Progress Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold mb-4">Learning Progress 📈</h3>
          <LineChart
            width={600}
            height={300}
            data={trainingHistory}
            margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" label={{ value: 'Training Rounds', position: 'bottom' }} />
            <YAxis label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                marginTop: '20px'
              }}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#8884d8"
              name="Training Score"
            />
            <Line
              type="monotone"
              dataKey="validation"
              stroke="#82ca9d"
              name="Test Score"
            />
          </LineChart>
          <div className="mt-4 text-sm text-gray-600">
            <p>This chart shows how our model improves over time:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Blue line: How well it's doing on practice data</li>
              <li>Green line: How well it's doing on new, unseen data</li>
              <li>The closer these lines are, the better our model is at generalizing!</li>
            </ul>
          </div>
        </div>

        {/* Common Questions */}
        <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2">❓ Common Questions</h3>
          <div className="space-y-2">
            <details className="cursor-pointer">
              <summary className="font-medium">What's a good accuracy score?</summary>
              <p className="mt-2 text-gray-700 pl-4">
                It depends on your problem! For most cases, above 80% is good.
                But sometimes even 60% can be great if the problem is really hard!
              </p>
            </details>
            <details className="cursor-pointer">
              <summary className="font-medium">Why do we need so many metrics?</summary>
              <p className="mt-2 text-gray-700 pl-4">
                Different metrics catch different types of mistakes. It's like having
                multiple teachers grade your work - each one might notice different things!
              </p>
            </details>
            <details className="cursor-pointer">
              <summary className="font-medium">What's overfitting?</summary>
              <p className="mt-2 text-gray-700 pl-4">
                It's when your model memorizes the training data instead of learning
                general patterns. Like memorizing test answers without understanding the subject!
              </p>
            </details>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


const EnsembleVotingEducational = () => {
  // Sample predictions from different models
  const [models] = useState([
    { name: 'Random Forest', weight: 0.4 },
    { name: 'Neural Network', weight: 0.35 },
    { name: 'Decision Tree', weight: 0.25 }
  ]);

  const [sampleData] = useState([
    { actual: 1, label: 'Cat' },
    { actual: 0, label: 'Dog' },
    { actual: 1, label: 'Cat' }
  ]);

  // Generate random predictions for demonstration
  const predictions = useMemo(() => {
    return sampleData.map((item, index) => {
      const modelPredictions = models.map(model => ({
        model: model.name,
        prediction: Math.random() > 0.5 ? 1 : 0,
        confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
        weight: model.weight
      }));

      // Calculate weighted ensemble prediction
      const weightedSum = modelPredictions.reduce((sum, pred) => {
        return sum + (pred.prediction * pred.confidence * pred.weight);
      }, 0);

      const totalWeight = models.reduce((sum, model) => sum + model.weight, 0);
      const finalPrediction = weightedSum / totalWeight > 0.5 ? 1 : 0;

      return {
        id: index,
        actual: item.actual,
        label: item.label,
        predictions: modelPredictions,
        ensemblePrediction: finalPrediction
      };
    });
  }, [models, sampleData]);

  // Data for visualization
  const chartData = models.map(model => ({
    name: model.name,
    weight: model.weight * 100,
    accuracy: (predictions.filter(p =>
      p.predictions.find(pred => pred.model === model.name).prediction === p.actual
    ).length / predictions.length * 100).toFixed(1)
  }));

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Understanding Ensemble Voting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Concept title="What is Ensemble Voting?">
          Imagine you're trying to make a difficult decision and you ask several smart friends for advice.
          Each friend (model) has different expertise and confidence in their answer. Ensemble voting is like
          taking all their opinions and combining them smartly to make the best decision!
        </Concept>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mathematical Formula</h3>
          <Formula>
            Final Prediction = {
              `{
                ∑(model_prediction * confidence * weight)
                ──────────────────────────────────────
                ∑(weights)
              }`
            }
          </Formula>

          <div className="text-sm text-gray-600 space-y-2">
            <p>Where:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>model_prediction = Binary prediction (0 or 1)</li>
              <li>confidence = How sure the model is (0.0 to 1.0)</li>
              <li>weight = How much we trust this model (0.0 to 1.0)</li>
            </ul>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Model Weights & Accuracy</h3>
          <BarChart width={600} height={300} data={chartData} className="mx-auto">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="weight" fill="#8884d8" name="Model Weight (%)" />
            <Bar dataKey="accuracy" fill="#82ca9d" name="Accuracy (%)" />
          </BarChart>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Predictions Breakdown</h3>
          <div className="grid gap-4">
            {predictions.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between mb-3">
                  <span className="font-medium">Sample {index + 1}: {item.label}</span>
                  <span className={`px-2 py-1 rounded ${item.ensemblePrediction === item.actual
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                    }`}>
                    {item.ensemblePrediction === item.actual ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <div className="space-y-2">
                  {item.predictions.map((pred, pIndex) => (
                    <div key={pIndex} className="flex justify-between items-center text-sm">
                      <span>{pred.model}</span>
                      <div className="flex items-center gap-4">
                        <span>Prediction: {pred.prediction}</span>
                        <span>Confidence: {pred.confidence}</span>
                        <span>Weight: {pred.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-yellow-600 mt-1" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold">Important Concepts:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Higher weight = We trust this model more</li>
              <li>Higher confidence = Model is more sure about its prediction</li>
              <li>We combine weights and confidence to get the final answer</li>
              <li>Even if one model is wrong, the ensemble can still be right!</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StageCard = ({ icon: Icon, title, description, isActive, details, onClick }) => (
  <div
    className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-blue-300 ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      }`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3 mb-2">
      <Icon className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
      <h3 className={`font-bold ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>{title}</h3>
    </div>
    <p className="text-sm text-gray-600 mb-2">{description}</p>
    {isActive && details && (
      <div className="mt-2 text-sm text-gray-700 bg-white p-3 rounded border border-blue-200">
        {details}
      </div>
    )}
  </div>
);

const Formulas = ({ title, formula, explanation }) => (
  <div className="bg-purple-50 p-4 rounded-lg my-3">
    <h4 className="font-bold text-purple-800 mb-2">{title}</h4>
    <div className="bg-white p-3 rounded font-mono text-center text-lg">
      {formula}
    </div>
    <p className="mt-2 text-sm text-gray-600">{explanation}</p>
  </div>
);

const FAQ = ({ question, answer }) => (
  <div className="border-b border-gray-200 py-3">
    <div className="flex items-start gap-2">
      <HelpCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-bold text-gray-800 mb-1">{question}</h4>
        <p className="text-gray-600 text-sm">{answer}</p>
      </div>
    </div>
  </div>
);

const ControlPanel = ({ onGenerateNewData, onReset }) => (
  <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
    <button
      onClick={onGenerateNewData}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      <RefreshCcw className="w-4 h-4" />
      Generate New Data
    </button>
    <button
      onClick={onReset}
      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
    >
      <ArrowRight className="w-4 h-4" />
      Reset Pipeline
    </button>
  </div>
);

const DataTable = ({ data, title }) => (
  <div className="mt-4 bg-white p-4 rounded-lg border">
    <h4 className="font-bold text-gray-700 mb-3">{title}</h4>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {data && data.length > 0 && Object.keys(data[0]).map(key => (
              <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((row, i) => (
            <tr key={i} className="border-t">
              {Object.values(row).map((value, j) => (
                <td key={j} className="px-4 py-2 text-sm text-gray-800">
                  {typeof value === 'number' ? value.toFixed(3) : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PredictionPipelineViz = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showFAQ, setShowFAQ] = useState(true);
  const [sampleData, setSampleData] = useState(null);
  const [normalizedData, setNormalizedData] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Generate sample data
  const generateSampleData = () => {
    const newData = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      age: Math.floor(Math.random() * 50) + 20,
      income: Math.floor(Math.random() * 100000) + 30000,
      credit_score: Math.floor(Math.random() * 300) + 500,
    }));
    setSampleData(newData);
    setNormalizedData(null);
    setPrediction(null);
    return newData;
  };

  // Normalize data
  const normalizeData = (data) => {
    const minMax = {};
    Object.keys(data[0]).forEach(key => {
      if (key !== 'id') {
        minMax[key] = {
          min: Math.min(...data.map(d => d[key])),
          max: Math.max(...data.map(d => d[key]))
        };
      }
    });

    return data.map(row => {
      const normalized = { id: row.id };
      Object.keys(row).forEach(key => {
        if (key !== 'id') {
          normalized[key] = (row[key] - minMax[key].min) /
            (minMax[key].max - minMax[key].min);
        }
      });
      return normalized;
    });
  };

  // Make prediction
  const makePrediction = (normalizedData) => {
    return normalizedData.map(row => ({
      ...row,
      prediction: (row.age * 0.3 + row.income * 0.4 + row.credit_score * 0.3) > 0.5 ?
        'Approved' : 'Declined',
      confidence: ((row.age * 0.3 + row.income * 0.4 + row.credit_score * 0.3) * 100).toFixed(1) + '%'
    }));
  };

  // Handle stage selection
  const handleStageSelect = (stageIndex) => {
    if (stageIndex === 0) {
      if (!sampleData) {
        generateSampleData();
      }
    } else if (stageIndex === 1) {
      if (sampleData && !normalizedData) {
        setNormalizedData(normalizeData(sampleData));
      }
    } else if (stageIndex === 2) {
      if (normalizedData && !prediction) {
        setPrediction(makePrediction(normalizedData));
      }
    }
    setCurrentStage(stageIndex);
  };

  // Reset pipeline
  const resetPipeline = () => {
    setSampleData(null);
    setNormalizedData(null);
    setPrediction(null);
    setCurrentStage(0);
  };

  const stages = [
    {
      icon: Database,
      title: "1. Data Input",
      description: "Raw data enters the pipeline",
      details: (
        <div>
          <p className="mb-2">Our input features:</p>
          <ul className="list-disc list-inside">
            <li>Age (20-70 years)</li>
            <li>Income ($30,000-$130,000)</li>
            <li>Credit Score (500-800)</li>
          </ul>
        </div>
      )
    },
    {
      icon: Cpu,
      title: "2. Data Preprocessing",
      description: "Normalize data to standard scale",
      details: (
        <Formulas
          title="Min-Max Normalization"
          formula="X_norm = (X - X_min) / (X_max - X_min)"
          explanation="Scales each feature to range [0,1] for fair comparison"
        />
      )
    },
    {
      icon: CheckCircle2,
      title: "3. Make Prediction",
      description: "Generate final predictions",
      details: (
        <div>
          <Formulas
            title="Prediction Score"
            formula="score = 0.3×age + 0.4×income + 0.3×credit"
            explanation="Weighted combination of normalized features determines approval"
          />
          <div className="mt-2 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Score  ≥ 0.5: Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Score ≤ 0.5: Declined</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Interactive ML Prediction Pipeline</span>
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="text-sm bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200"
          >
            {showFAQ ? "Hide" : "Show"} FAQ
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ControlPanel
          onGenerateNewData={generateSampleData}
          onReset={resetPipeline}
        />

        {/* Pipeline Stages */}
        <div className="grid gap-4 mb-6">
          {stages.map((stage, index) => (
            <StageCard
              key={index}
              {...stage}
              isActive={currentStage === index}
              onClick={() => handleStageSelect(index)}
            />
          ))}
        </div>

        {/* Data Display */}
        {sampleData && (
          <DataTable
            data={sampleData}
            title="Raw Data"
          />
        )}

        {normalizedData && currentStage >= 1 && (
          <DataTable
            data={normalizedData}
            title="Normalized Data"
          />
        )}

        {prediction && currentStage >= 2 && (
          <DataTable
            data={prediction}
            title="Predictions"
          />
        )}

        {/* FAQ Section */}
        {showFAQ && (
          <div className="space-y-4 mt-6">
            <h3 className="font-bold text-lg">Frequently Asked Questions</h3>
            <FAQ
              question="Why do we normalize the data?"
              answer="Normalization ensures all features contribute fairly to the prediction, regardless of their original scales. For example, income (thousands) and age (years) become comparable when normalized to [0,1]."
            />
            <FAQ
              question="How are the feature weights (0.3, 0.4, 0.3) determined?"
              answer="In this demo, weights are pre-set based on assumed feature importance. In real ML systems, these weights would be learned during model training using techniques like gradient descent."
            />
            <FAQ
              question="What happens with outliers in the data?"
              answer="Min-max normalization is sensitive to outliers. In real applications, we might use robust scaling or handle outliers before normalization. This demo uses simple min-max scaling for educational purposes."
            />
            <FAQ
              question="Can this pipeline handle different types of data?"
              answer="This demo uses numerical data, but real pipelines can handle categorical data (via one-hot encoding), text (via tokenization), and other data types with appropriate preprocessing steps."
            />
            <FAQ
              question="How accurate is this prediction model?"
              answer="This is a simplified demo model using weighted averaging. Real ML models would use more sophisticated algorithms (like Random Forests or Neural Networks) and would be evaluated on metrics like accuracy, precision, and recall."
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const MLVisualizations = () => {
  return (
    <div className="space-y-8 p-4">
      <LibraryDependencyViz />
      <DataAnalysisViz />
      <FeatureEngineeringViz />
      <TargetEncoderViz />
      <PipelineFlowViz />
      <RandomForestViz />
      <GradientBoostingViz />
      <ModelMetricsEducational />
      <EnsembleVotingEducational />
      <PredictionPipelineViz />

    </div>
  );
};

export default MLVisualizations;