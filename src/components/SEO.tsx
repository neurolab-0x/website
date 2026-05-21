import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterCard?: string;
    noindex?: boolean;
}

const siteName = "NeuroLab";
const siteUrl = "https://neurolab.cc";
const defaultOgImage = `${siteUrl}/hero.png`;

const toAbsoluteUrl = (value?: string) => {
    if (!value) return defaultOgImage;
    if (/^https?:\/\//i.test(value)) return value;
    return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
};

const SEO = ({
    title,
    description,
    canonical,
    ogType = "website",
    ogImage,
    twitterCard = "summary_large_image",
    noindex = false,
}: SEOProps) => {
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const url = canonical ? `${siteUrl}${canonical}` : siteUrl;
    const imageUrl = toAbsoluteUrl(ogImage);
    const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

    return (
        <Helmet>
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            <link rel="canonical" href={url} />
            <meta name="robots" content={robotsContent} />

            <meta property="og:site_name" content={siteName} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:image" content={imageUrl} />

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default SEO;
