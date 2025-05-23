"use client"
 
import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
 
const dealerships = [
  {
    name: "Skywell",
    image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748000669/skywell_sprhgv.jpg",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788882/logo_sisnn9.png",
    description:
      "Legend Motors is the exclusive distributor of Skywell vehicles in Dubai, offering comprehensive retail and fleet solutions across the emirate.",
    needsBackground: false,
    bgColor: "bg-white/90",
  },
  {
    name: "Kaiyi",
    image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748000659/kaiyi_bf8xzf.jpg",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788951/download_wmkc6s.png",
    description:
      "Legend Motors is the exclusive distributor of Kaiyi Automobiles in the UAE, proudly introducing this innovative Chinese SUV brand to the local market.",
    needsBackground: true,
    bgColor: "bg-black",
  },
  {
    name: "Li Auto",
    image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748000658/liauto_luvwcv.jpg",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788883/logo-text-black-en.e6782a94_chlojl.svg",
    description:
      "Legend Motors serves as the official sales partner and authorized provider of after-sales service and maintenance for Li Auto vehicles across the UAE.",
    needsBackground: false,
    bgColor: "bg-white/90",
  },
  {
    name: "212",
    image: "https://res.cloudinary.com/dckrspiqe/image/upload/v1748000399/212_zctz1o.jpg",
    logo: "https://res.cloudinary.com/dosxengut/image/upload/v1746788882/logo212b_qk5xsj.png",
    description:
      "Legend Motors is the exclusive distributor for 212 vehicles in the UAE, managing both sales and after-sales service with a commitment to excellence.",
    needsBackground: true,
    bgColor: "bg-black",
  },
]
 
export default function LegendMotorsDealershipPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
 
  useEffect(() => {
    setIsLoaded(true)
  }, [])
 
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden pt-20">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2b1c48]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#ee8900]/5 rounded-full blur-3xl"></div>
        </div>
 
        <div className="relative z-10 flex flex-col items-center py-12 px-4">
          <div
            className={`w-full max-w-6xl transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Page Header */}
            <section className="w-full mb-16 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2b1c48] mb-6 font-richmond animation-delay-200">
                Dealerships
              </h2>
              <div className="h-1 w-16 bg-[#2b1c48] rounded-full animate-expand-width"></div>
 
              <p className="mt-8 text-gray-700 text-lg max-w-3xl animation-delay-400 font-effra">
                Legend Motors represents premium automotive brands across the UAE, providing exceptional sales, service,
                and support for our valued customers. Explore our exclusive dealership portfolio below.
              </p>
            </section>
 
            {/* Dealership Sections */}
            <section className="w-full space-y-12">
              {dealerships.map((dealership, idx) => (
                <div
                  key={dealership.name}
                  className={`bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-3xl animate-fade-in-up`}
                  style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image/Logo */}
                    <div className="md:w-2/5 relative group overflow-hidden">
                      <div className="aspect-[4/3] w-full bg-[#2b1c48]/5 relative overflow-hidden">
                        <img
                          src={dealership.image || "/placeholder.svg"}
                          alt={`${dealership.name} vehicle`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#2b1c48] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                      </div>
 
                      {/* Logo overlay - standardized size with custom background */}
                      <div
                        className={`absolute bottom-4 right-4 p-3 rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${dealership.bgColor} backdrop-blur-sm`}
                        style={{
                          width: "140px",
                          height: "60px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={dealership.logo || "/placeholder.svg"}
                          alt={`${dealership.name} logo`}
                          className={`max-h-10 max-w-full object-contain ${
                            dealership.needsBackground ? "brightness-150 contrast-125" : ""
                          }`}
                        />
                      </div>
                    </div>
 
                    {/* Text Content */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative">
                      <h3 className="text-3xl font-richmond font-bold text-[#2b1c48] mb-4 group-hover:text-[#5d376e] transition-colors duration-300">
                        {dealership.name}
                      </h3>
                      <p className="text-lg font-effra text-gray-700 mb-6 leading-relaxed">{dealership.description}</p>
 
                      {/* CTA Button */}
                      <div className="mt-8">
                        <button
                          className={`group inline-flex items-center gap-2 text-[#2b1c48] font-semibold hover:text-[#ee8900] transition-colors duration-300`}
                        >
                          <span>Learn more</span>
                          <ChevronRight
                            className={`w-5 h-5 transform transition-transform duration-300 ${
                              activeIndex === idx ? "translate-x-1" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
 
            {/* Contact Section */}
            <section className="w-full mt-16 bg-[#2b1c48] text-white rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up animation-delay-1000">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-richmond">Interested in our dealerships?</h3>
                  <p className="text-white/80 max-w-xl font-effra">
                    Contact our team to learn more about our exclusive automotive brands and dealership opportunities
                    across the UAE.
                  </p>
                </div>
                <button className="bg-[#ee8900] hover:bg-[#ee8900]/90 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  Contact Us
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
 
 