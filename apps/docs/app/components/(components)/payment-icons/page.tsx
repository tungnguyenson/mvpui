/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
  VisaIcon, MastercardIcon, AmexIcon, DiscoverIcon, UnionPayIcon,
  AffirmIcon, AlipayIcon, AmazonIcon, AfterpayIcon, ApplePayIcon,
  AydenIcon, BancontactIcon, BinancePayIcon, BitcoinCashIcon, BitcoinIcon,
  BitpayIcon, BraintreeIcon, CashAppPayIcon, CitadeleIcon, CoinbaseIcon,
  DinersClubIcon, EloIcon, EtheriumIcon, ForbrugsforeningenIcon, GiropayIcon,
  GooglePayIcon, IdealIcon, InteracIcon, JCBIcon, KlarnaIcon,
  LightcoinIcon, MaestroIcon, PayoneerIcon, PayPalIcon, PaysafeIcon,
  QiwiIcon, RazorpayIcon, RevolutIcon, RuPayIcon, SamsungPayIcon,
  SEPAIcon, ShopeePayIcon, ShopPayIcon, SkrillIcon, SofortIcon,
  StripeIcon, UPIIcon, VenmoIcon, VerifoneIcon, WeChatIcon,
  WeChatPayIcon, WebmoneyIcon, WiseIcon, YandexIcon, ZelleIcon, ZipPayIcon,
} from "@mvp-ui/ui";
import React from "react";
import type { SVGProps } from "react";

const ALL_ICONS: { name: string; Component: (p: SVGProps<SVGSVGElement>) => React.JSX.Element }[] = [
  { name: "VisaIcon", Component: VisaIcon },
  { name: "MastercardIcon", Component: MastercardIcon },
  { name: "AmexIcon", Component: AmexIcon },
  { name: "DiscoverIcon", Component: DiscoverIcon },
  { name: "UnionPayIcon", Component: UnionPayIcon },
  { name: "AffirmIcon", Component: AffirmIcon },
  { name: "AlipayIcon", Component: AlipayIcon },
  { name: "AmazonIcon", Component: AmazonIcon },
  { name: "AfterpayIcon", Component: AfterpayIcon },
  { name: "ApplePayIcon", Component: ApplePayIcon },
  { name: "AydenIcon", Component: AydenIcon },
  { name: "BancontactIcon", Component: BancontactIcon },
  { name: "BinancePayIcon", Component: BinancePayIcon },
  { name: "BitcoinCashIcon", Component: BitcoinCashIcon },
  { name: "BitcoinIcon", Component: BitcoinIcon },
  { name: "BitpayIcon", Component: BitpayIcon },
  { name: "BraintreeIcon", Component: BraintreeIcon },
  { name: "CashAppPayIcon", Component: CashAppPayIcon },
  { name: "CitadeleIcon", Component: CitadeleIcon },
  { name: "CoinbaseIcon", Component: CoinbaseIcon },
  { name: "DinersClubIcon", Component: DinersClubIcon },
  { name: "EloIcon", Component: EloIcon },
  { name: "EtheriumIcon", Component: EtheriumIcon },
  { name: "ForbrugsforeningenIcon", Component: ForbrugsforeningenIcon },
  { name: "GiropayIcon", Component: GiropayIcon },
  { name: "GooglePayIcon", Component: GooglePayIcon },
  { name: "IdealIcon", Component: IdealIcon },
  { name: "InteracIcon", Component: InteracIcon },
  { name: "JCBIcon", Component: JCBIcon },
  { name: "KlarnaIcon", Component: KlarnaIcon },
  { name: "LightcoinIcon", Component: LightcoinIcon },
  { name: "MaestroIcon", Component: MaestroIcon },
  { name: "PayoneerIcon", Component: PayoneerIcon },
  { name: "PayPalIcon", Component: PayPalIcon },
  { name: "PaysafeIcon", Component: PaysafeIcon },
  { name: "QiwiIcon", Component: QiwiIcon },
  { name: "RazorpayIcon", Component: RazorpayIcon },
  { name: "RevolutIcon", Component: RevolutIcon },
  { name: "RuPayIcon", Component: RuPayIcon },
  { name: "SamsungPayIcon", Component: SamsungPayIcon },
  { name: "SEPAIcon", Component: SEPAIcon },
  { name: "ShopeePayIcon", Component: ShopeePayIcon },
  { name: "ShopPayIcon", Component: ShopPayIcon },
  { name: "SkrillIcon", Component: SkrillIcon },
  { name: "SofortIcon", Component: SofortIcon },
  { name: "StripeIcon", Component: StripeIcon },
  { name: "UPIIcon", Component: UPIIcon },
  { name: "VenmoIcon", Component: VenmoIcon },
  { name: "VerifoneIcon", Component: VerifoneIcon },
  { name: "WeChatIcon", Component: WeChatIcon },
  { name: "WeChatPayIcon", Component: WeChatPayIcon },
  { name: "WebmoneyIcon", Component: WebmoneyIcon },
  { name: "WiseIcon", Component: WiseIcon },
  { name: "YandexIcon", Component: YandexIcon },
  { name: "ZelleIcon", Component: ZelleIcon },
  { name: "ZipPayIcon", Component: ZipPayIcon },
];

export default function PaymentIconsPage() {
  return (
    <div className="space-y-10 p-8">
      <div>
        <h1 className="text-fg text-2xl font-semibold">Payment Icons</h1>
        <p className="text-fg-secondary mt-1 text-sm">
          {ALL_ICONS.length} payment brand marks. Fixed-color (mode-independent) — brand fills do not flip in dark mode.
        </p>
        <pre className="bg-bg-secondary text-fg-secondary mt-3 rounded-lg p-3 text-xs">
          {`import { VisaIcon, MastercardIcon } from "@mvp-ui/ui";`}
        </pre>
      </div>

      <section>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {ALL_ICONS.map(({ name, Component }) => (
            <div
              key={name}
              className="border-border bg-bg flex flex-col items-center gap-2 rounded-xl border p-3"
            >
              <Component />
              <span className="text-fg-tertiary text-center text-xs leading-tight">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
