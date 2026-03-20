const USERS = [
    { email: "admin@hospital.com", password: "password", role: "admin" },
    { email: "doctor@hospital.com", password: "password", role: "doctor" },
    { email: "receptionist@hospital.com", password: "password", role: "receptionist" }
];

export const login = (req, res) => {
    const { email, password } = req.body;

    const user = USERS.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, user: { email: user.email, role: user.role } });
    } else {
        res.status(401).json({ success: false, message: "Invalid email or password" });
    }
};
