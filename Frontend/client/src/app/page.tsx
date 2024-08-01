import CategoryList from "./components/category/CategoryList";
import Container from "./components/Container";
import TopProducts from "./components/TopProducts";

export default function Home() {
  return (
    <div>
      <Container>
        {/* Category */}
        <CategoryList />
        <TopProducts />
      </Container>
    </div>
  );
}
