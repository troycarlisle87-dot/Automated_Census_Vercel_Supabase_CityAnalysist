"use client" // cusz it's interactive...
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge, Crown, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'



/* The current pricing... up for change sometime! */

const pricingPlans = [

  {id: "starter",
    name: "Starter",
    price: "$70",
    priceMonthly: "$80/month",
    priceYearly: "$960",
    period: "Monthly",
    description: "Perfect for time users",
    features:[
      "50 Municipalities",
      "Basic KPIs",
      "Email Support"
    ],
    popular: false


  },
  {
    id: "pro",
    name: "Pro",
    price: "$225",
    priceMonthly: "$75",
    priceYearly: "$900",
    period: "Quarterly",
    description: "A choice that keeps your information edge & aligns with quarterly business cycles",
    features:[
      "Unlimited Municipalities", 
      "All KPIs + Charts",
      "Weekly reports",
      "News feature"
    ],
    popular: true, 
  },
  {
    id: "insider",
    name: "Insider",
    price: "$828",
    priceMonthly: "$69",
    priceYearly: "$828",
    period: "Annual",
    description: "Stay in the loop and maintain your edge 24/7 365",
    features:[
      "AI Analytics Engine",
      "Unlimited everything",
      "Custom dashboards",
      "White-label reports",
      "24/7 support",
      "On-premise option"
    ],
    popular: true, 
  },
]

const PricingSection = () => {

  const [period, setPeriod] = React.useState<"monthly"|"yearly">("yearly")

  return (
    <div className="w-full max-w-6xl mx-auto py-3 px-4">
          <div className="text-center mb-20 space-y-6">
            <Badge  className="px-4 py-1">Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works for your team. Upgrade or downgrade anytime.
            </p>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-full max-w-xs mx-auto">
              <Button
                variant={period === "monthly" ? "default" : "ghost"}
                className="px-6 py-2 rounded-full flex-1"
                onClick={() => setPeriod("monthly")}
              >
                Monthly
              </Button>
              <Button
                variant={period === "yearly" ? "default" : "ghost"}
                className="px-6 py-2 rounded-full flex-1"
                onClick={() => setPeriod("yearly")}
              >
                Yearly
                <span className="ml-1 text-xs bg-primary/20 px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              </Button>
            </div>
          </div>
    
          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={cn(
                  "h-[520px] flex flex-col border-2 relative overflow-hidden transition-all group hover:shadow-xl hover:shadow-primary/10",
                  plan.popular && "border-primary/50 ring-2 ring-primary/20 -translate-y-6 scale-[1.02] shadow-2xl"
                )}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="flex-1 pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  
                  <div className="text-4xl lg:text-5xl font-bold mt-6">
                    {period === "yearly" ? plan.priceYearly : plan.priceMonthly}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 space-y-4 pb-6">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <div className="p-6 pt-0">
                  <Button className="w-full h-12 text-lg font-semibold group-hover:scale-[1.02] transition-all shadow-lg">
                    {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
  )
}

export default PricingSection