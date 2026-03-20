let doctors = [];

export const getDoctors = (req, res) => {
    res.json(doctors);
};

export const addDoctor = (req, res) => {
    const { name, specialization } = req.body;
    if (!name || !specialization) {
        return res.status(400).json({ message: "Name and specialization are required" });
    }

    const newDoctor = {
        id: doctors.length + 1,
        name,
        specialization
    };

    doctors.push(newDoctor);
    res.status(201).json(newDoctor);
};
