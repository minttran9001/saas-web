import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { TRouteNames, createResourceUrl } from "@/routes";
import { TObject } from "@/utils/types";

export type TNamedLinkProps = PropsWithChildren<
  (
    | ({
        className?: string;
        name: TRouteNames;
        searchParams?: TObject;
        pathParams?: TObject;
        // If provide name, href will be ignored
        href?: never;
      } & Partial<LinkProps>)
    | ({
        name?: never;
        className?: string;
        searchParams?: never;
        pathParams?: never;
      } & LinkProps)
  ) &
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>;

// You can use this component like this:
// <NamedLink name="HomeSearchIndexPage">Home</NamedLink>
// or
// <NamedLink href="/homesearch">Home</NamedLink>
// This component will help you to suggest the correct route name.
const NamedLink = forwardRef((props: TNamedLinkProps, ref) => {
  const { className, children, name, searchParams, pathParams } = props;
  const classes = cn("color-link", className);

  if (!name)
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    );

  const to = createResourceUrl(name, searchParams, pathParams);

  if (!to) throw new Error(`Invalid route name: ${name}`);

  return (
    <Link {...props} href={to} className={classes}>
      {children}
    </Link>
  );
});

NamedLink.displayName = "NamedLink";

export default NamedLink;
