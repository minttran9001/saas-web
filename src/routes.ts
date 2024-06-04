import { stringify } from "querystring";
import {
  AssertRecordType,
  TObject,
  TRouteConfigurationItem,
} from "./utils/types";

export const apiAuthPrefix = "/api/auth";

export const routeConfiguration = AssertRecordType<TRouteConfigurationItem>()({
  LandingPage: {
    path: "/",
  },
  LoginPage: {
    path: "/login",
    isAuthRoute: true,
  },
  SignupPage: {
    path: "/signup",
    isAuthRoute: true,
  },
  VerifyEmailPage: {
    path: "/verify-email",
    isAuthRoute: true,
  },
  SettingsPage: {
    path: "/settings",
    isAuthRequired: true,
  },
});

export const DEFAULT_LOGIN_REDIRECT = routeConfiguration.SettingsPage.path;

export type TRouteNames = keyof typeof routeConfiguration;

export const isRequiredAuthByPath = (path: string) => {
  const routesAsArray = Object.values({
    ...routeConfiguration,
  });
  const route = routesAsArray.find(
    (route) => route.path === path
  ) as TRouteConfigurationItem;
  if (!route) return false;
  return !!route.isAuthRequired;
};

export const getRouteNameByPath = (path: string) => {
  const routeKeysAsArray = Object.keys({
    ...routeConfiguration,
  });
  const key = routeKeysAsArray.find(
    (routeName) =>
      routeConfiguration[routeName as keyof typeof routeConfiguration].path ===
      path
  );
  if (!key) return null;
  return key;
};

export const getRouteByName = (
  routeName: TRouteNames
): TRouteConfigurationItem => {
  return {
    ...routeConfiguration,
  }[routeName];
};

export const getRouteByPath = (
  path: string
): TRouteConfigurationItem | null => {
  const routesAsArray = Object.values(routeConfiguration);
  const route = routesAsArray.find((route) => route.path === path);
  if (!route) return null;
  return route;
};

const AUTHENTICATION_ROUTE_NAMES = Object.keys(routeConfiguration).filter(
  (routeName) => {
    const route = {
      ...routeConfiguration,
    }[routeName] as TRouteConfigurationItem;
    if (!route) return false;
    return route.isAuthRoute;
  }
);

export const isAuthenticationRoutes = (path: string) => {
  const routeName = getRouteNameByPath(path);
  if (!routeName) return false;
  return AUTHENTICATION_ROUTE_NAMES.includes(routeName);
};

// This function is used to create a url with query params
// Will throw an error if required query params are not provided
/**
 *
 * @param routeName routeConfiguration key
 * @param queryParams query params as object
 * @param pathParams path params as object
 * @returns url with query params and path params
 */
export const createResourceUrl = (
  routeName: TRouteNames,
  queryParams?: TObject,
  pathParams?: TObject
) => {
  const route = getRouteByName(routeName);
  if (!route) return "";
  const { requiredQueryParams } = route;

  if (requiredQueryParams && requiredQueryParams.length > 0) {
    const missingParams = requiredQueryParams.filter(
      (param) => !queryParams?.[param]
    );

    if (missingParams.length > 0) {
      const missingParamsString = missingParams.join(", ");
      throw new Error(
        `Oops... Missing required query params: ${missingParamsString}`
      );
    }
  }

  const queryString = stringify(queryParams);
  const path = Object.keys(pathParams || {}).reduce((result, key) => {
    return result.replace(`[${key}]`, pathParams?.[key] ?? "");
  }, route.path);

  return `${path}${queryString ? `?${queryString}` : ""}`;
};
