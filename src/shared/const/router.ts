export enum AppRouter {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',
  SETTINGS = 'setting',

  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSetting = () => '/setting';

export const AppRoutesPaths: OptionalRecord<AppRouter, string> = {
  [AppRouter.MAIN]: getRouteMain(),
  [AppRouter.ABOUT]: getRouteAbout(),
  [AppRouter.PROFILE]: getRouteProfile(':id'),
  [AppRouter.ARTICLES]: getRouteArticles(),
  [AppRouter.ARTICLE_DETAILS]: getRouteArticleDetails(':id'),
  [AppRouter.ARTICLE_CREATE]: getRouteArticleCreate(),
  [AppRouter.ARTICLE_EDIT]: getRouteArticleEdit(':id'),
  [AppRouter.ADMIN_PANEL]: getRouteAdmin(),
  [AppRouter.FORBIDDEN]: getRouteForbidden(),
  [AppRouter.SETTINGS]: getRouteSetting(),
};
