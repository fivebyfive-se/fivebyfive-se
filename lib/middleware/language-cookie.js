
module.exports = (req, res, next) => {
    const languageCookie = req.cookies.language || (req.getLocale ? req.getLocale() : 'en-US');
    if (req.setLocale) {
        req.setLocale(languageCookie);
    }
    req.language = res.locals.language = languageCookie;
    next();
};
