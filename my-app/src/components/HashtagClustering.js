import React, { useState } from "react";
import axios from "axios";
import { Card, Row, Col, Form, Button, Spinner } from "react-bootstrap";

const HashtagClustering = () => {
    const [hashtags, setHashtags] = useState("");
    const [cluster, setCluster] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const clusterHashtags = async () => {
        setLoading(true);
        setError("");
        setCluster("");

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict_hashtag_cluster", { hashtags });
            setCluster(`Cluster ${response.data.cluster}`);
        } catch {
            setError("Error clustering hashtags.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-3 mb-4">
            <h4>📌 Hashtag Clustering</h4>
            {error && <p className="text-danger">{error}</p>}
            <Row>
                <Col md={8}>
                    <Form.Control
                        type="text"
                        placeholder="Enter hashtags"
                        value={hashtags}
                        onChange={(e) => setHashtags(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Button variant="primary" onClick={clusterHashtags} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Cluster"}
                    </Button>
                </Col>
            </Row>
            {cluster && <p className="mt-2"><strong>Cluster:</strong> {cluster}</p>}
        </Card>
    );
};

export default HashtagClustering;
