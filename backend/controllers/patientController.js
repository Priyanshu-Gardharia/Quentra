/**
 * Hospital Queue Management System - Patient Controller
 */

// Dummy array to store registered patients (the queue)
let patients = [];

// @desc    Register a new patient
// @route   POST /patients
export const registerPatient = (req, res) => {
    try {
        const { name, age, gender } = req.body;

        if (!name || !age || !gender) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: name, age, gender"
            });
        }

        const newPatient = {
            id: patients.length + 1,
            name,
            age,
            gender,
            registeredAt: new Date().toISOString()
        };

        patients.push(newPatient);

        res.status(201).json({
            success: true,
            message: "Patient registered successfully",
            data: newPatient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// @desc    Get list of all registered patients
// @route   GET /patients
export const getPatients = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
