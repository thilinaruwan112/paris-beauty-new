
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/assets/content/LogoHorizontal-optimized.png"
                                alt="Paris Beauty Logo"
                                width={120}
                                height={40}
                            />
                        </Link>
                        <p className="text-sm max-w-sm mb-6">
                            Crafting the future of beauty with elegance, ethics, and efficacy. Discover your natural radiance with Paris Beauty.
                        </p>
                        <div className="flex space-x-4">
                             {[FaInstagram, FaFacebook, FaTwitter, FaTiktok].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900/50 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300"
                                    aria-label="Social media link"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Customer Service</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-pink-600 transition-colors">Return Policy</Link></li>
                            <li><Link href="#" className="hover:text-pink-600 transition-colors">Shipping Info</Link></li>
                            <li><Link href="#" className="hover:text-pink-600 transition-colors">Report an Issue</Link></li>
                             <li><Link href="/contact" className="hover:text-pink-600 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">About Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-pink-600 transition-colors">Our Story</Link></li>
                            <li><Link href="#" className="hover:text-pink-600 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-pink-600 transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-pink-600 transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Join Our Newsletter</h4>
                        <p className="text-sm mb-4">Get exclusive updates on new arrivals, sales, and beauty tips.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your email" className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                            <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded-r-md hover:bg-pink-700 transition-colors font-semibold text-sm">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                 {/* Footer Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Paris Beauty. All Rights Reserved.
                    </p>
                    <div className="flex gap-4 mt-4 sm:mt-0">
                        <Image src="https://placehold.co/200x24.png" alt="Payment Methods" className="h-6" width={200} height={24} data-ai-hint="payment methods" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

    