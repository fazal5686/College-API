const authorize = (...roles) => {

    return (req, res, next) => {
        console.log("USER ROLE:", req.user.role);
        console.log("ALLOWED ROLES:", roles);

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "User not authenticated"

            });

        }


        if (!roles.includes(req.user.role)) {

            return res.status(403).json({

                success: false,

                message: "Access denied. Admin permission required"

            });

        }


        next();

    };

};


module.exports = authorize;