// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Create a logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
};

// Create middleware to parse JSON and URL-encoded bodies
const parseRequestData = [
    express.json(),
    express.urlencoded({ extended: true })
];

// Create middleware to handle CORS
const handleCORS = cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

// Create middleware to check for authentication header
const checkAuthHeader = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    next();
};

// Create 404 handler middleware
const handle404 = (req, res) => {
    res.status(404).json({ error: 'Route not found' });
};

// Create error handling middleware
const handleError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};

// Export all middleware
module.exports = {
    logger,
    parseRequestData,
    handleCORS,
    checkAuthHeader,
    handle404,
    handleError
};