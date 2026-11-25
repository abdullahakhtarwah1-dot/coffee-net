import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShippingPolicy } from "@/components/ShippingPolicy";
import { ReturnsPolicy } from "@/components/ReturnsPolicy";
import { TermsPolicy } from "@/components/TermsPolicy";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";

const POLICIES: Record<string, string> = {
  shipping: "Shipping policy",
  returns: "Returns policy",
  privacy: "Privacy policy",
  terms: "Terms of service",
};

type Params = Promise<{ policy: string }>;

export function generateStaticParams() {
  return Object.keys(POLICIES).map((policy) => ({ policy }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return { title: POLICIES[(await params).policy] ?? "Policy" };
}

export default async function PolicyPage({ params }: { params: Params }) {
  const policy = (await params).policy;
  const title = POLICIES[policy];
  if (!title) notFound();
  if (policy === "shipping") return <ShippingPolicy />;
  if (policy === "returns") return <ReturnsPolicy />;
  if (policy === "terms") return <TermsPolicy />;
  if (policy === "privacy") return <PrivacyPolicy />;
  return (
    <div className="container page prose">
      <h1>{title}</h1>
      <p className="notice">
        This policy has not been written yet. The store owner must supply and approve it before launch.
      </p>
    </div>
  );
}
