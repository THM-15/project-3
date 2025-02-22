import React from "react";
import { Container } from "react-bootstrap";
import SentimentAnalysis from "./components/SentimentAnalysis";
import HashtagClustering from "./components/HashtagClustering";
import EngagementPrediction from "./components/EngagementPrediction";

const App = () => {
return (
<Container className="mt-4">
<h2 className="text-center">D Social Media Analytics Dashboard</h2>
<SentimentAnalysis />
<HashtagClustering />
<EngagementPrediction />
</Container>
);
};
export default App;