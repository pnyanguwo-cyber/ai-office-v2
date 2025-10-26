import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Crown, Zap, Shield, Star, CreditCard, Smartphone, DollarSign, Home } from 'lucide-react';

export default function Payment() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('ecocash');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started',
      features: [
        { text: '5 PowerPoint slides max', included: true },
        { text: '2 page documents', included: true },
        { text: '10 row spreadsheets', included: true },
        { text: 'AI watermarks', included: true },
        { text: 'Basic templates', included: true },
        { text: 'Community support', included: true },
        { text: 'Unlimited exports', included: false },
        { text: 'Advanced AI', included: false },
        { text: 'Team collaboration', included: false },
      ],
      highlight: false,
      cta: 'Current Plan'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 10, annual: 96 },
      description: 'For professionals & businesses',
      features: [
        { text: 'Unlimited slides', included: true },
        { text: 'Unlimited pages', included: true },
        { text: 'Unlimited rows', included: true },
        { text: 'No watermarks', included: true },
        { text: 'Premium templates', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced AI features', included: true },
        { text: 'Export to all formats', included: true },
        { text: 'Team workspace (3 users)', included: true },
      ],
      highlight: true,
      cta: 'Upgrade to Pro'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'For large teams & organizations',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Unlimited team members', included: true },
        { text: 'Custom branding', included: true },
        { text: 'API access', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'SLA guarantee', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Training & onboarding', included: true },
        { text: 'Volume discounts', included: true },
      ],
      highlight: false,
      cta: 'Contact Sales'
    }
  ];

  const paymentMethods = [
    { id: 'ecocash', name: 'EcoCash', icon: Smartphone, available: true },
    { id: 'onemoney', name: 'OneMoney', icon: Smartphone, available: true },
    { id: 'card', name: 'Visa/Mastercard', icon: CreditCard, available: true },
    { id: 'usd', name: 'USD Cash', icon: DollarSign, available: false },
  ];

  const handleSubscribe = () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }
    alert(`Payment integration coming soon!\nPlan: ${selectedPlan}\nMethod: ${paymentMethod}\n\nWill integrate Paystack for Zimbabwe payments.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-emerald-400 to-green-500 rounded-xl"></div>
              <span className="text-xl font-bold">AI Office</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
              <Link href="/login" className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg transition">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm text-emerald-400 mb-6">
            <Crown className="w-4 h-4" />
            Save 20% with annual billing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-400 mb-8">Start free, upgrade as you grow</p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg transition ${billingCycle === 'monthly' ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-lg transition ${billingCycle === 'annual' ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              Annual <span className="text-emerald-400 text-sm ml-1">(Save 20%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;
            return (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition ${
                  plan.highlight
                    ? 'border-emerald-500 shadow-xl shadow-emerald-500/20 scale-105'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    {typeof price === 'number' ? (
                      <>
                        <span className="text-5xl font-bold">${price}</span>
                        <span className="text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold">{price}</span>
                    )}
                  </div>
                  {billingCycle === 'annual' && typeof price === 'number' && price > 0 && (
                    <p className="text-sm text-emerald-400 mt-2">${(price / 12).toFixed(2)}/month billed annually</p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-xl font-semibold transition mb-6 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500'
                      : selectedPlan === plan.id
                      ? 'bg-white/20 border-2 border-emerald-500'
                      : 'bg-white/10 hover:bg-white/15'
                  }`}
                >
                  {selectedPlan === plan.id ? '✓ Selected' : plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Methods */}
        {selectedPlan && selectedPlan !== 'free' && (
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => method.available && setPaymentMethod(method.id)}
                    disabled={!method.available}
                    className={`relative p-6 rounded-xl border-2 transition ${
                      paymentMethod === method.id
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    } ${!method.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <Icon className="w-8 h-8 mb-3 mx-auto" />
                    <div className="text-center font-medium">{method.name}</div>
                    {!method.available && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                        <span className="text-xs">Coming Soon</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Secure Payment</h4>
                  <p className="text-xs text-gray-400">Your payment is encrypted and processed securely through Paystack</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-xl font-semibold text-lg transition"
            >
              Continue to Payment
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              You can cancel anytime. No questions asked.
            </p>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-semibold mb-2">Can I switch plans anytime?</h3>
              <p className="text-gray-400 text-sm">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400 text-sm">We accept EcoCash, OneMoney, and international cards. USD and ZWL supported.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-semibold mb-2">Is there a money-back guarantee?</h3>
              <p className="text-gray-400 text-sm">Yes! We offer a 14-day money-back guarantee. If you're not satisfied, we'll refund you in full.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-semibold mb-2">Do you offer discounts for NGOs or students?</h3>
              <p className="text-gray-400 text-sm">Yes! Contact us at support@aioffice.co.zw with proof of eligibility for special pricing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
