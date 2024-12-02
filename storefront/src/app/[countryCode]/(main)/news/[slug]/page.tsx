import qs from "qs";
import componentMapping from "@modules/common/components/article/componentMapping";
import BackLink from "@modules/common/components/back-link";

type TransformedDataItem = {
    Title: string;
    Slug: string;
    Category: string;
    Summary: string | null;
    ThumbnailUrl?: string;
    Content?: any[];
};

function transformData(json: any): any {
    const item = json.data; 
    const attributes = item.attributes;

    const ThumbnailUrl = attributes.Thumbnail?.data?.attributes?.formats?.small?.url;

    const Content = attributes.Content?.map((contentItem: any) => {
        const Component = contentItem["__component"].split(".")[1];
        return { ...contentItem, Component };
    });

    return {
        Title: attributes.Title,
        Slug: attributes.Slug,
        Category: attributes.Category,
        Summary: attributes.Summary,
        ThumbnailUrl,
        Content,
        Id: item.id, 
    };
}




async function getArticleById(articleId: string) {
    const baseUrl = process.env.AMARA_STRAPI_URL ?? "http://localhost:1337";
    const path = `/api/articles/${articleId}`;
    const url = new URL(path, baseUrl);

    const query: Record<string, any> = {};

    query.populate = { Content: { fields: "*" } };


    url.search = qs.stringify(query);
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch article with ID: ${articleId}`);
    }

    const data = await res.json();
    return transformData(data); 
}

interface NewsPageProps {
    searchParams: { [key: string]: string | undefined }; 
}

const NewsPage = async ({ searchParams }: NewsPageProps) => {
    const id = searchParams.id ?? "";

    let article: any = null;

    try {
        if (id) {
            article = await getArticleById(id);
        }
    } catch (error) {
        console.error("Error fetching article:", error);
    }

    return (
        <div
            className="flex flex-col small:flex-row small:items-start py-6 content-container"
            data-testid="news-container"
        >
            <div className="w-full">
                <div className="mb-8 mx-12">
                    <div>
                        <BackLink href={`/${article.Category}`} label={`Back to ${article.Category}`} className="text-ui-fg-base underline"/>

                    </div>

                    {article ? (

                        <div>
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
                                    return <Component key={index} {...contentItem} />;
                                })}
                        </div>
                    ) : (
                        <p>No article found or missing ID.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
