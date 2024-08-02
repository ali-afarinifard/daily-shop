import { getAllProducts } from "@/libs/apiUrls";
import CategoryList from "./components/category/CategoryList";
import Container from "./components/Container";
import Features from "./components/features/Features";
import TopProducts from "./components/TopProducts";
import Guidance from "./components/guidance/Guidance";
import Banner from "./components/banner/Banner";

export default function Home() {

  return (
    <div>
      <div className="pb-10">
        <Container>
          <Banner />
          <CategoryList />
          <TopProducts />
          <Features />
          <Guidance />
        </Container>
      </div>
    </div>
  );
}
