import Countdown from "./Countdown";
import Header from "./Header";

export default function Hero() {
    return (
        <div
            className="relative bg-cover bg-center text-center"
            style={{ backgroundImage: "url(/images/gallery-1.jpg)" }}
        >
            <Header />
            <div className="flex items-center justify-center relative">
                {/* Lớp nền mờ này cần phải có z-index nhỏ hơn Header */}
                <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                <div className="container relative z-10">
                    <div className="flex justify-center">
                        <div className="max-w-2xl text-white">
                            <div className="mt-6" id="simply-countdown-one">
                                <Countdown />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}