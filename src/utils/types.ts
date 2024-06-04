import { User } from "@prisma/client";

export type TObject<
  K extends string | number | symbol = string,
  V = any
> = Record<K, V>;

export type TRouteConfigurationItem = {
  path: string;
  isAuthRequired?: boolean;
  permissions?: string[];
  isAuthRoute?: boolean;
  requiredQueryParams?: string[];
};

export const AssertRecordType =
  <T>() =>
  <D extends Record<string, T>>(d: D) =>
    d;

export const TRouteConfiguration = AssertRecordType<TRouteConfigurationItem>();

export type TUser = Pick<
  User,
  "id" | "role" | "firstName" | "lastName" | "image" | "email"
>;

export type TCurrentUser = TUser;
