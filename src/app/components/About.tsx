import Image from 'next/image';
import { motion } from 'framer-motion';

const timelineData = [
    {
        title: "First We Meet",
        date: "December 25, 2015",
        image: "/images/couple-1.jpg",
        description:
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
        title: "First Date",
        date: "December 28, 2015",
        image: "/images/couple-2.jpg",
        description:
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
        title: "In A Relationship",
        date: "January 1, 2016",
        image: "/images/couple-3.jpg",
        description:
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
];

const About = () => {
    return (
        <div id="fh5co-couple-story" className="py-12 bg-gray-100">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-12">
                    <span className="text-lg text-gray-500">We Love Each Other</span>
                    <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                    </p>
                </div>
                <div className="relative">
                    <ul className="timeline">
                        {timelineData.map((item, index) => (
                            <motion.li
                                key={index}
                                className={`mb-8 flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <Image src={item.image} alt={item.title} width={96} height={96} className="object-cover" />
                                </div>
                                <div className="bg-white shadow-md rounded-lg p-6 max-w-md md:ml-6 md:mr-6">
                                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                    <span className="text-gray-500 text-sm block mb-2">{item.date}</span>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;