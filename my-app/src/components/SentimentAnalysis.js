import React, { useState } from "react";
import axios from "axios";
import { Card, Row, Col, Form, Button, Spinner } from "react-bootstrap";

const SentimentAnalysis = () => {
    const [text, setText] = useState("");
    const [sentiment, setSentiment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const analyzeSentiment = async () => {
        setLoading(true);
        setError("");
        setSentiment("");

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict_sentiment", { text });
            setSentiment(response.data?.sentiment_label || "No sentiment detected");
        } catch {
            setError("Error analyzing sentiment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-3 mb-4">
            <h4>📢 Sentiment Analysis</h4>
            {error && <p className="text-danger">{error}</p>}
            <Row>
                <Col md={8}>
                    <Form.Control
                        type="text"
                        placeholder="Enter text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Button variant="primary" onClick={analyzeSentiment} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Analyze"}
                    </Button>
                </Col>
            </Row>
            {sentiment && <p className="mt-2"><strong>Sentiment:</strong> {sentiment}</p>}
        </Card>
    );
};

export default SentimentAnalysis;
