import { products } from '@/services/data/products';
import { PageTitle } from '../ui';
import MainCarousel from './mainCarousel/MainCarousel';
import { ProductCard } from '../shared';

const productsArr = products.data;
const MainProducts = () => {
  return (
    <section>
      <PageTitle set="Products" />
      <MainCarousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-7.5">
        {productsArr.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default MainProducts;
