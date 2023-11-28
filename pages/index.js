import Layout from '../components/Layout';
import Head from '../components/core/Head';
import ProductCard from '../components/parts/ProductCard';

const HomePage = ({ data }) => {
  const products = data;

  return (
    <Layout>
      <Head title="Welcome to next js" />
      <div className="container mx-auto">
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((item, index) => (
              <div key={index} className="mb-4">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  let data = [];
  try {
    const res = await fetch(`https://fakestoreapi.com/products?limit=12`);
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
}

export default HomePage;
