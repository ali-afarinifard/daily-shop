import { servicesData } from "@/utils/services"
import Image from "next/image"

const Services = () => {
    return (
        <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5"
        >
            {servicesData.map((item) => (
                <div key={item.id} className="flex flex-col items-center justify-center gap-3">
                    <Image
                        src={item.src}
                        alt="خدمات ما"
                        className="md:w-fit w-10"
                    />

                    <p className="font-bold md:text-md text-sm text-center" dir="ltr">
                        {item.title}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Services