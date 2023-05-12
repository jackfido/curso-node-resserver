const { response } = require("express");

const isAdmin = (req, res = response, next) => {
    // console.log(req.logged);
    if (!req.logged) {
        return res.status(500).json({
            error: 'Permission denied - No token'
        });
    }

    const {role, name} = req.logged;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            error: 'Permission denied - No Admin'
        });
    }

    next();
};

const allowedRoles = (...roles) => {
    return (req, res, next) => {
        // console.log(roles, req.logged.role);
  
        if (!req.logged) {
            return res.status(500).json({
                error: 'Permission denied - No token'
            });
        }

        if(!roles.includes(req.logged.role)) {
            return res.status(401).json({
                error: `Permission denied - Invalid role: ${req.logged.role}. Not in allowed roles`
            });
        }

        next();
    }
};

module.exports = {
    isAdmin,
    allowedRoles
};