import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import './globals.scss'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dnn2qkq.css"/>
      </head>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
