import { Metadata } from "next";
import Image from "next/image";
import { Heading, Button } from "@medusajs/ui";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Contacts",
    description: "Get in touch with Amara Beer Lab! Find our social media links, send your inquiries, or visit us in Siem Reap. Follow our journey and stay updated—great beer and exciting stories await!",
}

export default function Contacts() {
    return (
        <div
            className="flex flex-col small:flex-row small:items-start py-6 content-container"
            data-testid="contacts-container"
        >
            <div className="w-full">
                <div className="mb-8 small:mx-12">
                    <h1 className="mb-8 font-extrabold text-4xl text-center text-koiRed small:text-8xl" data-testid="contacts-page-title">Contacts</h1>
                    <div className="text-justify mb-16">
                        <p className="text-koiYellow text-2xl">We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hi, this is the place to reach out. Find all our social media links below to stay updated on the latest news, events, and creations at Amara Beer Lab.

                            Follow us as we transform ideas into flavors and stories into unforgettable experiences. Let&apos;s stay connected—because the best is yet to come!

                            Need more info? Drop us a message or visit us in person. Cheers to great connections!</p>
                    </div>
                </div>


                <div
                    className="relative bg-cover bg-bottom rounded-lg grid gap-4 md:grid-cols-2"
                >
                    <div
                        className=
                        "col-span-1 flex flex-col items-center text-center min-h-[400px] lg:mx-12 lg:my-8 bg-bottom"
                    >
                        <Heading
                            className="text-center text-6xl text-ui-fg-base mb-16 lg:mg-0"
                            level="h2"
                        >
                            Find us
                        </Heading>
                        <div className="mapswrapper w-full min-h-64 h-64">
                            <iframe className="w-full h-full" loading="lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Siem%20Reap%2084%2C%20palm%20street&zoom=16&maptype=roadmap">
                            </iframe>
                        </div>

                        <Link href="https://www.google.com/maps/dir//138+Palm+St,+Krong+Siem+Reap/@13.3422825,103.8632729,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x311019d56df94709:0x424b2d9bfac80507!2m2!1d103.8658478!2d13.3422773?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" rel="noopener noreferrer" target="_blank">
                            <Button className="mx-auto rounded-none transition duration-500 mt-8 bg-koiRed text-ui-fg-base font-bold" size="large">
                                Open Maps
                            </Button>
                        </Link>

                    </div>
                    <div className="col-span-1 flex flex-col items-center text-center min-h-[400px] lg:mx-12 lg:my-8 bg-bottom order-2 mt-16">
                        <Heading
                            className="text-center text-6xl mb-16 lg:mg-0 text-koiRed"
                            level="h2"
                        >
                            Our socials
                        </Heading>

                        <div className="grid grid-cols-1 h-full">
                            <div className="social-wrapper">

                                <Link href="https://www.instagram.com/amarabeerlab/" rel="noopener noreferrer" target="_blank" className="text-koiOrange">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="social-wrapper">

                                <Link href="https://www.instagram.com/amarabeerlab/" rel="noopener noreferrer" target="_blank" className="text-koiOrange">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="social-wrapper">

                                <Link href="https://www.instagram.com/amarabeerlab/" rel="noopener noreferrer" target="_blank" className="text-koiOrange">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-8 small:mx-12">
                    <div className="text-justify my-16">
                        <p className="text-koiYellow text-xl">
                            Soon, our brewery will also become a taproom! Stay tuned for the next chapter of Amara Beer Lab, where you&apos;ll be able to enjoy our craft beers fresh from the source in a cozy and vibrant atmosphere.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
