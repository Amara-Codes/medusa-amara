import qs from "qs";
import { headers } from "next/headers";
import componentMapping from "@modules/common/components/article/componentMapping";
import BackLink from "@modules/common/components/back-link";
import { Metadata } from 'next';

//Parte che serve a mappare i nomi delle immagini nei componenti
const componentImageMap = {
    hero: 'HeroBgImg',
    paragraph: 'ParagraphImg',
    cta: 'CtaBgImg'
};

type ComponentType = keyof typeof componentImageMap;

function isComponentType(value: any): value is ComponentType {
    return value in componentImageMap;
}

type TransformedDataItem = {
    Id: string
    Title: string;
    Slug: string;
    Category: string;
    Summary: string | null;
    ThumbnailUrl?: string;
    Content?: any[];
};

function transformData(json: any): TransformedDataItem {
    const item = json.data[0];

    const attributes = item.attributes;
    const Content = attributes.Content?.map((contentItem: any) => {
        const contentComponentItem = { ...contentItem };
        const ComponentRaw = contentItem["__component"].split(".")[1];
        let Component: ComponentType | string = ComponentRaw;

        if (isComponentType(ComponentRaw)) {
            const imageName = componentImageMap[ComponentRaw],
                componentImg = contentItem[imageName]?.data?.attributes?.formats?.medium?.url;

            contentComponentItem[imageName] = typeof (componentImg) === 'string' ? componentImg : ""
        }
        return { ...contentComponentItem, Component };
    });


    return {
        Title: attributes.Title,
        Slug: attributes.Slug,
        Category: attributes.Category,
        Summary: attributes.Summary,
        Content,
        Id: item.id,
    };
}

async function getArticleById(slug: string) {
    console.log(slug)
    const baseUrl = process.env.AMARA_STRAPI_URL ?? "http://localhost:1337";
    const path = `/api/articles/`;
    const url = new URL(path, baseUrl);
    const query: Record<string, any> = {};

    query.filters = {
        Slug: {
            $eq: slug,
        }
    };
    query.populate = {
        Content:
        {
            populate: {
                HeroBgImg: {
                    fields: ["url", "formats"],
                },
                ParagraphImg: {
                    fields: ["url", "formats"],
                },
                CtaBgImg: {
                    fields: ["url", "formats"],
                },
            }

        }
    };

    url.search = qs.stringify(query);
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch article with ID: ${slug}`);
    }

    const data = await res.json();
    return transformData(data);
}


export async function generateMetadata(): Promise<Metadata> {
 let slug: string = "";
    const headerList = headers();
    const path = headerList.get("x-current-path");
    if (path) {
        const pathnameFields = path.split('/');
        if (pathnameFields.length) {
            slug = pathnameFields[pathnameFields.length - 1];
        }
    }
    let article: any = null;

    try {
        if (slug.length) {
            article = await getArticleById(slug);
        }
    } catch (error) {
        console.error("Error fetching article:", error);
    }

    return {
        title: article ? "Activities: Engage & Explore - " + article.Title : 'Activities: Engage & Explore',
        description: article?.Summary || 'Discover exciting activities at our brewery in Siem Reap, Cambodia. From community events and cultural workshops to exploring our sustainable craft beer tap room, there’s always something to enjoy.',
    };
}

const ActivitiesPage = async () => {
 let slug: string = "";
    const headerList = headers();
    const path = headerList.get("x-current-path");
    if (path) {
        const pathnameFields = path.split('/');
        if (pathnameFields.length) {
            slug = pathnameFields[pathnameFields.length - 1];
        }
    }
    let article: any = null;

    try {
        if (slug.length) {
            article = await getArticleById(slug);
        }
    } catch (error) {
        console.error("Error fetching article:", error);
    }

    return (
        <div
            className="flex flex-col small:flex-row small:items-start py-6 content-container"
            data-testid="activities-container"
        >
            {article ? (
                <div className="w-full">

                    <div className="mb-16 small:mx-12">
                        <div className="mb-8">
                            <BackLink href={`/${article.Category}`} label={`Back to ${article.Category}`} className="text-ui-fg-base hover:text-koiOrange transition duration-500" />
                        </div>


                        <section>
                            {article.Content &&
                                article.Content.map((contentItem: any, index: number) => {
                                    const Component = componentMapping[contentItem.Component];
                                    if (!Component) {
                                        return (
                                            <pre key={index}>
                                                {JSON.stringify(contentItem, null, 2)}
                                            </pre>
                                        );
                                    }
                                    return (

                                        <Component key={index} {...contentItem} />

                                    );
                                })}
                        </section>

                    </div>
                </div>
            ) : (
                <p>No article found or missing ID.</p>
            )}
        </div>
    );
};

export default ActivitiesPage;
