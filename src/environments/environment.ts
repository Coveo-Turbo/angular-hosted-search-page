export const environment = {
    production: JSON.parse((process?.env as any)?.NG_APP_IS_PRODUCTION) || false,
    coveo: {
        orgId: (process?.env as any)?.NG_APP_ORG_ID,
        pageId: (process?.env as any)?.NG_APP_PAGE_ID,
        apiKey: (process?.env as any)?.NG_APP_API_KEY,
        token: (process?.env as any)?.NG_APP_TOKEN,
        searchHub: (process?.env as any)?.NG_APP_SEARCH_HUB,
    },
};