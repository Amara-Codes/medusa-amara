import { Metadata } from "next";
import { Heading, Text, Button } from "@medusajs/ui";
import Link from "next/link";
import ParagraphBlock from "@modules/common/components/blocks/par-block";
import TypoParagraphBlock from "@modules/common/components/blocks/typo-par-block";
import CTABlock from "@modules/common/components/blocks/cta-block";
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
                        <p className="text-koiYellow text-2xl">We’d love to hear from you! Whether you have a question, feedback, or just want to say hi, this is the place to reach out. Find all our social media links below to stay updated on the latest news, events, and creations at Amara Beer Lab.

                            Follow us as we transform ideas into flavors and stories into unforgettable experiences. Let’s stay connected—because the best is yet to come!

                            Need more info? Drop us a message or visit us in person. Cheers to great connections!</p>
                    </div>
                </div>


                <div
                    className="relative bg-cover bg-bottom rounded-lg grid gap-4 md:grid-cols-2 cta-block"
                >
                    <div
                        className=
                        "col-span-1 flex flex-col justify-center items-center text-center min-h-[400px] lg:mx-12 lg:my-8 bg-bottom"
                    >
                        <Heading
                            className="text-center text-6xl text-ui-fg-base mb-16 lg:mg-0"
                            level="h2"
                        >
                            Find us
                        </Heading>
                        <div className="mapswrapper">
                            <iframe width="600" height="450" loading="lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Siem%20Reap%2084%2C%20palm%20street&zoom=16&maptype=roadmap">
                            </iframe>
                        </div>

                        <Link href="https://www.google.com/maps/dir//138+Palm+St,+Krong+Siem+Reap/@13.3422825,103.8632729,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x311019d56df94709:0x424b2d9bfac80507!2m2!1d103.8658478!2d13.3422773?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" rel="noopener noreferrer" target="_blank">
                            <Button className="mx-auto rounded-none transition duration-500 mt-8 bg-koiOrange text-ui-fg-base font-bold" size="large">
                                Find the path
                            </Button>
                        </Link>

                    </div>
                    <div className="order-2">

                    </div>
                </div>
            </div>
        </div>
    )
}
