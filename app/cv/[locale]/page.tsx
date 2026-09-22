import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Vazirmatn } from "next/font/google";
import { getCvData } from "@/lib/cv-data";
import { PublicCv } from "@/components/public-cv";
import "./cv.css";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazirmatn" });

export const metadata: Metadata = {
  title: "CV",
  description: "Printable curriculum vitae",
  robots: { index: false, follow: false },
};

export default async function CvPage({ params }: PageProps<"/cv/[locale]">) {
  const { locale } = await params;
  if (locale !== "fa" && locale !== "en") notFound();
  const data = await getCvData(locale);
  return <div className={locale === "fa" ? vazirmatn.variable : ""}><PublicCv locale={locale} data={data} /></div>;
}
