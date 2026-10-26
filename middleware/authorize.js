export const authorizeModification = ((req, res, next) => {
    const user = req.user;
    const targetUserId = req.params.userId;

    if (user.role === "parent") {
        return next();
    }

    if (
        user.role === "child" &&
        String(user.id) === String(targetUserId)
    ) {
        return next();
    }


    return res.status(403).json({ "error": "Access denied" });
});