"use client"

import VideoPlayer from "@/components/ui/video-player"
import { motion } from "framer-motion"

/** Ornamental corner flourish for the antique frame. */
const Corner = ({ className }: { className: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 40 40"
    className={`pointer-events-none absolute h-7 w-7 md:h-10 md:w-10 ${className}`}
    fill="none"
    stroke="#E6C96B"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path d="M2 38V14C2 7 7 2 14 2h24" />
    <path d="M9 38V18c0-5 4-9 9-9h20" opacity="0.55" />
    <circle cx="14" cy="14" r="2.2" fill="#E6C96B" stroke="none" />
  </svg>
)

const LaunchVideo = () => (
  <section id="demo" className="relative w-full scroll-mt-28 px-4 pb-24 md:px-10">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-5xl"
    >
      <div className="mb-10 flex flex-col items-center text-center">
        <p
          className="mb-4 text-xs uppercase tracking-widest"
          style={{ color: "#C9A84C", letterSpacing: "0.12em" }}
        >
          See it in action
        </p>
        <h2
          className="max-w-xl text-3xl font-semibold leading-tight md:text-4xl"
          style={{ color: "#F7ECE9", fontFamily: "Georgia, serif" }}
        >
          Ascendia in <span className="text-[#C9A84C]">38 seconds.</span>
        </h2>
        <p className="mt-4 max-w-md text-sm" style={{ color: "#B4B0AE" }}>
          Every feature, from groups and courses to payments and affiliates, in
          one quick tour.
        </p>
      </div>

      {/* Antique gilt frame: gold gradient bezel, dark matte, inner gold rule */}
      <div
        className="relative rounded-[22px] p-[5px]"
        style={{
          background:
            "linear-gradient(135deg, #F3E6B8 0%, #C9A84C 22%, #7a5a1e 48%, #E6C96B 74%, #9A7A2E 100%)",
          boxShadow:
            "0 0 70px rgba(201,168,76,0.22), 0 24px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="relative rounded-[17px] p-2.5 md:p-4"
          style={{
            background: "#0d0a04",
            boxShadow: "inset 0 0 0 1px rgba(230,201,107,0.55)",
          }}
        >
          <Corner className="left-1.5 top-1.5" />
          <Corner className="right-1.5 top-1.5 rotate-90" />
          <Corner className="bottom-1.5 right-1.5 rotate-180" />
          <Corner className="bottom-1.5 left-1.5 -rotate-90" />

          <div
            className="overflow-hidden rounded-xl"
            style={{ boxShadow: "0 0 0 1px rgba(201,168,76,0.6)" }}
          >
            <VideoPlayer src="/ascendia-launch.mp4" />
          </div>
        </div>
      </div>
    </motion.div>
  </section>
)

export default LaunchVideo
