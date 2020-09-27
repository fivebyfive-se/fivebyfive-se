const prismic = require('prismic.io');

module.exports = async (req, res, next) => {
    const prismicApi = await prismic.api('https://dbmoujgp.prismic.io/api', { req });
    const prismicHomepage = await prismicApi.getSingle('homepage', { lang: req.language });

    const linksToDocuments = async (links) => {
        return await Promise.all(links.map(async (link) => {
            return await prismicApi.getByUID(link.type, link.uid, { lang: req.language });
        }));
    };

    const getSubSlices = async (document, sliceAlias, textAlias, linkAlias) => {
        const zoneAlias = `${document.type}.body`;
        if (document.getSliceZone(zoneAlias) && document.getSliceZone(zoneAlias).slices) {
            const slices = document.getSliceZone(zoneAlias).slices.filter((s) => s.sliceType === sliceAlias);
            return await Promise.all(slices.map(async (slice) => {
                    return {
                        text: textAlias ? slice.nonRepeat[textAlias].asText() : null,
                        items: await linksToDocuments(slice.repeat.toArray().map(r => r.getLink(linkAlias)))
                    };
                }
            ));
        }
        return [];
    };

    const getPageSlices = async (document) => {
        if (document.getSliceZone('page.body') && document.getSliceZone('page.body').slices) {
            const items = document.getSliceZone('page.body').slices.filter((s) => s.sliceType === 'list_of_articles')
                .map((slice) => slice.repeat.toArray().map(r => r.getLink('list_items')))
                .reduce((prev, curr) => ([...prev, ...curr]), []);

            return await Promise.all(items.map(async (item) => {
                const itemDoc = await prismicApi.getByUID(item.type, item.uid, { lang: req.language });
                if (itemDoc.type === 'casecollection') {
                    return { item: itemDoc, type: itemDoc.type, sub_items: await getSubSlices(itemDoc, 'cases', 'cases_text', 'cases') };
                }
                return itemDoc;
            }));
        }
        return [];
    };

    const renderPrismic = async (document) => {
        res.locals.page = {
            uid: document.uid,
            lang: req.language,
            title: document.getText('page.title') + ' (' + prismicHomepage.getText('homepage.title') + ')',
            heading: document.getText('page.title'),
            intro: document.getHtml('page.intro'),
            items: await getPageSlices(document)
        };

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
