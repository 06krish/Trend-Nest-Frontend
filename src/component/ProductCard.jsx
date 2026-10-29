
function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(price) || 0);
}

export default function ProductCard({ product, onViewDetails }) {
    const price = Number(product.price) || 0;
    const discount = Math.min(
        100,
        Math.max(0, Number(product.discount) || 0)
    );
    const discountedPrice = price * (1 - discount / 100);
    const categoryName =
        product.category?.name || product.categoryName || "TRENDNEST";
    const isInStock = Number(product.stock) > 0;

    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                        }}
                    />
                ) : (
                    <div className="text-center">
            <span className="text-6xl" aria-hidden="true">
              ✦
            </span>
                        <p className="mt-3 text-xs font-semibold tracking-[0.25em] text-gray-500">
                            TRENDNEST
                        </p>
                    </div>
                )}

                {discount > 0 && (
                    <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">
            {discount}% OFF
          </span>
                )}

                <span
                    className={`absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ${
                        isInStock
                            ? "bg-white/90 text-emerald-700"
                            : "bg-gray-900/90 text-white"
                    }`}
                >
          {isInStock ? "In stock" : "Out of stock"}
        </span>
            </div>

            <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-600">
                    {categoryName}
                </p>

                <h3 className="mt-2 line-clamp-1 text-base font-semibold text-gray-900">
                    {product.name}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-500">
                    {product.description || "Discover your next everyday favourite."}
                </p>

                <div className="mt-4 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(discountedPrice)}
          </span>

                    {discount > 0 && (
                        <span className="text-sm text-gray-400 line-through">
              {formatPrice(price)}
            </span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => onViewDetails(product)}
                    className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                >
                    View details
                </button>
            </div>
        </article>
    );
}
