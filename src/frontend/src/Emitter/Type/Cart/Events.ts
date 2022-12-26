import CartItemModel from '@/State/Cart/CartItemModel'
import ProductModel from '@/State/Product/ProductModel'

export type CartEvents = {
	decrementQuantity: CartItemModel
	incrementQuantity: CartItemModel
	removeFromCart: CartItemModel
	addToCart: {
		product: ProductModel
		quantity: number
	}
}
