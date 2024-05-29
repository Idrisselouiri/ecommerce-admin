import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@components/Button";

const Hero = ({ products }) => {
  const HeroData = [
    {
      id: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1715288526852macbook.png?alt=media&token=e89dfafe-5d63-400f-8a0b-f7d041c08823",
      subtitle: "Beats Solo",
      title: "Branded",
      title2: "Laptops",
      categoryId: "66325041014710c6455a88b4",
    },
    {
      id: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1716894787599vr.png?alt=media&token=0047fb8b-6c2b-4163-9bf1-418c17247a68",
      subtitle: "Beats Solo",
      title: "Wireless",
      title2: "Virtual",
      categoryId: "66325041014710c6455a88b4",
    },
    {
      id: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/mern0blog.appspot.com/o/1715288552531headphone.png?alt=media&token=4954fdc9-fad4-4829-b086-f848de10fb17",
      subtitle: "Beats Solo",
      title: "Wireless",
      title2: "Headphone",
      categoryId: "66325033014710c6455a88ae",
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 800,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <div className="container">
      <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center">
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {HeroData.map((data) => (
              <div key={data.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10 ">
                    <h1 className="text-2xl sm:text-6xl lg:text-2xl font-bold">
                      {data.subtitle}
                    </h1>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                      {data.title}
                    </h1>
                    <h1 className="text-5xl uppercase text-white sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold">
                      {data.title2}
                    </h1>
                    <div>
                      <Button
                        text="Shop By Category"
                        bgColor={"bg-brandGreen"}
                        textColor={"text-white"}
                        category={data.categoryId}
                      />
                    </div>
                  </div>
                  <div className="order-1 sm:order-2">
                    <div>
                      <img
                        src={data.img}
                        alt=""
                        className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] z-40 relative"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
