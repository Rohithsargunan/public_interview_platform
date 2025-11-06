"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, X } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "1 interview per month",
      "3 questions per interview",
      "Basic scoring",
      "Overall score only",
      "Community support",
    ],
    notIncluded: ["Detailed reports", "Progress tracking", "Learning plans"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Premium",
    price: "$19.99",
    period: "/month",
    description: "For serious job seekers",
    features: [
      "Unlimited interviews",
      "5-10 questions per interview",
      "Detailed PDF reports",
      "Per-question feedback",
      "Progress tracking dashboard",
      "Personalized learning plans",
      "Priority AI processing (5-15 min)",
      "Email support (24h response)",
      "Resume builder access",
      "Question bank access",
    ],
    cta: "Start Premium Trial",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for you. Try premium risk-free with a 7-day trial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? "border-2 border-blue-600 shadow-xl scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded?.map((item, idx) => (
                    <div key={idx} className="flex items-start opacity-50">
                      <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/auth/signup" className="block w-full">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need something custom? We've got you covered.
          </p>
          <Button variant="ghost">Contact Sales for Enterprise Plan</Button>
        </div>
      </div>
    </section>
  );
}

