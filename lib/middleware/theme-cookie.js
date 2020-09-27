module.exports = (req, res, next) => {
    // check if client sent cookie

    let themeCookie = req.cookies.theme;
    if (themeCookie === undefined) {
        themeCookie = 'default';
        res.cookie('theme', themeCookie, { maxAge: 900000, httpOnly: true });
    }
    res.locals.theme = themeCookie;

    next(); // <-- important!
};
