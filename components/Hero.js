import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <div className="grid items-center gap-6 rounded-3xl bg-white/80 p-6 ring-1 ring-black/5 md:grid-cols-2 md:p-10">
        <div>
          <p className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-brand">প্রতিদিনের বাজার দর</p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাড়ছে না কমছে তা দেখুন, আর একই পণ্যের বাজারভিত্তিক দাম তুলনা করুন।
          </p>
          <a href="#সব-পণ্য" className="btn mt-6 border-0 bg-brand text-white hover:bg-brand-dark">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src="/assets/bazar-hero.png" alt="ঝুড়িভর্তি তাজা সবজি" width={340} height={280} priority className="h-auto w-full max-w-xs md:max-w-sm" />
        </div>
      </div>
    </section>
  );
}
