import React, { useState } from "react";
import axios from "axios";
import { Card, Row, Col, Form, Button, Spinner } from "react-bootstrap";

const EngagementPrediction = () => {
    const [likes, setLikes] = useState(0);
    const [shares, setShares] = useState(0);
    const [comments, setComments] = useState(0);
    const [engagement, setEngagement] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const predictEngagement = async () => {
        setLoading(true);
        setError("");
        setEngagement(null);

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict_engagement", { likes, shares, comments });
            setEngagement(response.data.predicted_engagement);
        } catch {
            setError("Error predicting engagement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-3 mb-4">
            <h4>📈 Engagement Prediction</h4>
            {error && <p className="text-danger">{error}</p>}
            <Row className="mb-2">
                <Col>
                    <Form.Label>Likes</Form.Label>
                    <Form.Control
                        type="number"
                        value={likes}
                        onChange={(e) => setLikes(Number(e.target.value))}
                    />
                </Col>
                <Col>
                    <Form.Label>Shares</Form.Label>
                    <Form.Control
                        type="number"
                        value={shares}
                        onChange={(e) => setShares(Number(e.target.value))}
                    />
                </Col>
                <Col>
                    <Form.Label>Comments</Form.Label>
                    <Form.Control
                        type="number"
                        value={comments}
                        onChange={(e) => setComments(Number(e.target.value))}
                    />
                </Col>
            </Row>
            <Button variant="primary" onClick={predictEngagement} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Predict"}
            </Button>
            {engagement !== null && <p className="mt-2"><strong>Predicted Engagement:</strong> {engagement}</p>}
        </Card>
    );
};

export default EngagementPrediction;
