import { Link } from "react-router-dom"
import { products } from "../data/products"

function RelatedProducts({ currentId }) {

  // safety: make sure id types match
  const related = products.filter(p => Number(p.id) !== Number(currentId))

  return (
    <section className="bg-black text-white py-20">

      <div className="wrapper">

        <h2 className="text-3xl font-bold mb-10 text-center">
          Related Products
        </h2>

        <div className="flex gap-8 overflow-x-auto pb-6">

          {related.map((product) => (

            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="min-w-[260px] bg-gray-900 p-6 rounded-2xl hover:scale-105 transition block"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full mb-4 rounded-lg"
              />

              <h3 className="text-xl font-semibold mb-1">
                {product.name}
              </h3>

              <p className="text-gray-400">
                ${product.price}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </section>
  )
}

export default RelatedProducts