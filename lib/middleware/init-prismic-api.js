const prismic = require('prismic.io');

module.exports = async (req, res, next) => {
    const prismicApi = await prismic.api('https://dbmoujgp.prismic.io/api', { req });
    const prismicHomepage = await prismicApi.getSingle('homepage', { lang: req.language });

    const renderPrismic = async (document) => {
        res.locals.page = {
            uid: document.uid,
            lang: req.language,
            title: document.getText('page.title') + ' (' + prismicHomepage.getText('homepage.title') + ')',
            heading: document.getText('page.title'),
            intro: document.getHtml('page.intro'),
            items: []
        };

        if (document.getSliceZone('page.body') && document.getSliceZone('page.body').slices) {
            const items = document.getSliceZone('page.body').slices.filter((s) => s.sliceType === 'list_of_articles')
                .map((slice) => slice.repeat.toArray().map(r => r.getLink('list_items')))
                .reduce((prev, curr) => ([...prev, ...curr]), []);

            res.locals.page.items = await Promise.all(items.map(async (item) => {
                return await prismicApi.getByUID(item.type, item.uid, { lang: req.language });
            }));
        }
        res.render('page', { document, homepage: prismicHomepage, language: req.language });
    };

    res.renderPrismicPage = async (pageUID) => {
        const doc = await prismicApi.getByUID('page', pageUID, { lang: req.language });
        if (doc) {
            await renderPrismic(doc);
        }
    };

    next();
};
