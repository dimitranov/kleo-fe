import React from "react";
import { Helmet } from "react-helmet";

export default function AppHelmet({ title }: { title: string }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={title} />
      <meta name="keyword" content={title} />
    </Helmet>
  );
}
