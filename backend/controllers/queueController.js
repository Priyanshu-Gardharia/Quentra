let queue = [];
let nextToken = 1;

export const addToQueue = (req, res) => {
    const { patientName } = req.body;
    if (!patientName) {
        return res.status(400).json({ message: "Patient name is required" });
    }

    const newPatient = {
        id: queue.length + 1,
        patientName,
        tokenNumber: nextToken++,
        status: "waiting"
    };

    queue.push(newPatient);
    res.status(201).json(newPatient);
};

export const getQueue = (req, res) => {
    res.json(queue);
};

export const updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const patient = queue.find(p => p.id === parseInt(id));
    if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
    }

    if (status) {
        patient.status = status;
    }

    res.json(patient);
};

export const getNextPatient = (req, res) => {
    const nextPatient = queue.find(p => p.status === "waiting");
    if (!nextPatient) {
        return res.status(404).json({ message: "No patients in queue" });
    }
    res.json(nextPatient);
};
