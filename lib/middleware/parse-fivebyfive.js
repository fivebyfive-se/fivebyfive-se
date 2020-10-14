module.exports = (req, res, next) => {
    res.locals.parseFivebyfive = (...text) => {
        return text.map((t) => {
            return (t.indexOf('__') === 0 ? res.__(t.replace('__', '')) : t)
                .replace(/\#(\w+)\[(.+)\]/g, '<a href="#" data-scroll-to="#$1">$2</a>')
                .replace(/\/Fivebyfive\//g, '<a href="https://www.fivebyfive.se/" class="fivebyfive" rel="noopener nofollow">Fivebyfive</a>')
                .replace(/Kalle/g, '<span class="kalle">Kalle</span>')
                .replace(/i_([a-z-]+)/g, '<i class="ri-$1"></i>');
            
        }).join(' ');
    };
    next();
};
