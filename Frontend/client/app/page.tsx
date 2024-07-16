import Slider from "./components/slider/Slider";
import Services from "./components/services/Services";
import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import ProductList from "./components/product/ProductList";

export default function Home() {
  return (
    <div>
      <div dir="ltr" className="pb-1">

        <Slider />
        <Services />

        <div className="pt-2 px-4 xl:px-[6.8rem] md:px-10">
          <HomeBanner />
        </div>

        <div className="p-8">
          <Container>
            <div className="grid grid-cols-2 max-[400px]:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              <ProductList />
            </div>
          </Container>
        </div>

      </div>
    </div>
  );
}
